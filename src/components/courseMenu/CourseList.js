"use client";

import useAuthStore from "@/store/authStore";
import useStatusStore from "@/store/statusStore";
import { useEffect } from "react";

import useCourseStore from "@/store/courseStore";
import { toast } from "sonner";
import { listCourse } from "@/data/courses";
import CourseCardV2 from "./CourseCardV2";

const CourseList = () => {
  // const token = useAuthStore((state) => state.token);
  // const setLoading = useStatusStore((state) => state.setLoading);
  // const setNCourse = useCourseStore((state) => state.setNCourse);
  // const nCourse = useCourseStore((state) => state.NCourse);
  const groupedCourses = listCourse.reduce((acc, course) => {
    const provider = course.provider; // Lấy 'riki' hoặc 'dungmori'

    // Khởi tạo mảng cho provider nếu chưa tồn tại
    if (!acc[provider]) {
      acc[provider] = [];
    }

    // Thêm khóa học vào mảng của provider tương ứng
    acc[provider].push(course);

    return acc;
  }, {});
  const formatProviderTitle = (provider) => {
    const title =
      provider.toLowerCase() === "riki"
        ? "Khóa học Riki"
        : "Khóa học Dũng Mori";

    return title;
  };
  return (
    <div className="min-h-screen bg-gray-50 md:p-6 p-3 px-1 sm:p-10">
      {/* Tiêu đề trang */}
      <header className="max-w-7xl px-3 mx-auto md:mb-10 mb-4">
        <h1 className="md:text-4xl text-xl font-extrabold text-gray-900 mb-2">
          📚 Danh Sách Các Khóa Học JLPT
        </h1>
        <p className="md:text-lg text-[14px] ml-3 text-gray-600">
          Khám phá các khóa học tiếng Nhật từ cấp độ N5 đến N1.
        </p>
      </header>

      {/* Lưới hiển thị Khóa học (Grid) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Lặp qua các nhóm (riki, dungmori) */}
        {Object.keys(groupedCourses).map((providerKey) => (
          <section key={providerKey} className="md:mb-12 mb-8">
            {/* 2. TIÊU ĐỀ KHÓA HỌC */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-cyan-700 mb-6 border-b-2 pb-3 capitalize">
              {formatProviderTitle(providerKey)}
            </h2>
            {/* 3. GRID RENDER KHÓA HỌC TRONG NHÓM */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
              {groupedCourses[providerKey].map((course) => (
                <CourseCardV2 key={course.id} course={course} />
              ))}
            </div>
          </section>
        ))}
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
