"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import DOMPurify from "isomorphic-dompurify";

// --- HÀM TIỆN ÍCH ---
const circledNums = "①②③④⑤⑥⑦⑧⑨";
const sanitizeHtml = (html) => DOMPurify.sanitize(html || "");

const textFromHtml = (html) => {
  if (typeof window === "undefined" || !html) return "";
  const tmp = document.createElement("div");
  tmp.innerHTML = sanitizeHtml(html);
  return (tmp.textContent || tmp.innerText || "").trim();
};

function extractCorrectIndexFromScript(q) {
  if (typeof window === "undefined") {
    return null;
  }
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

// --- COMPONENT CHUNG: Modal Wrapper (TÁCH RA NGOÀI ĐỂ TRÁNH RE-RENDER) ---
const ModalWrapper = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
    <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm transform transition-all scale-100 animate-in fade-in duration-300">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      {children}
    </div>
  </div>
);

// ------------------------------------

// COMPONENT BÀI THI CHÍNH
export default function ExamContent({ examinations, examName, isFullExam }) {
  const [partStates, setPartStates] = useState({});

  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [nextPartIndex, setNextPartIndex] = useState(null);
  const [isHeaderBottom, setIsHeaderBottom] = useState(false);

  // STATE RIÊNG DÀNH CHO TIMER HIỂN THỊ
  const [currentPartElapsedTime, setCurrentPartElapsedTime] = useState(0);

  const timerRef = useRef(null);

  const currentPart = useMemo(
    () => examinations?.[currentPartIndex],
    [examinations, currentPartIndex]
  );
  const mondais = currentPart?.mondais || [];

  // Tính toán maxTimeInSeconds
  const maxTimeInSeconds = useMemo(
    () => (currentPart?.total_time || 0) * 60,
    [currentPart?.total_time]
  );

  // Lấy state hiện tại của phần thi
  const partStateMemo = useMemo(() => {
    return (
      partStates[currentPart?.id] || {
        elapsedTime: 0,
        submitted: false,
        answers: {},
      }
    );
  }, [partStates, currentPart?.id]);

  const { submitted, answers } = partStateMemo;

  // Sử dụng thời gian đếm thực tế (currentPartElapsedTime) hoặc thời gian đã lưu
  const actualElapsedTime =
    submitted || maxTimeInSeconds === 0
      ? partStateMemo.elapsedTime
      : currentPartElapsedTime;

  const isPartTimeFinished =
    maxTimeInSeconds > 0 && actualElapsedTime >= maxTimeInSeconds;

  // Tính toán thời gian hiển thị
  const timeRemaining =
    maxTimeInSeconds > 0
      ? Math.max(0, maxTimeInSeconds - actualElapsedTime)
      : actualElapsedTime;
  const timeDisplay = maxTimeInSeconds > 0 ? timeRemaining : actualElapsedTime;

  const formatTime = (t) => {
    const totalSeconds = Math.max(0, t);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(totalSeconds % 60)
      .toString()
      .padStart(2, "0");
    return `${h > 0 ? h + ":" : ""}${m}:${s}`;
  };

  // --- 1. LOGIC KHỞI TẠO STATE BAN ĐẦU ---
  useEffect(() => {
    setPartStates((prev) => {
      const newStates = {};
      examinations.forEach((part) => {
        newStates[part.id] = prev[part.id] || {
          elapsedTime: 0,
          submitted: false,
          answers: {},
        };
      });
      return newStates;
    });
    setCurrentPartIndex(0);
  }, [examinations]);

  // --- 2. LOGIC THỜI GIAN ĐẾM (Đã sửa lỗi chỉ đếm 1s) ---
  useEffect(() => {
    const partId = currentPart?.id;
    const maxTime = maxTimeInSeconds;
    const isFinished = submitted || isPartTimeFinished;

    // 1. DỌN DẸP TIMER CŨ (Rất quan trọng)
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // 2. LOGIC KHÔNG CẦN CHẠY TIMER (Đã nộp, hết giờ, hoặc Modal đang mở)
    if (!partId || isFinished || showSubmitModal) {
      // Đảm bảo elapsedTime hiển thị là giá trị đã lưu
      if (partStateMemo.elapsedTime !== currentPartElapsedTime) {
        setCurrentPartElapsedTime(partStateMemo.elapsedTime);
      }
      return;
    }

    // 3. ĐỒNG BỘ THỜI GIAN KHI MỚI CHUYỂN PART
    if (partStateMemo.elapsedTime !== currentPartElapsedTime) {
      setCurrentPartElapsedTime(partStateMemo.elapsedTime);
      // Khi state được set, useEffect sẽ chạy lại, sau đó sẽ tiến đến khởi tạo timer
      return;
    }

    // 4. KHỞI TẠO TIMER MỚI
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        // CẬP NHẬT STATE HIỂN THỊ và STATE LƯU TRỮ CÙNG LÚC
        setCurrentPartElapsedTime((prevTime) => {
          const newTime = prevTime + 1;

          setPartStates((prev) => ({
            ...prev,
            [partId]: { ...prev[partId], elapsedTime: newTime },
          }));

          // Xử lý hết giờ
          if (maxTime > 0 && newTime >= maxTime) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }

            // Đảm bảo state cuối cùng là submitted: true
            setPartStates((prev) => ({
              ...prev,
              [partId]: {
                ...prev[partId],
                submitted: true,
                elapsedTime: maxTime,
              },
            }));

            setTimeout(() => {
              setNextPartIndex(currentPartIndex + 1);
              setShowSubmitModal(true);
            }, 0);

            return maxTime;
          }

          return newTime;
        });
      }, 1000);
    }

    // Cleanup: Dừng timer khi component unmount hoặc dependencies thay đổi
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [
    currentPart?.id,
    maxTimeInSeconds,
    submitted,
    isPartTimeFinished,
    currentPartIndex,
    showSubmitModal,
    currentPartElapsedTime, // Kích hoạt re-run sau khi đồng bộ
    partStateMemo.elapsedTime, // Phát hiện Part chuyển
  ]);

  // --- LOGIC UI (Sticky Header) (Giữ nguyên) ---
  useEffect(() => {
    const onScroll = () => {
      if (typeof window !== "undefined") {
        setIsHeaderBottom(window.scrollY > 250);
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, []);

  // --- LOGIC CHUYỂN ĐỔI PHẦN THI (Giữ nguyên) ---
  const handleSwitchPart = useCallback(
    (index) => {
      const partId = examinations[currentPartIndex]?.id;
      if (
        index > currentPartIndex &&
        partId &&
        !partStates[partId]?.submitted
      ) {
        setNextPartIndex(index);
        setShowSubmitModal(true);
        return;
      }
      setCurrentPartIndex(index);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [currentPartIndex, partStates, examinations]
  );

  const handleSubmitPart = useCallback(() => {
    if (!currentPart?.id) return;

    // Cập nhật cả state hiển thị và state lưu trữ
    const finalTime =
      maxTimeInSeconds > 0
        ? Math.max(actualElapsedTime, maxTimeInSeconds)
        : actualElapsedTime;

    if (maxTimeInSeconds > 0) {
      setCurrentPartElapsedTime(finalTime);
    }

    setPartStates((prev) => ({
      ...prev,
      [currentPart.id]: {
        ...prev[currentPart.id],
        submitted: true,
        elapsedTime: finalTime,
      },
    }));
    setNextPartIndex(currentPartIndex + 1);
    setShowSubmitModal(true);
  }, [currentPart?.id, currentPartIndex, maxTimeInSeconds, actualElapsedTime]);

  const handleModalAction = useCallback(
    (action) => {
      setShowSubmitModal(false);

      if (
        action === "next" &&
        nextPartIndex !== null &&
        nextPartIndex < examinations.length
      ) {
        setCurrentPartIndex(nextPartIndex);
      }

      setNextPartIndex(null);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [nextPartIndex, examinations.length]
  );

  // --- LOGIC ĐÁP ÁN & TÍNH ĐIỂM (Giữ nguyên) ---
  const correctIndexMap = useMemo(() => {
    const map = {};
    (examinations || []).forEach((part) =>
      (part.mondais || []).forEach((mondai) =>
        (mondai.question_groups || []).forEach((group) =>
          (group.questions || []).forEach((q) => {
            map[q.id] = extractCorrectIndexFromScript(q);
          })
        )
      )
    );
    return map;
  }, [examinations]);

  const currentPartQuestionIds = useMemo(() => {
    const ids = [];
    (mondais || []).forEach((mondai) =>
      (mondai.question_groups || []).forEach((group) =>
        (group.questions || []).forEach((q) => ids.push(q.id))
      )
    );
    return ids;
  }, [mondais]);

  const currentPartTotals = useMemo(() => {
    const total = currentPartQuestionIds.length;
    const selected = currentPartQuestionIds.filter(
      (id) => answers[id] !== undefined
    ).length;
    const correct = currentPartQuestionIds.reduce((acc, id) => {
      const sel = answers[id];
      const corr = correctIndexMap[id];
      if (sel !== undefined && corr !== null && sel === corr) return acc + 1;
      return acc;
    }, 0);
    return { total, selected, correct };
  }, [currentPartQuestionIds, answers, correctIndexMap]);

  const totalExamTotals = useMemo(() => {
    const allQuestionIds = [];
    const partIdMap = {};

    (examinations || []).forEach((part) =>
      (part.mondais || []).forEach((mondai) =>
        (mondai.question_groups || []).forEach((group) =>
          (group.questions || []).forEach((q) => {
            allQuestionIds.push(q.id);
            partIdMap[q.id] = part.id;
          })
        )
      )
    );

    const total = allQuestionIds.length;
    let selected = 0;
    let correct = 0;

    allQuestionIds.forEach((id) => {
      const partId = partIdMap[id];
      const partAnswer = partStates[partId]?.answers[id];
      const correctIdx = correctIndexMap[id];

      if (partAnswer !== undefined) {
        selected += 1;
        if (correctIdx !== null && partAnswer === correctIdx) {
          correct += 1;
        }
      }
    });

    return { total, selected, correct };
  }, [examinations, partStates, correctIndexMap]);

  // LOGIC CHỌN ĐÁP ÁN (Giữ nguyên)
  const handleSelect = (qid, index) => {
    if (submitted || isPartTimeFinished) return;
    setPartStates((prev) => ({
      ...prev,
      [currentPart.id]: {
        ...prev[currentPart.id],
        answers: { ...answers, [qid]: index },
      },
    }));
  };

  // COMPONENT POPUP MODAL (SỬ DỤNG useCallBack ĐỂ ỔN ĐỊNH)
  const PartSubmitModal = useCallback(() => {
    const isNextPartAvailable =
      nextPartIndex !== null && nextPartIndex < examinations.length;
    const isForcedSubmit = nextPartIndex > currentPartIndex && !submitted;

    if (isForcedSubmit) {
      return (
        <ModalWrapper onClose={() => handleModalAction("back")}>
          <h3 className="text-xl font-bold text-red-600 mb-4">
            Nộp bài {currentPart?.name} để tiếp tục?
          </h3>
          <p className="mb-6 text-gray-700">
            Bạn cần hoàn thành và nộp bài kiểm tra hiện tại để chuyển sang phần
            tiếp theo ({examinations[nextPartIndex]?.name}).
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => handleModalAction("back")}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-gray-300 transition"
            >
              Quay lại làm bài
            </button>
            <button
              onClick={() => {
                handleSubmitPart();
                handleModalAction("next");
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-blue-700 transition"
            >
              Nộp bài và chuyển bài
            </button>
          </div>
        </ModalWrapper>
      );
    }

    return (
      <ModalWrapper onClose={() => handleModalAction("view")}>
        <h3 className="text-xl font-bold text-green-600 mb-4">
          🎉 Hoàn thành Phần thi: {currentPart?.name}
        </h3>
        <p className="mb-6 text-gray-700">
          Bạn đã trả lời đúng
          <strong className="text-indigo-600">
            {" "}
            {currentPartTotals.correct}
          </strong>
          /
          <strong className="text-indigo-600">{currentPartTotals.total}</strong>{" "}
          câu.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => handleModalAction("view")}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-gray-300 transition"
          >
            Quay lại (Xem kết quả)
          </button>
          {isNextPartAvailable ? (
            <button
              onClick={() => handleModalAction("next")}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-green-700 transition"
            >
              Chuyển đến {examinations[nextPartIndex]?.name}
            </button>
          ) : (
            <button
              onClick={() => handleModalAction("view")}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-indigo-700 transition"
            >
              Hoàn tất Bài thi
            </button>
          )}
        </div>
      </ModalWrapper>
    );
  }, [
    currentPart?.name,
    currentPartTotals,
    examinations,
    nextPartIndex,
    currentPartIndex,
    submitted,
    handleModalAction,
    handleSubmitPart,
  ]);

  // --- RENDER CHÍNH ---
  return (
    <div className="min-h-screen bg-[#f3fafb]">
      {/* RENDER MODAL */}
      {showSubmitModal && <PartSubmitModal />}

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
            {/* Left: Tên bài thi */}
            <div className="text-lg font-bold text-indigo-700 whitespace-nowrap">
              {examName} {isFullExam ? "(Full)" : "(Tùy chọn)"}
            </div>
            {/* Right: counters + submit */}
            <div className="flex items-center gap-4">
              <div
                className={`text-sm font-medium whitespace-nowrap rounded-md p-2 shadow-inner ${
                  timeRemaining <= 600 && maxTimeInSeconds > 0
                    ? "bg-red-50 text-red-600"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {maxTimeInSeconds > 0 ? "⏱ Còn lại: " : "⏳ Thời gian: "}
                <strong className="tracking-wider">
                  {formatTime(timeDisplay)}
                </strong>
              </div>
              {/* Hiển thị tổng số câu đã làm trên toàn bài thi */}
              <div className="text-sm text-gray-600 whitespace-nowrap">
                Hoàn thành:
                <strong className="text-indigo-600">
                  {" "}
                  {totalExamTotals.selected}
                </strong>
                /
                <strong className="text-indigo-600">
                  {totalExamTotals.total}
                </strong>
              </div>
              {/* Nút nộp bài (chỉ nộp phần thi hiện tại) */}
              {!submitted && !isPartTimeFinished ? (
                <button
                  onClick={handleSubmitPart}
                  className={`ml-2 text-white font-semibold text-sm px-4 py-2 rounded-lg shadow-lg bg-blue-600 hover:bg-blue-700 transition transform hover:scale-[1.02]`}
                >
                  Nộp bài ({currentPart?.name})
                </button>
              ) : (
                <div className="text-sm text-green-600 font-bold whitespace-nowrap rounded-lg p-2 bg-green-50 shadow-inner">
                  ✅ Đã nộp ({currentPart?.name})
                </div>
              )}
            </div>
          </div>
          {/* NAVIGATION PARTS/EXAMINATIONS */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {examinations.map((part, index) => {
              const isCurrent = index === currentPartIndex;
              const isSubmitted = partStates[part.id]?.submitted;
              // Cho phép chuyển nếu đã nộp, là phần hiện tại hoặc là Full Exam
              const canNavigate =
                isSubmitted || index <= currentPartIndex || isFullExam;

              return (
                <button
                  key={part.id}
                  onClick={() => handleSwitchPart(index)}
                  disabled={!canNavigate && index > currentPartIndex}
                  className={`flex-shrink-0 px-3 py-1 rounded-full text-sm font-medium transition whitespace-nowrap border ${
                    isCurrent
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                      : isSubmitted
                      ? "bg-green-100 text-green-700 border-green-400 hover:bg-green-200"
                      : !canNavigate && index > currentPartIndex
                      ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {part.name}
                  {isSubmitted && <span className="ml-1">✓</span>}
                </button>
              );
            })}
          </div>
          {/* Audio cho phần thi hiện tại */}
          {currentPart?.audio ? (
            <div className="mt-3">
              <audio
                controls
                src={currentPart.audio}
                className="w-full rounded-md border border-gray-200"
              />
            </div>
          ) : null}
        </div>
      </div>
      {/* BODY: chỉ hiển thị mondais của currentPart */}
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
          {currentPart?.name}
          <span className="text-base font-normal text-gray-500 ml-2">
            ({currentPartQuestionIds.length} câu
            {maxTimeInSeconds > 0 && (
              <span> | {currentPart.total_time} phút</span>
            )}
            )
          </span>
        </h2>
        {/* Nếu đã nộp bài, hiển thị kết quả chi tiết ở đầu phần */}
        {(submitted || isPartTimeFinished) && (
          <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 mb-6 rounded-lg shadow-sm">
            <p className="font-bold">Đã hoàn thành phần thi này!</p>
            <p>
              Đáp án đúng: {currentPartTotals.correct} /
              {currentPartTotals.total} câu.
            </p>
          </div>
        )}
        {mondais.map((mondai, mondaiIdx) => (
          <div
            key={mondai.id || mondaiIdx}
            className="bg-white rounded-xl shadow-md mb-6 p-5 border border-gray-100"
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
                    (submitted || isPartTimeFinished) &&
                    selected === correctIdx;
                  const isWrong =
                    (submitted || isPartTimeFinished) &&
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
                      {/* PHẦN QUESTION */}
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
                            (submitted || isPartTimeFinished) &&
                            i === correctIdx;
                          const isAnswerWrong =
                            (submitted || isPartTimeFinished) &&
                            i === selected &&
                            selected !== correctIdx;

                          return (
                            <label
                              key={a.id || i}
                              onClick={() => handleSelect(q.id, i)}
                              className={`block cursor-pointer rounded-md border p-3 transition-all ${
                                isAnswerCorrect
                                  ? "bg-green-100 border-green-400 font-semibold"
                                  : isAnswerWrong
                                  ? "bg-red-100 border-red-400 font-semibold"
                                  : isSelected
                                  ? "border-teal-400 bg-teal-50 font-medium"
                                  : "border-gray-200 hover:border-teal-300"
                              }`}
                            >
                              <input
                                type="radio"
                                className="mr-2 pointer-events-none"
                                name={`q_${q.id}_${currentPart?.id}`}
                                checked={selected === i}
                                disabled={submitted || isPartTimeFinished}
                                onChange={() => {}}
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
                      {/* Hiển thị đáp án đúng + lời giải khi đã nộp hoặc hết giờ */}
                      {(submitted || isPartTimeFinished) && (
                        <div className="mt-3 text-sm text-gray-700 bg-white rounded-lg p-3 border border-gray-100 shadow-inner">
                          <div className="mb-2 font-semibold text-green-700">
                            Đáp án đúng:
                            {correctIdx !== null && q.answers?.[correctIdx] ? (
                              <span
                                className="ml-1 text-gray-800 font-normal"
                                dangerouslySetInnerHTML={{
                                  __html: sanitizeHtml(
                                    q.answers[correctIdx].name
                                  ),
                                }}
                              />
                            ) : (
                              <span className="text-gray-500 font-normal">
                                Không rõ
                              </span>
                            )}
                          </div>
                          <div
                            className="bg-gray-50 rounded p-2 text-xs"
                            dangerouslySetInnerHTML={{
                              __html: sanitizeHtml(
                                q.script
                                  ? `<strong>Lời giải:</strong> ${q.script}`
                                  : "<i>Không có lời giải chi tiết.</i>"
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
        {/* FOOTER SUBMIT BUTTON */}
        <div className="py-10 text-center">
          {!submitted && !isPartTimeFinished && (
            <button
              onClick={handleSubmitPart}
              className={`ml-2 text-white font-semibold text-lg px-8 py-3 rounded-xl shadow-xl bg-blue-600 hover:bg-blue-700 transition transform hover:scale-[1.02]`}
            >
              NỘP BÀI PHẦN {currentPart?.name}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
