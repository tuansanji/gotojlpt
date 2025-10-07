"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
// Đảm bảo đường dẫn này chính xác
import examsRiki from "@/data/examsRiki";

// --- ĐỊNH NGHĨA DỮ LIỆU CỐ ĐỊNH ---
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

// --- Component Modal Lựa chọn Phần thi (ĐÃ SỬA isFullExam LOGIC) ---
const PartSelectionModal = ({ examDetail, isOpen, onClose, onStartExam }) => {
  const allPartIds = useMemo(
    () => examDetail?.parts?.map((part) => part.id) || [],
    [examDetail]
  );

  // Khởi tạo state selectedPartIds
  const [selectedPartIds, setSelectedPartIds] = useState(allPartIds);

  // Đồng bộ selectedPartIds khi examDetail (bài thi được chọn) thay đổi
  React.useEffect(() => {
    if (examDetail) {
      // Mặc định chọn tất cả các phần khi Modal mở ra với bài thi mới
      setSelectedPartIds(allPartIds);
    }
  }, [examDetail, allPartIds]); // allPartIds là dependency cần thiết

  if (!isOpen || !examDetail) return null;

  const isAllSelected = selectedPartIds.length === allPartIds.length;

  // ⭐️ Tính toán giá trị isFullExam THỰC TẾ
  const isFullExamValue = isAllSelected;

  const handleTogglePart = (partId) => {
    setSelectedPartIds((prev) => {
      // Nếu là 'Tất cả' đang chọn, thì hành động bỏ chọn một phần sẽ chuyển sang chế độ không 'Tất cả'
      const isCurrentlyAll = prev.length === allPartIds.length;

      if (prev.includes(partId)) {
        return prev.filter((id) => id !== partId);
      } else {
        return [...prev, partId];
      }
    });
  };

  const handleToggleAll = () => {
    if (isAllSelected) {
      setSelectedPartIds([]);
    } else {
      setSelectedPartIds(allPartIds);
    }
  };

  const handleStart = () => {
    if (selectedPartIds.length > 0) {
      // ⭐️ TRUYỀN THÊM GIÁ TRỊ isFullExamValue VÀO HÀM CHUYỂN HƯỚNG
      onStartExam(examDetail.id, selectedPartIds, isFullExamValue);
    } else {
      alert("Vui lòng chọn ít nhất một phần thi để bắt đầu.");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Chọn các phần thi
        </h2>
        <div className="space-y-3">
          {/* Checkbox "Tất cả các phần thi" */}
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox text-blue-600 h-5 w-5 rounded"
              checked={isAllSelected}
              onChange={handleToggleAll}
            />
            <span className="text-gray-900 font-semibold">
              Tất cả các phần thi
            </span>
          </label>
          <hr className="my-2 border-gray-200" />

          {/* Checkbox cho từng phần thi */}
          {examDetail.parts.map((part) => (
            <label
              key={part.id}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <input
                type="checkbox"
                className="form-checkbox text-blue-600 h-5 w-5 rounded"
                checked={selectedPartIds.includes(part.id)}
                onChange={() => handleTogglePart(part.id)}
                // Không vô hiệu hóa khi isAllSelected, để người dùng có thể bỏ chọn 1 phần
                // và tự động chuyển isAllSelected thành false
              />
              <span className="text-gray-700">{part.name}</span>
            </label>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleStart}
            disabled={selectedPartIds.length === 0}
            className={`
              py-2 px-6 rounded-full text-white font-semibold transition-colors duration-200
              ${
                selectedPartIds.length > 0
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-gray-400 cursor-not-allowed"
              }
            `}
          >
            Bắt đầu làm bài
          </button>
        </div>
      </div>
    </div>
  );
};

// ------------------------------------
// --- Component Chính JLPTSelectionPage ---
// ------------------------------------
const JLPTSelectionPage = () => {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState(EXAM_PERIODS[0].id);
  // Thay LEVELS[1].id (N2) thành LEVELS[0].id (N1) nếu muốn mặc định là N1
  const [selectedLevel, setSelectedLevel] = useState(LEVELS[1].id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Logic xử lý dữ liệu
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

  // HÀM: Mở Modal khi ấn VÀO THI
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

  // ⭐️ HÀM: Tạo URL và chuyển hướng (ĐÃ SỬA CHỮ KÝ HÀM)
  const handleStartExam = (examId, topicIds, isFull) => {
    // 1. Chuyển mảng IDs thành chuỗi JSON và mã hóa
    const topicsString = JSON.stringify(topicIds);
    const encodedTopics = encodeURIComponent(topicsString);

    // 2. Tạo URL theo format: /exams/jlpt/detail/ID?isFullExam=true/false&topics=[...]
    // SỬ DỤNG GIÁ TRỊ isFull ĐƯỢC TRUYỀN TỪ MODAL
    const isFullExam = isFull;

    // Đảm bảo cấu trúc URL khớp với cấu trúc thư mục của bạn (ví dụ: /exams/jlpt/detail/[exam])
    const finalUrl = `/exams/jlpt/detail/${examId}?isFullExam=${isFullExam}&topics=${encodedTopics}`;

    // 3. Thực hiện chuyển hướng
    router.push(finalUrl);

    // Đóng Modal sau khi chuyển hướng
    setIsModalOpen(false);
  };

  // --- CSS VÀ UI (Giữ nguyên) ---
  const getPeriodButtonClass = (periodId) => {
    const isActive = periodId === selectedPeriod;
    return `
      flex-1 py-3 px-1 rounded-xl cursor-pointer transition-all duration-200 text-center
      ${
        isActive
          ? "bg-amber-500 text-white shadow-xl shadow-amber-300/60"
          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
      }
    `;
  };

  const getLevelButtonClass = (levelId) => {
    const isActive = levelId === selectedLevel;
    return `
      w-1/5 aspect-square flex flex-col items-center justify-center rounded-full text-center
      text-lg font-bold border-2 transition-all duration-200
      ${
        isActive
          ? "bg-sky-500 text-white border-sky-500 shadow-lg shadow-sky-300/50"
          : "bg-white text-cyan-600 border-cyan-300 hover:bg-cyan-50"
      }
    `;
  };

  const submitButtonClass = `
  cursor-pointer
    mt-8 w-full max-w-xs py-4 rounded-full text-white text-lg font-bold shadow-2xl transition-all duration-300
    ${
      isExamAvailable
        ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-blue-500/50"
        : "bg-gray-400 cursor-not-allowed shadow-gray-400/50"
    }
  `;

  return (
    <div className="min-h-screen pt-12 flex flex-col items-center relative bg-[#d6f0f2] overflow-hidden">
      {/* Background và Content Container */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at top left, #a8dadc 0%, transparent 40%), radial-gradient(circle at bottom right, #457b9d 0%, transparent 40%)",
        }}
      ></div>
      <div className="relative z-10 w-full max-w-3xl px-4">
        <h1 className="text-xl sm:text-2xl text-center font-semibold text-gray-700 mb-6">
          Bạn hãy lựa chọn đợt thi và cấp độ thi tương ứng
        </h1>

        {/* CHỌN BÀI THI CONTAINER */}
        <div className="bg-white p-5 pt-10 rounded-2xl shadow-xl border border-gray-100 relative mb-8">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-5 py-1 rounded-full shadow-lg border border-gray-200 text-base font-semibold text-gray-800">
            CHỌN BÀI THI
          </div>
          <div className="flex space-x-3">
            {EXAM_PERIODS.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={getPeriodButtonClass(period.id)}
              >
                <p className="text-lg font-extrabold leading-none">
                  {period.label}
                </p>
                <p className="text-xs mt-0.5 opacity-90">{period.date}</p>
              </button>
            ))}
          </div>
        </div>

        {/* CHỌN CẤP ĐỘ CONTAINER */}
        <div className="bg-white p-5 pt-10 rounded-2xl shadow-xl border border-gray-100 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-5 py-1 rounded-full shadow-lg border border-gray-200 text-base font-semibold text-gray-800">
            CHỌN CẤP ĐỘ
          </div>
          <div className="flex justify-between space-x-2">
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
            VÀO THI
          </button>
        </div>

        {/* Hiển thị thông báo (giữ nguyên) */}
        <div className="text-center mt-4 text-sm font-medium text-gray-600">
          {selectedExamDetail ? (
            <p className="text-green-600">
              Đã chọn: **{selectedExamDetail.name}**.
            </p>
          ) : (
            <p className="text-red-500">
              *Lưu ý: Không tìm thấy bài thi {getLevelName(selectedLevel)} cho{" "}
              {EXAM_PERIODS.find((p) => p.id === selectedPeriod)?.label}.
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
