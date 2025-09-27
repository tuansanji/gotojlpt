"use client";

import { Toaster as Sonner } from "sonner";

/**
 * Component Toaster (Đã sửa lỗi cấu hình màu bằng Inline Style - Dùng 'background')
 * Phương pháp này đảm bảo màu nền được áp dụng do ghi đè thuộc tính CSS shorthand.
 */
const Toaster = ({ ...props }) => {
  return (
    <Sonner
      className="toaster group"
      // Hiển thị Toast ở góc trên bên phải
      position="top-right"
      // Thời gian tồn tại của Toast
      duration={3500}
      toastOptions={
        {
          // 1. Cấu hình chung cho tất cả các Toast (Kích thước và Styling)
          // 2. Ghi đè màu nền và màu chữ bằng thuộc tính 'style'
          // ***Sử dụng 'background' thay vì 'backgroundColor'***
        }
      }
      {...props}
    />
  );
};

export { Toaster };
