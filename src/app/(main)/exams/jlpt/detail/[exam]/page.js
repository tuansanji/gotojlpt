"use client";

import React, { useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import ExamContent from "./ExamContent"; // Import Component con

// Giả định data được import từ một file JSON hoặc module
// ⚠️ Thay thế bằng đường dẫn chính xác của bạn
import examsRiki from "@/data/exams"; // Giả định examsRiki là mảng các exam

// --- Hàm tiện ích: Map data examsRiki sang Map ID-to-Object để tìm kiếm O(1) ---
const EXAMS_BY_ID = (examsRiki || []).reduce((map, exam) => {
  map[exam.id] = exam;
  return map;
}, {});
// -----------------------------------------------------------------------------

// ⭐️ Hàm tiện ích: Lọc các Examination/Part theo danh sách part ID được chọn
const filterExaminationsByTopics = (examDetail, topicIds) => {
  // Sử dụng 'parts' thay vì 'examinations' nếu data gốc của bạn là 'parts'
  // Dựa trên data JSON bạn gửi, key là 'parts' trong object exam
  if (!examDetail || !examDetail.examinations) return [];

  // Lọc và giữ nguyên thứ tự các phần thi theo data gốc
  const selectedExaminations = examDetail.examinations.filter((part) =>
    topicIds.includes(part.id)
  );

  return selectedExaminations;
};

export default function ExamDetailPage() {
  const params = useParams();
  const examId = params.exam;
  const searchParams = useSearchParams();

  // LOGIC LẤY DATA VÀ LỌC DATA
  const { examDetail, parsedTopics, isFullExam } = useMemo(() => {
    if (!examId) return {};

    const numericExamId = parseInt(examId, 10);
    const detail = EXAMS_BY_ID[numericExamId];

    const topicsParam = searchParams.get("topics");
    let topicsArray = [];
    try {
      if (topicsParam) {
        const decodedString = decodeURIComponent(topicsParam);
        topicsArray = JSON.parse(decodedString).map((id) => parseInt(id, 10)); // Đảm bảo là số
      }
    } catch (e) {
      console.error("Lỗi phân tích tham số topics:", e);
    }

    const isFull = searchParams.get("isFullExam") === "true";

    return {
      examDetail: detail,
      parsedTopics: topicsArray,
      isFullExam: isFull,
    };
  }, [examId, searchParams]);

  // ⭐️ Lọc các Examination (Part) cần hiển thị
  const examinations = useMemo(() => {
    if (!examDetail) return [];

    let filtered = filterExaminationsByTopics(examDetail, parsedTopics);

    // Trường hợp Full Exam: lấy tất cả các parts
    if (
      isFullExam &&
      filtered.length === 0 &&
      examDetail.examinations.length > 0
    ) {
      filtered = examDetail.examinations;
    }

    // Đảm bảo mỗi examination có mảng mondais và time để tránh lỗi
    return filtered.map((part) => ({
      ...part,
      mondais: part.mondais || [], // Đảm bảo mondais tồn tại
      time: part.time || 0, // ⭐️ Đảm bảo time (phút) tồn tại
    }));
  }, [examDetail, parsedTopics, isFullExam]);

  // --- KIỂM TRA & HIỂN THỊ TRƯỚC ---
  if (!examDetail) {
    return (
      <div className="p-8 text-center text-xl font-bold text-red-600">
        Bài thi không tồn tại (ID: {examId}).
      </div>
    );
  }

  if (examinations.length === 0) {
    return (
      <div className="p-8 text-center text-xl font-bold text-red-600">
        Không có phần thi nào được chọn hoặc dữ liệu không hợp lệ.
        <p className="text-sm mt-2 text-gray-600">
          ID Bài thi: {examId}. Parts được chọn: {parsedTopics.join(", ")}
        </p>
      </div>
    );
  }

  // --- TRUYỀN DỮ LIỆU ĐÃ LỌC VÀO COMPONENT CON ---
  return (
    <ExamContent
      examinations={examinations} // ⭐️ Truyền mảng các phần thi (kèm time)
      examName={examDetail.name}
      isFullExam={isFullExam}
    />
  );
}
