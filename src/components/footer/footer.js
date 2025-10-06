import React from "react";
import Link from "next/link";
import Image from "next/image";

// Icon Facebook (Ví dụ)
const FacebookIcon = ({ href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook Link"
    // 🌟 THAY ĐỔI: Màu icon và hover trên nền sáng
    className="transition-colors hover:text-gray-500 text-blue-600"
  >
    <svg
      className="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 2.163c-5.46 0-9.9 4.44-9.9 9.9 0 4.88 3.557 8.927 8.216 9.715V14.64h-2.94v-2.977h2.94v-2.18c0-2.902 1.77-4.484 4.364-4.484 1.258 0 2.342.09 2.658.128v3.067h-1.815c-1.428 0-1.7.678-1.7 1.674v2.197h3.402l-.587 2.977h-2.815v7.237c4.659-.788 8.216-4.835 8.216-9.715 0-5.46-4.44-9.9-9.9-9.9z"></path>
    </svg>
  </a>
);
const LineIcon = ({ href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LINE Link"
    className="transition-colors hover:text-gray-500 text-green-500" // LINE thường có màu xanh lá
  >
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9 16c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1h6c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1H9zm2-2.5h2V14h-2v-1.5z"></path>
    </svg>
  </a>
);

// 🌟 THÊM ICON TWITTER (X)
const TwitterIcon = ({ href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Twitter (X) Link"
    className="transition-colors hover:text-gray-500 text-gray-900" // Màu đen của Twitter/X
  >
    <svg
      className="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M18.9 4.37h2.15l-6.19 7.15L23 20.62h-4.32l-5.32-6.28-4.2 6.28H1l6.73-9.9L1.44 3.38h4.51l4.8 6.57L17.73 3h4.94zM7.4 19.33h2.64l8.52-11.75H16.4L7.4 19.33z"></path>
    </svg>
  </a>
);
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // 🌟 THAY ĐỔI: Màu nền sáng (bg-gray-50) và đường viền (border-gray-200)
    <footer className="px-4 md:py-16 py-6 md:mt-16 mt-2 bg-gray-50 border-t border-gray-200 md:px-10">
      <div className="container mx-auto max-w-7xl text-gray-800">
        {/* Lưới chính: 4 cột trên desktop */}
        <div className="grid grid-cols-2 md:gap-y-12 gap-y-7 gap-x-8 md:grid-cols-4 lg:grid-cols-4">
          {/* Cột 1: Thông tin liên hệ (Đặt ở cột đầu tiên) */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <h3 className="mb-3 text-base font-semibold uppercase text-gray-900 tracking-wider">
              Liên hệ & Thông tin
            </h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li className="flex flex-col">
                {/* 🌟 THAY ĐỔI: Màu chữ đậm hơn cho tiêu đề nhỏ */}
                <span className="font-semibold text-gray-800 mb-1">Email:</span>
                <a
                  href="mailto:support@gotojlpt.com"
                  // 🌟 THAY ĐỔI: Màu hover trên nền sáng
                  className="transition-colors hover:text-blue-600"
                >
                  support@gotojlpt.com
                </a>
              </li>
              <li className="flex flex-col">
                <span className="font-semibold text-gray-800 mb-1">
                  Hotline:
                </span>
                <a
                  href="tel:0987654321"
                  className="transition-colors hover:text-blue-600"
                >
                  0987.654.321
                </a>
              </li>
              <li className="flex flex-col">
                <span className="font-semibold text-gray-800 mb-1">
                  Địa chỉ:
                </span>
                <span>Hiroshima</span>
              </li>
            </ul>
          </div>

          {/* Cột 2: Khóa học Dũng Mori */}
          <div className="space-y-4">
            <h3 className="mb-3 text-base font-semibold uppercase text-gray-900 tracking-wider">
              Khóa học Dũng Mori
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li>
                <Link
                  href="/courses/dungmori/N5"
                  className="transition-colors hover:text-blue-600 text-sm"
                >
                  N5 Cơ bản
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/dungmori/N4"
                  className="transition-colors hover:text-blue-600 text-sm"
                >
                  N4 Sơ cấp
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/dungmori/N3"
                  className="transition-colors hover:text-blue-600 text-sm"
                >
                  N3 Trung cấp
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/dungmori/N2"
                  className="transition-colors hover:text-blue-600 text-sm"
                >
                  N2 Nâng cao
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/dungmori/N1"
                  className="transition-colors hover:text-blue-600 text-sm"
                >
                  N1 Chuyên sâu
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Khóa học Riki */}
          <div className="space-y-4">
            <h3 className="mb-3 text-base font-semibold uppercase text-gray-900 tracking-wider">
              Khóa học Riki Nihongo
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li>
                <Link
                  href="/courses/riki/N5"
                  className="transition-colors hover:text-blue-600 text-sm"
                >
                  N5 Cơ bản
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/riki/N4"
                  className="transition-colors hover:text-blue-600 text-sm"
                >
                  N4 Sơ cấp
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/riki/N3"
                  className="transition-colors hover:text-blue-600 text-sm"
                >
                  N3 Trung cấp
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/riki/N2"
                  className="transition-colors hover:text-blue-600 text-sm"
                >
                  N2 Nâng cao
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/riki/N1"
                  className="transition-colors hover:text-blue-600 text-sm"
                >
                  N1 Chuyên sâu
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 4: Giới thiệu cốt lõi (Đặt ở cột cuối cùng) */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2 md:mb-4 mb-1">
              <Image
                src="/logo.png" // 🌟 THAY ĐỔI: Giả định dùng logo màu tối trên nền sáng
                alt="GotoJLPT Logo"
                width={150}
                height={50}
                className="w-24 md:w-32 h-auto"
              />
            </div>
            <p className="text-sm leading-relaxed text-gray-600">
              Chinh phục JLPT từ N5 đến N1. Nền tảng tổng hợp và phân phối các
              khóa học tiếng Nhật Dũng Mori và Riki chất lượng cao.
            </p>

            {/* Mạng xã hội */}
            <div className="flex md:mt-4 mt-2 space-x-4 hover:text-gray-500">
              <LineIcon href="https://line.me/R/ti/p/@yourlineid" />{" "}
              {/* Cần thay 'yourlineid' bằng ID chính xác */}
              <TwitterIcon href="https://twitter.com/yourtwitterhandle" />{" "}
              {/* Cần thay 'yourtwitterhandle' bằng link chính xác */}
              <FacebookIcon href="https://www.facebook.com/profile.php?id=100090524688743" />{" "}
              {/* Giữ lại Facebook */}
            </div>
          </div>
        </div>

        {/* Bản quyền */}
        <div className="pt-8 md:mt-12 mt-3 text-xs text-center text-gray-600 border-t border-gray-300">
          <p>&copy; {currentYear} GotoJLPT. Tất cả bản quyền được bảo lưu.</p>
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
