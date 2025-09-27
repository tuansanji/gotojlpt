"use client";

import React, { useEffect } from "react";
import { toast } from "sonner";

import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCourseUser } from "@/services/courseService";
import useStatusStore from "@/store/statusStore";

function UserProfile() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const getCourseOfUser = useAuthStore((state) => state.getCourseOfUser);
  const purchased_courses = useAuthStore((state) => state.purchased_courses);
  const setLoading = useStatusStore((state) => state.setLoading);

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    // 2. Định dạng ngày, tháng, năm
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (user && token) {
      setLoading(true);
      getCourseUser(token)
        .then((userData) => {
          getCourseOfUser(userData.purchased_courses);
          setLoading(false);
        })

        .catch((error) => {
          console.error("Lỗi khi tải dữ liệu người dùng:", error.message);
          setLoading(false);
        });
    }
  }, [user, token]);

  // Component để hiển thị một trường thông tin
  const InfoField = ({ label, value, icon, className = "" }) => (
    <div className={`flex flex-col space-y-1 `}>
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <div
        className={`flex items-center p-3 border border-gray-200 rounded-lg md:h-12 h-9 bg-gray-50} ${className}`}
      >
        {icon && <span className="mr-3 text-gray-500">{icon}</span>}
        <p className="text-sm text-gray-900">{value}</p>
      </div>
    </div>
  );

  if (!user) {
    return null;
  }

  /**
   * Tính số ngày còn lại (hoặc đã qua) giữa ngày mục tiêu và ngày hiện tại.
   *
   * @param {string} targetDateString Chuỗi ngày mục tiêu (ví dụ: "2025-10-25T02:47:02.000000Z")
   * @returns {number | string} Số ngày nguyên còn lại, hoặc chuỗi nếu ngày đã qua.
   */
  function getDaysDifference(targetDateString) {
    // Định nghĩa số mili giây trong một ngày
    const MS_PER_DAY = 1000 * 60 * 60 * 24;

    // 1. Khởi tạo ngày mục tiêu từ chuỗi
    const targetDate = new Date(targetDateString);

    // 2. Thiết lập ngày hiện tại và ngày mục tiêu về 00:00:00 của ngày đó
    // Điều này loại bỏ yếu tố thời gian trong ngày để tính số ngày chính xác hơn
    const now = new Date();

    // Ngày hiện tại (chỉ lấy ngày, tháng, năm)
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    // Ngày mục tiêu (chỉ lấy ngày, tháng, năm)
    const startOfTargetDate = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      targetDate.getDate()
    );

    const timeDifference = startOfTargetDate.getTime() - startOfToday.getTime();
    const daysRemaining = Math.floor(timeDifference / MS_PER_DAY);

    // 5. Xử lý kết quả trả về
    if (daysRemaining < 0) {
      return `Đã hết hạn (${Math.abs(daysRemaining)} ngày trước)`;
    }

    return ` ${Math.abs(daysRemaining)} ngày. Đến ngày ${formatDate(
      targetDateString
    )} `;
  }

  return (
    <div className="min-h-screen p-0 bg-gray-100 sm:p-4">
      <div className="relative z-10 max-w-5xl p-4 mx-auto mt-2 bg-white shadow-2xl md:mt-10 sm:p-8 rounded-xl">
        {/* THANH TABS (CHỈ DÙNG ĐỂ HIỂN THỊ TIÊU ĐỀ) */}
        <div className="flex md:gap-6 mb-6 text-sm font-medium text-gray-500 border-b border-gray-200 sm:text-base text-[12px]">
          <button className="px-2 py-3 border-b-2 cursor-pointer md:px-4 border-cyan-500 text-cyan-500">
            Thông tin cá nhân
          </button>
          <button
            onClick={() => {
              toast.error("Chức năng đang bảo trì");
            }}
            className="px-2 py-3 transition duration-150 cursor-pointer md:px-4 hover:text-gray-900"
          >
            Thay đổi mật khẩu
          </button>
          <Link
            href="https://www.facebook.com/profile.php?id=100090524688743"
            target="_blank" // 👈 Bắt buộc: Mở trong tab mới
            rel="noopener noreferrer"
            className="px-2 py-3 transition duration-150 md:px-4 hover:text-gray-900"
          >
            Liên Hệ hỗ trợ
          </Link>
        </div>

        {/* GRID HIỂN THỊ THÔNG TIN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 md:gap-y-6">
          <InfoField label="Tên học viên" value={user.name} icon="👤" />
          <InfoField label="Email" value={user.email} icon="📧" />
          <InfoField
            label="Ngày tham gia"
            value={formatDate(user.created_at)}
            icon="📅"
          />
          <InfoField
            label="Thay đổi gần đây"
            value={formatDate(user.updated_at)}
            icon="📅"
          />
          <InfoField label="Quốc gia" value="Việt Nam" icon="🌍" />
        </div>
        {/* === SECTION: THÔNG TIN KHÓA HỌC (MỚI) === */}
        <h3 className="pt-4 pb-2 mb-4 text-xl font-bold text-red-600 border-b">
          KHÓA HỌC
        </h3>
        {purchased_courses &&
          purchased_courses.map((course, index) => (
            <div key={index}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 md:gap-y-6">
                <InfoField
                  label="Khóa học đang theo học"
                  value={course.title}
                  icon="📚"
                />
                <InfoField
                  className={
                    course.status === "active" ? "bg-green-100" : "bg-red-200"
                  }
                  label="Thời gian còn lại"
                  value={getDaysDifference(course.expires_at)}
                  icon="⏳"
                />
              </div>
            </div>
          ))}

        <div className="flex items-center pt-6 mt-8 space-x-4 border-t">
          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="px-6 py-3 md:text-sm text-[12px] font-bold text-white transition-colors duration-300 transform bg-red-500 rounded-lg shadow-md cursor-pointer hover:bg-red-600 active:scale-95"
          >
            Đăng Xuất
          </button>
          <button
            disabled
            className="px-6 py-3 md:text-sm text-[12px] font-bold text-gray-500 bg-gray-200 rounded-lg cursor-not-allowed"
          >
            Yêu cầu sửa tài khoản (Tính năng bị vô hiệu hóa)
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
