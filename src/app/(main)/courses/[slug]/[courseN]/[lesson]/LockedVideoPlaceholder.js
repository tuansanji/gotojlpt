"use client";

import React from "react";
import { Lock, ShoppingCart } from "lucide-react";
import Link from "next/link";

const LockedVideoPlaceholder = () => {
  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl mb-6">
      {/* Nền gradient rực rỡ */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-teal-500 to-cyan-400 animate-gradient-slow"></div>

      {/* Lớp phủ ánh sáng trắng nhẹ */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>

      {/* Nội dung trung tâm */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        {/* Icon khóa */}
        <div className="md:flex items-center justify-center w-24 h-24 rounded-full bg-white/25 shadow-md md:mb-6 hidden ">
          <Lock
            size={48}
            strokeWidth={1.5}
            className="text-white drop-shadow-lg w-5 h-5"
          />
        </div>

        {/* Tiêu đề */}
        <h2 className="text-[15px] md:text-3xl font-bold mb-3 drop-shadow-md">
          Bài học này hiện bị khóa
        </h2>

        {/* Mô tả */}
        <p className="text-white/90 text-[12px] md:text-base md:mb-6 mb-2 max-w-md leading-relaxed">
          Vui lòng mua khóa học để xem toàn bộ nội dung video và tài liệu đính
          kèm.
        </p>

        {/* Nút mua khóa học */}
        <Link
          href={"/pay"}
          className="cursor-pointer  flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 px-6 md:py-3 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold tracking-wide"
        >
          <ShoppingCart size={18} />
          Mua khóa học ngay
        </Link>
      </div>
    </div>
  );
};

export default LockedVideoPlaceholder;
