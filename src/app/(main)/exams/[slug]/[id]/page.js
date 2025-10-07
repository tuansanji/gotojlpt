"use client";

import React, { useState, useEffect, useMemo } from "react";
import DOMPurify from "isomorphic-dompurify";
import dataExams from "@/data/exams";

const circledNums = "①②③④⑤⑥⑦⑧⑨";
const sanitizeHtml = (html) => DOMPurify.sanitize(html || "");

const textFromHtml = (html) => {
  if (!html) return "";
  const tmp = document.createElement("div");
  tmp.innerHTML = sanitizeHtml(html);
  return (tmp.textContent || tmp.innerText || "").trim();
};

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

export default function ExamPage() {
  // --- state hooks (luôn ở đầu) ---
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [time, setTime] = useState(0);
  const [isHeaderBottom, setIsHeaderBottom] = useState(false);

  // chọn lesson (bộ đề), chọn examination (phần trong lesson)
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentExamIndex, setCurrentExamIndex] = useState(0);

  // dữ liệu từ file JSON
  const lessons = dataExams?.data?.lesson || [];

  // đồng hồ
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

  // header sticky -> bottom khi cuộn
  useEffect(() => {
    const onScroll = () => setIsHeaderBottom(window.scrollY > 250);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // boundary checks
  const currentLesson = lessons[currentLessonIndex];
  const currentExam = currentLesson?.examinations?.[currentExamIndex];
  // precompute đáp án đúng cho tất cả câu
  const correctIndexMap = useMemo(() => {
    const map = {};
    (lessons || []).forEach((lesson) =>
      (lesson.examinations || []).forEach((exam) =>
        (exam.mondais || []).forEach((mondai) =>
          (mondai.question_groups || []).forEach((group) =>
            (group.questions || []).forEach((q) => {
              map[q.id] = extractCorrectIndexFromScript(q);
            })
          )
        )
      )
    );
    return map;
  }, [lessons]);
  // tính số câu, số đã chọn, số đúng cho currentExam (hiển thị trong header)
  const currentExamQuestionIds = useMemo(() => {
    if (!currentExam) return [];
    const ids = [];
    (currentExam.mondais || []).forEach((mondai) =>
      (mondai.question_groups || []).forEach((group) =>
        (group.questions || []).forEach((q) => ids.push(q.id))
      )
    );
    return ids;
  }, [currentExam]);

  const currentExamTotals = useMemo(() => {
    const total = currentExamQuestionIds.length;
    const selected = currentExamQuestionIds.filter(
      (id) => answers[id] !== undefined
    ).length;
    const correct = currentExamQuestionIds.reduce((acc, id) => {
      const sel = answers[id];
      const corr = correctIndexMap[id];
      if (sel !== undefined && corr !== null && sel === corr) return acc + 1;
      return acc;
    }, 0);
    return { total, selected, correct };
  }, [currentExamQuestionIds, answers, correctIndexMap]);

  // nếu không có lesson
  if (!currentLesson) {
    return <div className="p-6">Không tìm thấy dữ liệu bài thi.</div>;
  }

  // chức năng chọn đáp án
  const handleSelect = (qid, index) => {
    if (submitted) return;
    setAnswers((p) => ({ ...p, [qid]: index }));
  };

  // submit / reset
  const handleSubmit = () => setSubmitted(true);
  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setTime(0);
  };

  // khi đổi lesson: reset exam index + clear state (theo mong muốn trước đó)
  const switchLesson = (idx) => {
    setCurrentLessonIndex(idx);
    setCurrentExamIndex(0);
    setSubmitted(false);
    setAnswers({});
    setTime(0);
  };

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-[#f3fafb]">
      {/* HEADER */}
      <div
        className={`transition-all duration-300 ${
          isHeaderBottom
            ? "fixed bottom-0 left-0 right-0 bg-white border-t z-50 shadow-lg"
            : "sticky top-0 bg-white border-b z-20 shadow-sm"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            {/* Left: Lesson chooser */}
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {lessons.map((lesson, idx) => (
                <button
                  key={lesson.id || idx}
                  onClick={() => switchLesson(idx)}
                  // Đoạn CSS đã được tối ưu và không bị chìm:
                  className={`cursor-pointer  border border-indigo-400 hover:bg-indigo-50 hover:border-indigo-500 shadow-sm  flex-shrink-0 px-3 py-1.5 rounded-md text-sm font-medium transition ${
                    idx === currentLessonIndex &&
                    " text-red-600 border-red-600 shadow-md"
                  }`}
                >
                  {lesson.name || `Bài ${idx + 1}`}
                </button>
              ))}
            </div>

            {/* Right: counters + submit */}
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600 whitespace-nowrap">
                Tổng câu: <strong>{currentExamTotals.total}</strong>
              </div>
              <div className="text-sm text-gray-600 whitespace-nowrap">
                Đã chọn: <strong>{currentExamTotals.selected}</strong>
              </div>
              <div className="text-sm text-gray-700 font-medium whitespace-nowrap">
                ⏱ {formatTime(time)}
              </div>

              {!submitted ? (
                <button
                  onClick={handleSubmit}
                  className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-4 py-2 rounded-lg shadow"
                >
                  Nộp bài
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="ml-2 bg-white border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-lg shadow-sm"
                >
                  Làm lại
                </button>
              )}
            </div>
          </div>

          {/* --- Examination tabs for current lesson --- */}
          <div className="mt-3">
            <div className="flex gap-2 overflow-x-auto py-1">
              {(currentLesson.examinations || []).map((exam, eIdx) => (
                <button
                  key={exam.id}
                  onClick={() => {
                    setCurrentExamIndex(eIdx);
                    // khi đổi exam trong cùng lesson, giữ answers; nếu muốn clear, uncomment dòng dưới
                    // setAnswers({});
                    setSubmitted(false);
                  }}
                  className={`flex-shrink-0 px-3 py-1 rounded-md text-sm font-medium transition whitespace-nowrap ${
                    eIdx === currentExamIndex
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <span className="mr-2">{exam.name}</span>
                  {exam.audio ? (
                    <span className="inline-block text-xs text-white/80 bg-black/10 rounded px-1">
                      🔊
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          </div>

          {/* Audio cho exam đã chọn */}
          {currentExam?.audio ? (
            <div className="mt-3">
              <audio
                controls
                src={currentExam.audio}
                className="w-full rounded-md border border-gray-200"
              />
            </div>
          ) : null}
        </div>
      </div>

      {/* BODY: chỉ hiển thị currentExam */}
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {currentExam ? (
          currentExam.mondais.map((mondai) => (
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

              {(mondai.question_groups || []).map((group) => (
                <div key={group.id} className="space-y-5">
                  {(group.questions || []).map((q, qIdx) => {
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
                            {qIdx + 1}
                          </div>
                          <div
                            className="text-gray-800"
                            dangerouslySetInnerHTML={{
                              __html: sanitizeHtml(q.name),
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          {(q.answers || []).map((a, i) => {
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

                        {/* Hiển thị đáp án đúng + lời giải khi đã nộp */}
                        {submitted && (
                          <div className="mt-3 text-sm text-gray-700">
                            <div className="mb-2">
                              <strong>Đáp án đúng: </strong>
                              {correctIdx !== null &&
                              q.answers?.[correctIdx] ? (
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: sanitizeHtml(
                                      q.answers[correctIdx].name
                                    ),
                                  }}
                                />
                              ) : (
                                <span className="text-gray-500">Không rõ</span>
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
          ))
        ) : (
          <div>Không có phần thi được chọn.</div>
        )}
      </div>
    </div>
  );
}
