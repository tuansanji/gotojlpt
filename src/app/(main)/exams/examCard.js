// components/ExamCard.js

import React from "react";
import Image from "next/image";
import Link from "next/link";

// Giả sử bạn có các icon SVG
const icons = {
  // ... (Icons giữ nguyên)
  basic: (
    <svg
      className="w-5 h-5 text-gray-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.75 17L12 14.75m2.25 2.25l-2.25-2.25m-2.25-2.25l-2.25 2.25M6 9l6-6 6 6m-3-3v8"
      ></path>
    </svg>
  ),
  online: (
    <svg
      className="w-5 h-5 text-gray-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
  ),
  time: (
    <svg
      className="w-5 h-5 text-gray-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h.01M5 12h14a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2z"
      ></path>
    </svg>
  ),
};

const ExamCard = ({ course }) => {
  return (
    // 🌟 FIX: Đặt max-w-4xl (hoặc kích thước hợp lý) và mx-auto, loại bỏ w-full md:max-w-[70%]
    <div className="relative max-w-4xl p-6  md:mx-auto mx-4 mt-6 bg-white border border-gray-200 shadow-xl rounded-3xl">
      {/* Container chính: Đã thêm md:justify-center để hỗ trợ căn giữa tốt hơn */}
      <div className="flex flex-col items-start space-y-6 md:flex-row **md:items-center** md:space-y-0 md:space-x-10">
        {/* Hình ảnh chính */}
        {/* 🌟 FIX: w-full h-auto trên mobile, cố định trên md trở lên */}
        <div className="relative flex-shrink-0 w-full h-auto md:w-[300px]">
          <Image
            src={course.image}
            alt={course.title}
            width={300}
            height={200}
            // 🌟 FIX: Thêm h-auto w-full để Image responsive trên mobile
            className="shadow-lg rounded-2xl w-full h-auto"
          />
        </div>

        {/* Nội dung bên phải */}
        {/* 🌟 FIX: Thêm flex-col justify-center để các nội dung con được căn giữa theo chiều dọc */}
        <div className="flex-1 space-y-4 flex flex-col justify-center">
          {/* Tiêu đề */}
          <h2 className="text-3xl font-bold text-gray-800">
            Luyện thi JLPT
            <span className="text-pink-500"> {course.provider}</span>
          </h2>

          {/* Mô tả ngắn */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-gray-600 md:text-base">
            <div className="flex items-center space-x-2">
              {icons.basic}
              <span>{course.level}</span>
            </div>
            <div className="flex items-center space-x-2">
              {icons.online}
              <span>{course.type}</span>
            </div>
            <div className="flex items-center space-x-2">
              {icons.time}
              <span>{course.duration}</span>
            </div>
          </div>

          <p className="text-sm text-gray-700 md:text-base">
            {course.description}
          </p>

          {/* Thẻ N-levels */}
          <div className="flex flex-wrap gap-4 pt-2">
            {course.levels.map((level, index) => (
              <span
                key={index}
                className={`flex items-center justify-center md:w-12 w-10 md:h-12 h-10 rounded-full border border-gray-400 font-bold ${
                  level.active
                    ? "bg-green-600 text-white border-green-600"
                    : "text-gray-700"
                }`}
              >
                {level.name}
              </span>
            ))}
          </div>

          {/* Nút Xem chi tiết (giữ nguyên, căn phải) */}
          <div className="flex justify-end pt-4">
            <Link
              href={course.link}
              className="flex items-center font-bold text-pink-500 transition-colors hover:text-pink-600"
            >
              Xem chi tiết
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamCard;
