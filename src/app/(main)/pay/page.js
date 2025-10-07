"use client";

import React, { useState } from "react";
import { CreditCard, Clock, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import useAuthStore from "@/store/authStore";
import Link from "next/link";

// Data giả định (lấy từ database hoặc API thật)
const listCourse = [
  { id: 1, provider: "riki", level: "N5", title: "Riki JLPT N5" },
  { id: 2, provider: "riki", level: "N4", title: "Riki JLPT N4" },
  { id: 3, provider: "riki", level: "N3", title: "Riki JLPT N3" },
  { id: 4, provider: "riki", level: "N2", title: "Riki JLPT N2" },
  { id: 5, provider: "riki", level: "N1", title: "Riki JLPT N1" },
  { id: 6, provider: "dungmori", level: "N5", title: "Dũng Mori JLPT N5" },
  { id: 7, provider: "dungmori", level: "N4", title: "Dũng Mori JLPT N4" },
  { id: 8, provider: "dungmori", level: "N3", title: "Dũng Mori JLPT N3" },
  { id: 9, provider: "dungmori", level: "N2", title: "Dũng Mori JLPT N2" },
  { id: 10, provider: "dungmori", level: "N1", title: "Dũng Mori JLPT N1" },
];

const PaymentPage = () => {
  const user = useAuthStore((state) => state.user);

  const [selectedCourse, setSelectedCourse] = useState(listCourse[4]); // mặc định N1
  const basePrice = 49000;

  const plans = [
    { label: "1 tháng", price: basePrice },
    { label: "3 tháng", price: basePrice * 2.5 },
    { label: "6 tháng", price: basePrice * 4.5 },
    { label: "Trọn đời", price: basePrice * 7 },
  ];

  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const [loading, setLoading] = useState(false);

  // Hàm gửi thông tin thanh toán
  const handlePayment = async () => {
    // setLoading(true);
    const payload = {
      userId: user.id,
      courseId: selectedCourse.id,
      plan: selectedPlan.label,
      totalPrice: selectedPlan.price,
    };

    console.log("Thanh toán:", payload);
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className=" md:w-3/5 bg-white rounded-2xl shadow-lg overflow-hidden mx-auto">
        {/* Header */}
        <div className="bg-indigo-600 text-white px-5 py-3">
          <h1 className="text-xl font-semibold">Thanh toán khóa học</h1>
          <p className="text-indigo-100 text-sm">
            Hoàn tất thanh toán để truy cập toàn bộ nội dung
          </p>
        </div>
        {/* Nội dung */}
        <div className="p-6 space-y-5">
          {/* Thông tin người dùng */}
          <div className="bg-gray-50 rounded-lg p-3 shadow-sm text-sm">
            <h2 className="font-semibold text-gray-700 mb-1 text-sm">
              Thông tin người dùng
            </h2>

            {user ? (
              <>
                <p className="text-gray-600">👤 {user.name}</p>
                <p className="text-gray-600">📧 {user.email}</p>
              </>
            ) : (
              <div className="flex flex-col items-start gap-2">
                <p className="text-gray-600">
                  ⚠️ Chưa có tài khoản. Vui lòng đăng ký để tiếp tục thanh toán.
                </p>
                <Link
                  href="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-sm"
                >
                  Đăng ký ngay
                </Link>
              </div>
            )}
          </div>

          {/* Khóa học */}
          <div className="bg-gray-50 rounded-lg p-3 shadow-sm text-sm">
            <h2 className="font-semibold text-gray-700 mb-2">Chọn khóa học</h2>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
              value={selectedCourse.id}
              onChange={(e) => {
                const course = listCourse.find(
                  (c) => c.id === Number(e.target.value)
                );
                setSelectedCourse(course);
              }}
            >
              {listCourse.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          {/* Gói thời gian */}
          <div className="bg-gray-50 rounded-xl p-3 shadow-sm">
            <h2 className="font-semibold text-gray-700 text-sm mb-2">
              Chọn gói thời gian
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {plans.map((plan) => (
                <button
                  key={plan.label}
                  onClick={() => setSelectedPlan(plan)}
                  className={`border rounded-lg px-2 py-1.5 text-[12px] text-center transition-all ${
                    selectedPlan.label === plan.label
                      ? "bg-indigo-600 text-white border-transparent shadow-sm"
                      : "hover:bg-gray-100 text-gray-700 border-gray-300"
                  }`}
                >
                  <p className="font-medium">{plan.label}</p>
                  <p className="text-[11px] mt-0.5">
                    {plan.price.toLocaleString()}₫
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Tổng cộng */}
          <div className="bg-indigo-50 rounded-lg p-3 shadow-inner flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-indigo-700 font-semibold">
              <Clock size={16} />
              <span>{selectedPlan.label}</span>
            </div>
            <div className="text-right">
              <p className="text-gray-600 text-xs">Tổng cộng</p>
              <p className="text-xl font-bold text-indigo-700">
                {selectedPlan.price.toLocaleString()}₫
              </p>
            </div>
          </div>

          {/* Nút thanh toán */}
          <button
            onClick={handlePayment}
            disabled={user ? loading : true}
            className={`w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-xl shadow-md transition-all duration-300 text-sm ${
              !user ? "opacity-70 cursor-not-allowed" : ""
            } ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            <CreditCard size={16} />
            {loading ? "Đang xử lý..." : "Thanh toán ngay"}
          </button>

          {/* Ghi chú */}
          <div className="flex justify-center items-center gap-2 text-center text-gray-500 text-xs mt-1">
            <CheckCircle2
              className="inline-block mr-1 text-green-500"
              size={12}
            />
            Giao dịch của bạn được bảo mật tuyệt đối.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
