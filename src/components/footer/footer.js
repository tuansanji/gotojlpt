// components/Footer.js
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-4 py-12 mt-12 bg-gray-50 border-t border-gray-200 md:px-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5 lg:grid-cols-4">
          {/* Cột 1: Logo và Giới thiệu cốt lõi */}
          <div className="col-span-2 lg:col-span-1 flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo.png" // Đảm bảo bạn có file logo.png
                alt="GotoJLPT Logo"
                width={150} // Tăng kích thước logo
                height={50}
                className="w-28 h-auto"
              />
            </div>
            <p className="text-sm leading-relaxed text-gray-600">
              Chinh phục **JLPT** từ N5 đến N1. Nền tảng tổng hợp và phân phối
              các khóa học tiếng Nhật **Dũng Mori** và **Riki** chất lượng cao.
            </p>
            {/* Mạng xã hội */}
            <div className="flex mt-4 space-x-5 text-gray-500">
              {/* Icon Facebook 1 (Không thay đổi) */}

              {/* Icon Facebook 2 (Đã thay thế icon Youtube) */}
              <a
                href="https://www.facebook.com/profile.php?id=100090524688743"
                target="_blank"
                aria-label="Facebook Page 2"
                className="transition-colors hover:text-blue-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {/* Path của icon Facebook thứ hai, nên đổi href */}
                  <path d="M12 2.163c-5.46 0-9.9 4.44-9.9 9.9 0 4.88 3.557 8.927 8.216 9.715V14.64h-2.94v-2.977h2.94v-2.18c0-2.902 1.77-4.484 4.364-4.484 1.258 0 2.342.09 2.658.128v3.067h-1.815c-1.428 0-1.7.678-1.7 1.674v2.197h3.402l-.587 2.977h-2.815v7.237c4.659-.788 8.216-4.835 8.216-9.715 0-5.46-4.44-9.9-9.9-9.9z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Cột 2: Khóa học theo Cấp độ (Thay thế cho Sản phẩm) */}
          <div>
            <h3 className="mb-5 text-base font-semibold uppercase text-gray-800 tracking-wider">
              Khóa học Dũng Mori
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li>
                <Link
                  href="/courses/dung-mori/n5"
                  className="transition-colors hover:text-blue-500 text-sm"
                >
                  N5 Cơ bản
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/dung-mori/n4"
                  className="transition-colors hover:text-blue-500 text-sm"
                >
                  N4 Sơ cấp
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/dung-mori/n3"
                  className="transition-colors hover:text-blue-500 text-sm"
                >
                  N3 Trung cấp
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/dung-mori/n2"
                  className="transition-colors hover:text-blue-500 text-sm"
                >
                  N2 Nâng cao
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/dung-mori/n1"
                  className="transition-colors hover:text-blue-500 text-sm"
                >
                  N1 Chuyên sâu
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Về chúng tôi (Thay thế Hỗ trợ) */}
          <div>
            <h3 className="mb-5 text-base font-semibold uppercase text-gray-800 tracking-wider">
              Khóa học Riki
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li>
                <Link
                  href="/courses/riki/n5"
                  className="transition-colors hover:text-blue-500 text-sm"
                >
                  N5 Cơ bản
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/riki/n4"
                  className="transition-colors hover:text-blue-500 text-sm"
                >
                  N4 Sơ cấp
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/riki/n3"
                  className="transition-colors hover:text-blue-500 text-sm"
                >
                  N3 Trung cấp
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/riki/n2"
                  className="transition-colors hover:text-blue-500 text-sm"
                >
                  N2 Nâng cao
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/riki/n1"
                  className="transition-colors hover:text-blue-500 text-sm"
                >
                  N1 Chuyên sâu
                </Link>
              </li>
            </ul>
          </div>
          {/* Cột 4: Liên hệ */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="mb-5 text-base font-semibold uppercase text-gray-800 tracking-wider">
              Liên hệ & Hỗ trợ
            </h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li>
                <span className="font-medium text-gray-800">Email:</span>{" "}
                <a
                  href="mailto:support@gotojlpt.com"
                  className="transition-colors hover:text-blue-500"
                >
                  support@gotojlpt.com
                </a>
              </li>
              <li>
                <span className="font-medium text-gray-800">Hotline:</span>{" "}
                <a
                  href="tel:0987654321"
                  className="transition-colors hover:text-blue-500"
                >
                  0987.654.321
                </a>
              </li>
              <li>
                <span className="font-medium text-gray-800">Địa chỉ:</span>{" "}
                Hiroshima
              </li>
            </ul>
          </div>
        </div>

        {/* Bản quyền */}
        <div className="pt-8 mt-10 text-xs text-center text-gray-500 border-t border-gray-200">
          <p>
            &copy; {currentYear} **GotoJLPT**. Tất cả bản quyền được bảo lưu.
          </p>
          <p className="mt-1">
            Sản phẩm được phát triển nhằm mục đích tổng hợp tài liệu tự học
            JLPT.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
