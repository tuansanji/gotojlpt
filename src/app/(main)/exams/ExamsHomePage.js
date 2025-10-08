"use client";

import React, { useState, useMemo, useEffect } from "react";
// Giữ nguyên logic import gốc
import { useRouter } from "next/navigation";
import examsRiki from "@/data/examsRiki";

// --- ĐỊNH NGHĨA DỮ LIỆU CỐ ĐỊNH (Giữ nguyên) ---
const EXAM_PERIODS = [
  { id: 1, label: "Bài 1", date: "24/05 - 26/05" },
  { id: 2, label: "Bài 2", date: "07/06 - 09/06" },
  { id: 3, label: "Bài 3", date: "21/06 - 23/06" },
  { id: 4, label: "Bài 4", date: "01/07 - 06/07" },
];

const LEVELS = [
  { id: 5, label: "N1" },
  { id: 4, label: "N2" },
  { id: 3, label: "N3" },
  { id: 2, label: "N4" },
  { id: 1, label: "N5" },
];

const getLevelName = (levelId) => {
  return LEVELS.find((l) => l.id === levelId)?.label || `N? (${levelId})`;
};
// ------------------------------------

// --- Component Modal Lựa chọn Phần thi (Cập nhật CSS, Giữ nguyên Logic) ---
const PartSelectionModal = ({ examDetail, isOpen, onClose, onStartExam }) => {
  const allPartIds = useMemo(
    () => examDetail?.parts?.map((part) => part.id) || [],
    [examDetail]
  );

  // Khởi tạo state selectedPartIds
  const [selectedPartIds, setSelectedPartIds] = useState(allPartIds);

  // Đồng bộ selectedPartIds khi examDetail (bài thi được chọn) thay đổi
  useEffect(() => {
    if (examDetail) {
      // Mặc định chọn tất cả các phần khi Modal mở ra với bài thi mới
      setSelectedPartIds(allPartIds);
    }
  }, [examDetail, allPartIds]); // allPartIds là dependency cần thiết

  if (!isOpen || !examDetail) return null;

  const isAllSelected = selectedPartIds.length === allPartIds.length;

  // ⭐️ Tính toán giá trị isFullExam THỰC TẾ (Giữ nguyên Logic)
  const isFullExamValue = isAllSelected;

  const handleTogglePart = (partId) => {
    setSelectedPartIds((prev) => {
      // Giữ nguyên logic toggle part
      if (prev.includes(partId)) {
        return prev.filter((id) => id !== partId);
      } else {
        return [...prev, partId];
      }
    });
  };

  const handleToggleAll = () => {
    // Giữ nguyên logic toggle all
    if (isAllSelected) {
      setSelectedPartIds([]);
    } else {
      setSelectedPartIds(allPartIds);
    }
  };

  const handleStart = () => {
    if (selectedPartIds.length > 0) {
      // ⭐️ TRUYỀN THÊM GIÁ TRỊ isFullExamValue VÀO HÀM CHUYỂN HƯỚNG (Giữ nguyên Logic)
      onStartExam(examDetail.id, selectedPartIds, isFullExamValue);
    } else {
      alert("Vui lòng chọn ít nhất một phần thi để bắt đầu.");
    }
  };

  return (
    // Cập nhật UI Modal (Cyan/Blue)
    <div
      className="fixed inset-0 bg-blue-500/30 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white p-7 rounded-2xl shadow-2xl w-full max-w-sm transform transition-all duration-300 scale-100 opacity-100 border-t-8 border-cyan-500"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-5 text-gray-800 text-center">
          📝 Lựa Chọn Phần Thi
        </h2>

        {/* Checkbox "Tất cả các phần thi" */}
        <label className="flex items-center justify-between p-3 bg-cyan-100/50 rounded-lg mb-4 cursor-pointer hover:bg-cyan-100 transition-colors border border-cyan-200">
          <span className="text-gray-900 font-bold">Tất cả các phần thi</span>
          <input
            type="checkbox"
            className="form-checkbox text-cyan-600 h-6 w-6 rounded-md border-cyan-400 focus:ring-cyan-500 transition-transform duration-200 transform scale-110"
            checked={isAllSelected}
            onChange={handleToggleAll}
          />
        </label>

        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {/* Checkbox cho từng phần thi */}
          {examDetail.parts.map((part) => (
            <label
              key={part.id}
              className="flex items-center justify-between space-x-3 p-3 bg-white rounded-lg cursor-pointer hover:bg-gray-50 transition-colors border border-gray-200"
            >
              <span className="text-gray-700 font-medium">{part.name}</span>
              <input
                type="checkbox"
                className="form-checkbox text-blue-600 h-5 w-5 rounded-md border-gray-300 focus:ring-blue-500"
                checked={selectedPartIds.includes(part.id)}
                onChange={() => handleTogglePart(part.id)}
              />
            </label>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleStart}
            disabled={selectedPartIds.length === 0}
            className={`
              w-full py-3 px-6 rounded-full text-white font-bold transition-all duration-300 shadow-xl transform hover:scale-[1.03]
              ${
                selectedPartIds.length > 0
                  ? "bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 shadow-blue-400/70"
                  : "bg-gray-400 cursor-not-allowed shadow-gray-400/50"
              }
            `}
          >
            Bắt đầu ({selectedPartIds.length} phần)
          </button>
        </div>
      </div>
    </div>
  );
};

// ------------------------------------
// --- Component Chính JLPTSelectionPage (Cập nhật CSS, Giữ nguyên Logic) ---
// ------------------------------------
const JLPTSelectionPage = () => {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState(EXAM_PERIODS[0].id);
  const [selectedLevel, setSelectedLevel] = useState(LEVELS[1].id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Logic xử lý dữ liệu (Giữ nguyên)
  const availableExams = useMemo(() => {
    // Giả sử examsRiki là một object có thuộc tính exams là mảng data
    return examsRiki.exams.filter((exam) => exam.exam > 0);
  }, []);

  const selectedExamDetail = useMemo(() => {
    return availableExams.find(
      (exam) => exam.exam === selectedPeriod && exam.level_id === selectedLevel
    );
  }, [selectedPeriod, selectedLevel, availableExams]);

  const isExamAvailable = !!selectedExamDetail;
  // --- KẾT THÚC LOGIC XỬ LÝ DỮ LIỆU ---

  // HÀM: Mở Modal khi ấn VÀO THI (Giữ nguyên Logic)
  const handleOpenModal = () => {
    if (isExamAvailable && selectedExamDetail) {
      setIsModalOpen(true);
    } else {
      alert(
        `Không tìm thấy bài thi ${getLevelName(selectedLevel)} cho ${
          EXAM_PERIODS.find((p) => p.id === selectedPeriod)?.label
        }.`
      );
    }
  };

  // ⭐️ HÀM: Tạo URL và chuyển hướng (Giữ nguyên Logic)
  const handleStartExam = (examId, topicIds, isFull) => {
    // 1. Chuyển mảng IDs thành chuỗi JSON và mã hóa
    const topicsString = JSON.stringify(topicIds);
    const encodedTopics = encodeURIComponent(topicsString);

    // 2. Tạo URL theo format: /exams/jlpt/detail/ID?isFullExam=true/false&topics=[...]
    const isFullExam = isFull;

    // Đảm bảo cấu trúc URL khớp với cấu trúc thư mục của bạn (ví dụ: /exams/jlpt/detail/[exam])
    const finalUrl = `/exams/jlpt/detail/${examId}?isFullExam=${isFullExam}&topics=${encodedTopics}`;

    // 3. Thực hiện chuyển hướng
    router.push(finalUrl);

    // Đóng Modal sau khi chuyển hướng
    setIsModalOpen(false);
  };

  // --- CẬP NHẬT CSS PHONG CÁCH FANPAGE (Cyan/Pink) ---
  const getPeriodButtonClass = (periodId) => {
    const isActive = periodId === selectedPeriod;
    return `
      flex-1 py-3 px-1 rounded-xl cursor-pointer transition-all duration-300 text-center
      text-base font-bold border-2 
      ${
        isActive
          ? "bg-blue-500 text-white border-blue-500 shadow-xl shadow-blue-400/60 transform scale-[1.05]"
          : "bg-white text-gray-700 border-gray-200 hover:bg-blue-50 hover:border-blue-300"
      }
    `;
  };

  const getLevelButtonClass = (levelId) => {
    const isActive = levelId === selectedLevel;
    return `
      w-1/5 aspect-square flex flex-col items-center justify-center rounded-2xl text-center
      text-2xl font-extrabold border-4 transition-all duration-300 transform
      ${
        isActive
          ? "bg-pink-500 text-white border-pink-600 shadow-xl shadow-pink-400/70 scale-110"
          : "bg-white text-pink-600 border-pink-200 hover:bg-pink-50 hover:shadow-lg hover:scale-[1.05]"
      }
    `;
  };

  const submitButtonClass = `
    cursor-pointer
    mt-10 w-full max-w-md py-5 rounded-full text-white text-xl font-black transition-all duration-300 
    tracking-wider transform active:scale-[0.98]
    ${
      isExamAvailable
        ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-2xl shadow-cyan-400/50"
        : "bg-gray-400 cursor-not-allowed shadow-gray-400/50"
    }
  `;
  // -------------------------------------------------------------

  return (
    // THAY ĐỔI: Sử dụng nền nhẹ nhàng, tươi sáng (fanpage feel)
    <div className="min-h-screen pt-16 pb-20 flex flex-col items-center relative bg-gray-50 font-sans overflow-hidden">
      {/* Background Shape Overlay (Blue/Cyan) */}
      <div
        className="absolute top-0 left-0 w-full h-[55vh] bg-blue-50/50 rounded-b-[45%] opacity-70"
        style={{ transform: "scaleX(1.3)" }}
      ></div>
      <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-cyan-50/50 rounded-tl-[40%] opacity-50 z-0"></div>

      <div className="relative z-10 w-full max-w-4xl px-4">
        <h1 className="text-3xl sm:text-4xl text-center font-extrabold text-gray-800 mb-10 mt-4 leading-snug">
          🌟 Luyện Thi **JLPT** Cùng{" "}
          <span className="text-red-600">GOTOJLPT </span>!
          <p className="text-xl font-medium text-gray-500 mt-2">
            Chọn ngay bài thi và cấp độ để bắt đầu.
          </p>
        </h1>

        {/* CHỌN BÀI THI CONTAINER (Card Period) */}
        <div className="bg-white p-6 rounded-3xl shadow-2xl border-t-4 border-blue-500 relative mb-8 transform hover:shadow-3xl transition-shadow duration-300">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-5 py-1 rounded-full shadow-lg text-base font-bold uppercase tracking-wider">
            BÀI THI
          </div>
          <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mt-4">
            {EXAM_PERIODS.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={getPeriodButtonClass(period.id)}
              >
                <p className="text-xl font-extrabold leading-tight">
                  {period.label}
                </p>
                <p className="text-sm mt-0.5 opacity-90">{period.date}</p>
              </button>
            ))}
          </div>
        </div>

        {/* CHỌN CẤP ĐỘ CONTAINER (Card Level) */}
        <div className="bg-white p-6 rounded-3xl shadow-2xl border-t-4 border-pink-500 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-pink-500 text-white px-5 py-1 rounded-full shadow-lg text-base font-bold uppercase tracking-wider">
            CẤP ĐỘ
          </div>
          <div className="flex justify-between space-x-3 mt-4">
            {LEVELS.map((level) => (
              <button
                key={level.id}
                onClick={() => setSelectedLevel(level.id)}
                className={getLevelButtonClass(level.id)}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        {/* NÚT VÀO THI */}
        <div className="flex justify-center">
          <button
            onClick={handleOpenModal}
            className={submitButtonClass}
            disabled={!isExamAvailable}
          >
            {isExamAvailable ? "VÀO THI NGAY!" : "CHƯA CÓ BÀI THI"}
          </button>
        </div>

        {/* Hiển thị thông báo */}
        <div className="text-center mt-6 text-base font-semibold">
          {selectedExamDetail ? (
            <p className="text-green-700 p-3 bg-green-100 rounded-xl shadow-md border-l-4 border-green-500">
              ✅ Đã chọn: **{selectedExamDetail.name}**. Sẵn sàng để làm bài.
            </p>
          ) : (
            <p className="text-red-600 p-3 bg-red-100 rounded-xl shadow-md border-l-4 border-red-500">
              ❌ *Lưu ý: Không tìm thấy bài thi **{getLevelName(selectedLevel)}
              ** cho **
              {EXAM_PERIODS.find((p) => p.id === selectedPeriod)?.label}**.
            </p>
          )}
        </div>
      </div>

      {/* RENDER MODAL */}
      <PartSelectionModal
        examDetail={selectedExamDetail}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStartExam={handleStartExam}
      />
    </div>
  );
};

export default JLPTSelectionPage;
