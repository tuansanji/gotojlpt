"use client";

import React, { useState, useEffect, useMemo } from "react";
import DOMPurify from "isomorphic-dompurify";
import { dataExams } from "@/data/exams";

const circledNums = "①②③④⑤⑥⑦⑧⑨";

const sanitizeHtml = (html) => DOMPurify.sanitize(html || "");

const textFromHtml = (html) => {
  if (!html) return "";
  const tmp = document.createElement("div");
  tmp.innerHTML = sanitizeHtml(html);
  return (tmp.textContent || tmp.innerText || "").trim();
};

// Tìm đáp án đúng từ phần script
function extractCorrectIndexFromScript(q) {
  const script = q?.script || "";
  const txt = textFromHtml(script);

  const m1 = txt.match(/Đáp\s*án[^\d]*([0-9])/i);
  if (m1) {
    const idx = Number(m1[1]) - 1;
    if (!Number.isNaN(idx) && idx >= 0) return idx;
  }

  const m2 = txt.match(/[①②③④⑤⑥⑦⑧⑨]/);
  if (m2) return circledNums.indexOf(m2[0]);

  for (let i = 0; i < (q.answers || []).length; i++) {
    const ansText = textFromHtml(q.answers[i].name).replace(/\s+/g, " ").trim();
    if (!ansText) continue;
    if (txt.includes(ansText)) return i;
  }
  return null;
}

