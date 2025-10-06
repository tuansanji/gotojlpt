"use client";

import React, { useState, useMemo } from "react";
import DOMPurify from "isomorphic-dompurify";
import { dataExams } from "@/data/exams";

const circledNums = "①②③④⑤⑥⑦⑧⑨";

// --- helper ---
function sanitizeHtml(html) {
  return DOMPurify.sanitize(html || "");
}

function textFromHtml(html) {
  if (!html) return "";
  const tmp = document.createElement("div");
  tmp.innerHTML = sanitizeHtml(html);
  return (tmp.textContent || tmp.innerText || "")
    .replace(/\u00A0/g, " ")
    .trim();
}

// --- tìm đáp án đúng ---
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
    if (ansText.length > 6 && txt.includes(ansText.slice(-6))) return i;
  }
  return null;
}

export default function ExamPage() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const lesson = dataExams?.data?.lesson;

  // --- precompute đáp án đúng ---
  const correctIndexMap = useMemo(() => {
    if (!lesson) return {};
    const map = {};
    lesson.examinations.forEach((exam) => {
      exam.mondais.forEach((mondai) => {
        mondai.question_groups.forEach((group) => {
          group.questions.forEach((q) => {
            map[q.id] = extractCorrectIndexFromScript(q);
          });
        });
      });
    });
    return map;
  }, [lesson]);

  // --- tính điểm ---
  const summary = useMemo(() => {
    if (!lesson) return { total: 0, correct: 0, sections: [] };
    let total = 0;
    let correct = 0;

    const sections = lesson.examinations.map((exam) => {
      let secTotal = 0;
      let secCorrect = 0;

      exam.mondais.forEach((mondai) => {
        mondai.question_groups.forEach((group) => {
          group.questions.forEach((q) => {
            secTotal++;
            total++;
            const selected = answers[q.id];
            const corr = correctIndexMap[q.id];
            if (selected !== undefined && corr !== null && selected === corr) {
              secCorrect++;
              correct++;
            }
          });
        });
      });

      return {
        id: exam.id,
        name: exam.name,
        total: secTotal,
        correct: secCorrect,
      };
    });

    return { total, correct, sections };
  }, [answers, correctIndexMap, lesson]);

  const handleSelect = (qid, index) =>
    setAnswers((p) => ({ ...p, [qid]: index }));

  const handleSubmit = () => setSubmitted(true);
  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  if (!lesson)
    return <div className="p-6">Không tìm thấy dữ liệu bài thi.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">{lesson.name}</h1>

      <div className="mb-6 flex gap-3 items-center">
        <div className="text-sm text-gray-600">
          Tổng câu: <strong>{summary.total}</strong> — Đã chọn:{" "}
          <strong>{Object.keys(answers).length}</strong>
        </div>

        {!submitted ? (
          <button
            onClick={handleSubmit}
            className="ml-auto bg-blue-600 text-white px-4 py-2 rounded"
          >
            Nộp bài
          </button>
        ) : (
          <>
            <div className="ml-auto text-lg font-semibold">
              Kết quả: {summary.correct}/{summary.total} (
              {summary.total
                ? Math.round((summary.correct / summary.total) * 100)
                : 0}
              %)
            </div>
            <button
              onClick={handleReset}
              className="ml-4 bg-gray-200 px-3 py-1 rounded text-sm"
            >
              Làm lại
            </button>
          </>
        )}
      </div>

      {lesson.examinations.map((exam) => (
        <section key={exam.id} className="mb-8">
          <h2 className="text-xl font-semibold mb-3">{exam.name}</h2>

          {exam.mondais.map((mondai) => (
            <div
              key={mondai.id}
              className="mb-6 border-l-4 border-blue-200 pl-4 py-2"
            >
              <div
                className="font-medium text-gray-800 mb-2"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(mondai.name) }}
              />

              {mondai.question_groups.map((group) => (
                <div key={group.id} className="mb-4 ml-2">
                  <div
                    className="text-gray-700 mb-2"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(group.name),
                    }}
                  />

                  {group.questions.map((q) => {
                    const selected = answers[q.id];
                    const correctIndex = correctIndexMap[q.id];
                    const correctAnswerHtml =
                      correctIndex !== null && q.answers[correctIndex]
                        ? sanitizeHtml(q.answers[correctIndex].name)
                        : null;

                    return (
                      <div
                        key={q.id}
                        className="mb-4 p-3 rounded border border-gray-100"
                      >
                        <div
                          className="font-medium mb-2"
                          dangerouslySetInnerHTML={{
                            __html: sanitizeHtml(q.name),
                          }}
                        />

                        {q.audio && (
                          <div className="mb-2">
                            <audio controls src={q.audio} />
                          </div>
                        )}

                        {Array.isArray(q.images) && q.images.length > 0 && (
                          <div className="mb-2 flex gap-2 flex-wrap">
                            {q.images.map((img, i) => {
                              const src =
                                typeof img === "string"
                                  ? img
                                  : img.url || img.src;
                              return (
                                <img
                                  key={i}
                                  src={src}
                                  alt={`image-${i}`}
                                  className="max-w-xs rounded border"
                                />
                              );
                            })}
                          </div>
                        )}

                        <div className="flex flex-col gap-2">
                          {q.answers.map((a, i) => {
                            const isCorrect = submitted && i === correctIndex;
                            const isSelectedWrong =
                              submitted && selected === i && i !== correctIndex;

                            const cls = [
                              "p-2 rounded flex items-start gap-3 transition-all",
                              !submitted ? "hover:bg-gray-50" : "",
                              isCorrect
                                ? "bg-green-50 border border-green-300"
                                : "",
                              isSelectedWrong
                                ? "bg-red-50 border border-red-300"
                                : "",
                            ].join(" ");

                            return (
                              <label
                                key={a.id}
                                className={cls}
                                style={{
                                  cursor: submitted ? "default" : "pointer",
                                }}
                              >
                                <input
                                  type="radio"
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
                          <div className="mt-3 text-sm">
                            <div className="mb-2">
                              <strong>Đáp án đúng: </strong>
                              {correctAnswerHtml ? (
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: correctAnswerHtml,
                                  }}
                                />
                              ) : (
                                <span className="text-gray-500">
                                  Không rõ trong dữ liệu
                                </span>
                              )}
                            </div>

                            <div
                              className="prose-sm bg-gray-50 p-3 rounded"
                              dangerouslySetInnerHTML={{
                                __html: sanitizeHtml(
                                  q.script ||
                                    "<p><i>Không có lời giải chi tiết</i></p>"
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

      {submitted && (
        <div className="mt-6 p-4 border-t">
          <h3 className="font-semibold mb-2">Báo cáo theo phần</h3>
          <ul className="space-y-2">
            {summary.sections.map((s) => (
              <li key={s.id} className="text-sm">
                <strong>{s.name}</strong>: {s.correct}/{s.total} đúng
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
