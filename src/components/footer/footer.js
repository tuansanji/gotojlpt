// components/Footer.js
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="px-4 py-10 mt-10 bg-white border-t border-gray-100 md:px-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo và giới thiệu */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="gotojlpt Logo"
                width={120}
                height={40}
                className="w-20 h-auto"
              />
            </div>

            <p className="text-sm leading-relaxed text-gray-600">
              Đây là một đoạn giới thiệu ngắn về công ty, sứ mệnh hoặc những giá
              trị cốt lõi.
            </p>
          </div>

          {/* Cột 1: Các liên kết */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-800">Sản phẩm</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/san-pham-1">
                  <p className="transition-colors hover:text-blue-500">
                    Khóa học JLPT
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/san-pham-2">
                  <p className="transition-colors hover:text-blue-500">
                    Khóa học Giao tiếp
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/san-pham-3">
                  <p className="transition-colors hover:text-blue-500">
                    Tài liệu
                  </p>
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 2: Hỗ trợ */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-800">Hỗ trợ</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/ho-tro-1">
                  <p className="transition-colors hover:text-blue-500">
                    Câu hỏi thường gặp
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/ho-tro-2">
                  <p className="transition-colors hover:text-blue-500">
                    Trung tâm hỗ trợ
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/ho-tro-3">
                  <p className="transition-colors hover:text-blue-500">
                    Chính sách bảo mật
                  </p>
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Liên hệ và Mạng xã hội */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-800">Liên hệ</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                Email:{" "}
                <a
                  href="mailto:contact@example.com"
                  className="transition-colors hover:text-blue-500"
                >
                  contact@example.com
                </a>
              </li>
              <li>
                Điện thoại:{" "}
                <a
                  href="tel:123456789"
                  className="transition-colors hover:text-blue-500"
                >
                  123-456-789
                </a>
              </li>
              <li>Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM</li>
            </ul>
            <div className="flex mt-4 space-x-4 text-gray-600">
              <a
                href="#"
                aria-label="Facebook"
                className="transition-colors hover:text-blue-500"
              >
                {/* Icon Facebook */}
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c-5.46 0-9.9 4.44-9.9 9.9 0 4.88 3.557 8.927 8.216 9.715V14.64h-2.94v-2.977h2.94v-2.18c0-2.902 1.77-4.484 4.364-4.484 1.258 0 2.342.09 2.658.128v3.067h-1.815c-1.428 0-1.7.678-1.7 1.674v2.197h3.402l-.587 2.977h-2.815v7.237c4.659-.788 8.216-4.835 8.216-9.715 0-5.46-4.44-9.9-9.9-9.9z"></path>
                </svg>
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="transition-colors hover:text-blue-500"
              >
                {/* Icon Twitter */}
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M22.25 4.33a8.914 8.914 0 01-2.5.69c.98-.59 1.74-1.52 2.1-2.61a10.038 10.038 0 01-2.88 1.1c-.91-.97-2.19-1.58-3.62-1.58-2.73 0-4.94 2.21-4.94 4.94 0 .39.05.77.15 1.13-4.1.21-7.75-2.17-10.19-5.45C.6 5.61.42 6.55.42 7.57c0 1.71.87 3.22 2.19 4.1-.81-.03-1.57-.25-2.24-.62v.06c0 2.39 1.7 4.38 3.95 4.85-.41.1-.84.15-1.28.15-.31 0-.6-.03-.89-.09.62 1.96 2.44 3.39 4.58 3.43-1.69 1.32-3.81 2.1-6.13 2.1-.4 0-.79-.02-1.17-.07C2.9 21.05 5.34 22 8.01 22c9.61 0 14.86-7.96 14.86-14.86 0-.23-.01-.45-.02-.68.99-.71 1.84-1.6 2.52-2.62z"></path>
                </svg>
              </a>
              {/* Thêm các icon mạng xã hội khác */}
            </div>
          </div>
        </div>

        {/* Bản quyền */}
        <div className="pt-6 mt-8 text-sm text-center text-gray-500 border-t border-gray-200">
          <p>
            &copy; {new Date().getFullYear()} Tên Công ty. Tất cả bản quyền được
            bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