// ===== Main Component =====
export default function ExamPage() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [time, setTime] = useState(0);
  const [isHeaderBottom, setIsHeaderBottom] = useState(false);

  const lesson = dataExams?.data?.lesson;

  // --- Đồng hồ đếm thời gian ---
  useEffect(() => {
    if (submitted) return;
    const timer = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, [submitted]);

  const formatTime = (t) => {
    const h = Math.floor(t / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((t % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(t % 60)
      .toString()
      .padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  // --- Lắng nghe cuộn để chuyển header xuống footer ---
  useEffect(() => {
    const handleScroll = () => {
      const threshold = 250; // nếu cuộn quá 250px thì chuyển header thành footer sticky
      setIsHeaderBottom(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Precompute đáp án đúng ---
  const correctIndexMap = useMemo(() => {
    if (!lesson) return {};
    const map = {};
    lesson.examinations.forEach((exam) =>
      exam.mondais.forEach((mondai) =>
        mondai.question_groups.forEach((group) =>
          group.questions.forEach((q) => {
            map[q.id] = extractCorrectIndexFromScript(q);
          })
        )
      )
    );
    return map;
  }, [lesson]);

  // --- Tính điểm ---
  const summary = useMemo(() => {
    if (!lesson) return { total: 0, correct: 0 };
    let total = 0,
      correct = 0;
    lesson.examinations.forEach((exam) =>
      exam.mondais.forEach((mondai) =>
        mondai.question_groups.forEach((group) =>
          group.questions.forEach((q) => {
            total++;
            const selected = answers[q.id];
            const corr = correctIndexMap[q.id];
            if (selected !== undefined && corr !== null && selected === corr)
              correct++;
          })
        )
      )
    );
    return { total, correct };
  }, [answers, correctIndexMap, lesson]);

  const handleSelect = (qid, index) => {
    if (submitted) return;
    setAnswers((p) => ({ ...p, [qid]: index }));
  };

  const handleSubmit = () => setSubmitted(true);
  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setTime(0);
  };

  if (!lesson)
    return <div className="p-6">Không tìm thấy dữ liệu bài thi.</div>;

  return (
    <div className="min-h-screen bg-[#f3fafb]">
      {/* ============ HEADER (fixed/sticky) ============ */}
      <div
        className={`transition-all duration-300 ${
          isHeaderBottom
            ? "fixed bottom-0 left-0 right-0 bg-white border-t z-50 shadow-lg"
            : "sticky top-0 bg-white border-b z-20 shadow-sm"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 py-3">
          {/* flex-nowrap on md+, wrap on small screens */}
          <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
            {/* Title (flex-1, min-w-0 để truncate) */}
            <div className="flex-1 min-w-0">
              <h1 className="text-lg md:text-xl font-semibold text-gray-800 truncate">
                {lesson.name}
              </h1>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 flex-none">
              <div className="text-sm text-gray-500 whitespace-nowrap">
                Tổng câu: <strong>{summary.total}</strong>
              </div>
              <div className="text-sm text-gray-500 whitespace-nowrap">
                Đã chọn: <strong>{Object.keys(answers).length}</strong>
              </div>

              <div className="flex items-center text-sm text-gray-700 font-medium whitespace-nowrap">
                <svg
                  className="w-4 h-4 mr-1 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 7V12L15 14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{formatTime(time)}</span>
              </div>

              {/* BUTTON: đảm bảo min-w để không bị cắt */}
              {!submitted ? (
                <button
                  onClick={handleSubmit}
                  className="cursor-pointer ml-2 flex-none bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out min-w-[140px]"
                >
                  Nộp bài
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="cursor-pointer ml-2 flex-none bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-base px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition duration-300 ease-in-out min-w-[140px]"
                >
                  Làm lại
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ============ BODY ============ */}
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {lesson.examinations.map((exam) => (
          <section key={exam.id}>
            {exam.mondais.map((mondai) => (
              <div
                key={mondai.id}
                className="bg-white rounded-xl shadow-sm mb-6 p-5 border border-gray-100"
              >
                <div
                  className="text-base font-medium mb-4 text-gray-800"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(mondai.name),
                  }}
                />

                {mondai.question_groups.map((group) => (
                  <div key={group.id} className="space-y-5">
                    {group.questions.map((q, idx) => {
                      const selected = answers[q.id];
                      const correctIdx = correctIndexMap[q.id];
                      const isCorrect =
                        submitted &&
                        selected !== undefined &&
                        selected === correctIdx;
                      const isWrong =
                        submitted &&
                        selected !== undefined &&
                        selected !== correctIdx;

                      return (
                        <div
                          key={q.id}
                          className={`rounded-lg border ${
                            isCorrect
                              ? "border-green-400 bg-green-50"
                              : isWrong
                              ? "border-red-400 bg-red-50"
                              : "border-gray-200 bg-gray-50 hover:bg-gray-100 transition"
                          } p-4`}
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-8 h-8 flex items-center justify-center bg-teal-500 text-white text-sm font-semibold rounded-full shrink-0">
                              {idx + 1}
                            </div>
                            <div
                              className="text-gray-800"
                              dangerouslySetInnerHTML={{
                                __html: sanitizeHtml(q.name),
                              }}
                            />
                          </div>

                          <div className="space-y-2">
                            {q.answers.map((a, i) => {
                              const isSelected = selected === i;
                              const isAnswerCorrect =
                                submitted && i === correctIdx;
                              const isAnswerWrong =
                                submitted &&
                                i === selected &&
                                selected !== correctIdx;

                              return (
                                <label
                                  key={a.id}
                                  className={`block cursor-pointer rounded-md border p-3 transition-all ${
                                    isAnswerCorrect
                                      ? "bg-green-100 border-green-400"
                                      : isAnswerWrong
                                      ? "bg-red-100 border-red-400"
                                      : isSelected
                                      ? "border-teal-400 bg-teal-50"
                                      : "border-gray-200 hover:border-teal-300"
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    className="mr-2"
                                    name={`q_${q.id}`}
                                    checked={selected === i}
                                    disabled={submitted}
                                    onChange={() => handleSelect(q.id, i)}
                                  />
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: sanitizeHtml(a.name),
                                    }}
                                  />
                                </label>
                              );
                            })}
                          </div>

                          {submitted && (
                            <div className="mt-3 text-sm text-gray-700">
                              <div className="mb-2">
                                <strong>Đáp án đúng: </strong>
                                {correctIdx !== null &&
                                q.answers[correctIdx] ? (
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: sanitizeHtml(
                                        q.answers[correctIdx].name
                                      ),
                                    }}
                                  />
                                ) : (
                                  "Không rõ"
                                )}
                              </div>
                              <div
                                className="bg-gray-100 rounded p-2"
                                dangerouslySetInnerHTML={{
                                  __html: sanitizeHtml(
                                    q.script ||
                                      "<i>Không có lời giải chi tiết.</i>"
                                  ),
                                }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
