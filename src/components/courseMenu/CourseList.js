"use client";

import useAuthStore from "@/store/authStore";
import useStatusStore from "@/store/statusStore";
import { useEffect } from "react";

import useCourseStore from "@/store/courseStore";
import { toast } from "sonner";
import { listCourse } from "@/data/courses";
import CourseCardV2 from "./CourseCardV2";

const CourseList = () => {
  const token = useAuthStore((state) => state.token);
  const setLoading = useStatusStore((state) => state.setLoading);
  const setNCourse = useCourseStore((state) => state.setNCourse);
  const nCourse = useCourseStore((state) => state.NCourse);

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      {/* Tiêu đề trang */}
      <header className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          📚 Danh Sách Các Khóa Học JLPT
        </h1>
        <p className="text-lg text-gray-600">
          Khám phá các khóa học tiếng Nhật từ cấp độ N5 đến N1.
        </p>
      </header>

      {/* Lưới hiển thị Khóa học (Grid) */}
      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listCourse &&
            listCourse.map((course) => (
              <CourseCardV2 key={course.id} course={course} />
            ))}
        </div>
      </main>

      {/* Footer / Phân trang (Nếu cần) */}
      {/* Hiện tại dữ liệu chỉ có 1 trang nên bỏ qua phần pagination phức tạp */}
      {/* <footer className="max-w-7xl mx-auto mt-10 text-center text-gray-500 text-sm">
        {nCourse &&
          `Đang hiển thị ${nCourse.from} - ${nCourse.to} trên tổng số ${nCourse.total} 
        khóa học.`}
      </footer> */}
    </div>
  );
};

export default CourseList;
