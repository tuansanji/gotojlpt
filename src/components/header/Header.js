"use client"; // This is a client component
import clsx from "clsx";

// components/Header.js

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useAuthStore from "@/store/authStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuItems = [
  {
    title: "Riki",
    link: "/riki",
    submenu: [
      { title: "N1", link: "/courses/riki/N1" },
      { title: "N2", link: "/courses/riki/N2" },
      { title: "N3", link: "/courses/riki/N3" },
      { title: "N4", link: "/courses/riki/N4" },
      { title: "N5", link: "/courses/riki/N5" },
    ],
  },
  {
    title: "Dũng Mori",
    link: "/dungmori",
    submenu: [
      { title: "N1", link: "/courses/dungmori/N1" },
      { title: "N2", link: "/courses/dungmori/N2" },
      { title: "N3", link: "/courses/dungmori/N3" },
      { title: "N4", link: "/courses/dungmori/N4" },
      { title: "N5", link: "/courses/dungmori/N5" },
    ],
  },
  {
    title: "Thi Thử JLPT",
    link: "/exams",

    // Link ở đây sẽ bị bỏ qua vì có submenu, thẻ cha sẽ là <span>
    // submenu: [
    //   {
    //     title: "Dũng Mori",
    //     link: "/exams/dungmori",
    //     submenu: [
    //       {
    //         title: "N1",
    //         link: "/exams/dungmori/N1",
    //       },
    //       {
    //         title: "N2",
    //         link: "/exams/dungmori/N2",
    //       },
    //       {
    //         title: "N3",
    //         link: "/exams/dungmori/N3",
    //       },
    //       {
    //         title: "N4",
    //         link: "/exams/dungmori/N4",
    //       },
    //       {
    //         title: "N5",
    //         link: "/exams/dungmori/N5",
    //       },
    //     ],
    //   },
    //   {
    //     title: "Riki",
    //     link: "/exams/riki",
    //     submenu: [
    //       {
    //         title: "N1",
    //         link: "/exams/riki/N1",
    //       },
    //       {
    //         title: "N2",
    //         link: "/exams/riki/N2",
    //       },
    //       {
    //         title: "N3",
    //         link: "/exams/riki/N3",
    //       },
    //       {
    //         title: "N4",
    //         link: "/exams/riki/N4",
    //       },
    //       {
    //         title: "N5",
    //         link: "/exams/riki/N5",
    //       },
    //     ],
    //   },
    // ],
  },
  { title: "Tài Liệu", link: "/tailieu" },

  { title: "Khóa Học Khác", link: "/khoahockhac" },
  {
    title: "Liên Hệ",
    link: "https://www.facebook.com/navtechpro",
    external: true,
  },
];

const RenderDesktopMenu = ({ items, isSubmenu = false }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredSubIndex, setHoveredSubIndex] = useState(null);
  return (
    <ul
      // ĐÃ SỬA LỖI HYDRATION: Loại bỏ khoảng trắng thừa ở đầu chuỗi
      className={clsx(
        "rounded-xl py-2 z-10 min-w-[200px]",
        isSubmenu
          ? "absolute left-full top-0 ml-4"
          : "flex space-x-4 lg:space-x-6 gap-x-2"
      )}
    >
      {items.map((item, index) => (
        <li
          key={index}
          className={`relative ${isSubmenu ? "py-2 px-4" : "py-2 md:py-0"}`}
          onMouseEnter={() => !isSubmenu && setHoveredIndex(index)}
          onMouseLeave={() => !isSubmenu && setHoveredIndex(null)}
        >
          <div className="flex items-center">
            {/* LOGIC MỚI: Nếu có submenu, render <span>, nếu không, kiểm tra Link */}
            {item.submenu ? (
              <span className="font-bold transition-colors cursor-pointer hover:text-cyan-500">
                {item.title}
              </span>
            ) : item.link ? (
              item.external ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold transition-colors hover:text-cyan-500"
                >
                  {item.title}
                </a>
              ) : (
                <Link
                  href={item.link}
                  className="font-bold transition-colors hover:text-cyan-500"
                >
                  {item.title}
                </Link>
              )
            ) : (
              // Trường hợp không link, không submenu (chỉ là văn bản)
              <span className="font-bold transition-colors cursor-pointer hover:text-cyan-500">
                {item.title}
              </span>
            )}
          </div>

          {/* Submenu1 (Cấp 2) */}
          {item.submenu && !isSubmenu && hoveredIndex === index && (
            <div
              className={`slide-up absolute left-0 top-full bg-white shadow-lg rounded-xl pt-5 py-2 z-10 min-w-[200px] animate-slide-up `}
            >
              <ul>
                {item.submenu.map((subItem, subIndex) => (
                  <li
                    key={subIndex}
                    className="relative"
                    onMouseEnter={() => setHoveredSubIndex(subIndex)}
                    onMouseLeave={() => setHoveredSubIndex(null)}
                  >
                    <div className="flex items-center px-5 py-2 transition-colors hover:bg-gray-100">
                      {/* LOGIC TƯƠNG TỰ CHO CẤP 2: Nếu có submenu con (Cấp 3), render <span> */}
                      {subItem.submenu ? (
                        <span className="font-bold transition-colors cursor-pointer hover:text-cyan-500">
                          {subItem.title}
                        </span>
                      ) : subItem.link ? (
                        subItem.external ? (
                          <a
                            href={subItem.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold transition-colors hover:text-cyan-500"
                          >
                            {subItem.title}
                          </a>
                        ) : (
                          <Link
                            href={subItem.link}
                            className="font-bold transition-colors hover:text-cyan-500"
                          >
                            {subItem.title}
                          </Link>
                        )
                      ) : (
                        <span className="font-bold transition-colors cursor-pointer hover:text-cyan-500">
                          {subItem.title}
                        </span>
                      )}
                      {subItem.submenu && (
                        <span className="absolute right-0 top-0 inline-flex h-full min-w-[33px] items-center justify-center text-[20px] text-gray-500 transition-transform duration-200 group-hover:rotate-90">
                          {">"}
                        </span>
                      )}
                    </div>
                    {/* Submenu2 (Cấp 3): Không cần kiểm tra logic <span>/Link vì đây là cấp cuối trong menuItems hiện tại */}
                    {subItem.submenu && hoveredSubIndex === subIndex && (
                      <div
                        className={`slide-up pl-2.5 left-full absolute min-w-[200px] top-0`}
                      >
                        <ul className="z-10 py-2 bg-white shadow-lg rounded-xl">
                          {subItem.submenu.map((subItem2, subIndex2) => (
                            <li
                              key={subIndex2}
                              className="flex items-center px-4 py-2 transition-colors hover:bg-gray-100"
                            >
                              <Link
                                href={subItem2.link}
                                className="font-bold transition-colors hover:text-cyan-500"
                              >
                                {subItem2.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Submenu cấp lồng (isSubmenu=true) không áp dụng logic này nếu chúng là cấp cuối */}
          {item.submenu && isSubmenu && (
            <div
              className={`absolute left-full top-0 bg-white shadow-lg rounded-xl py-2 z-10 min-w-[200px]`}
            >
              <ul>
                {item.submenu.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    {subItem.link ? (
                      <Link
                        href={subItem.link}
                        className="font-bold transition-colors hover:text-cyan-500"
                      >
                        {subItem.title}
                      </Link>
                    ) : (
                      <span className="font-bold transition-colors cursor-pointer hover:text-cyan-500">
                        {subItem.title}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

const RenderMobileMenu = ({ items, setIsMobileMenuOpen }) => {
  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleSubmenu = (fullIndex) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [fullIndex]: !prev[fullIndex],
    }));
  };

  const renderRecursiveMenu = (menuItems, parentPath = "") => (
    <ul className="w-full">
      {menuItems.map((item, index) => {
        // Tạo một đường dẫn duy nhất cho mỗi mục menu
        const currentPath = `${parentPath}-${index}`;
        const isSubmenuOpen = !!openSubmenus[currentPath];

        return (
          <li key={currentPath} className="border-b border-gray-200">
            <div className="flex items-center justify-between px-4 py-3">
              {/* LOGIC MỚI: Nếu có submenu, render <span>, nếu không, kiểm tra Link */}
              {item.submenu ? (
                <span className="font-bold text-gray-800">{item.title}</span>
              ) : item.link ? (
                item.external ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-gray-800 transition-colors hover:text-cyan-500"
                    // Thêm logic đóng menu mobile khi click vào link
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.title}
                  </a>
                ) : (
                  <Link
                    href={item.link}
                    className="font-bold text-gray-800 transition-colors hover:text-cyan-500"
                    // Thêm logic đóng menu mobile khi click vào link
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                )
              ) : (
                <span className="font-bold text-gray-800">{item.title}</span>
              )}
              {item.submenu && (
                <button
                  onClick={() => toggleSubmenu(currentPath)}
                  className="text-xl"
                >
                  {isSubmenuOpen ? "-" : "+"}
                </button>
              )}
            </div>
            {item.submenu && isSubmenuOpen && (
              <div className="py-2 pl-4">
                {renderRecursiveMenu(item.submenu, currentPath)}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  return renderRecursiveMenu(items);
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useAuthStore((state) => state.user);

  return (
    <header
      // ĐÃ SỬA LỖI HYDRATION: Loại bỏ khoảng trắng thừa (ví dụ: `  text-[#343A40]`)
      className="sticky top-0 z-50 flex items-center justify-center px-2 py-0 bg-white shadow-md text-[#343A40]"
    >
      <div className="container flex items-center justify-between mx-0 md:mx-15">
        {/* btn mobile menu */}
        <div className="flex items-center space-x-4 md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-2xl pl-1.5"
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            )}
          </button>
        </div>
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" aria-label="Go To JLPT">
            <Image
              src="/logo.png"
              alt="Go To Jlpt Logo"
              width={100}
              height={30}
              priority
              style={{ width: "auto" }}
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <RenderDesktopMenu items={menuItems} />
        </nav>
        {user ? (
          <Link
            href={`/profile/${user.id}`}
            className="flex items-center group transition-opacity duration-200 hover:opacity-85" // Thêm hiệu ứng hover cho cả khu vực
          >
            {/* ĐÃ ÁP DỤNG CSS CHO TÊN */}
            <div className="flex justify-center items-center gap-2">
              {" "}
              {/* Giảm gap xuống 2 */}
              <span
                className="
                  hidden sm:block 
                  text-base md:text-lg 
                  font-semibold 
                  text-gray-800 
                  transition-colors 
                  group-hover:text-cyan-600 
                  truncate max-w-[150px]
                "
              >
                {user.name}
              </span>
              <Avatar className="w-10 h-10 md:w-12 md:h-12">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback> {user.name}</AvatarFallback>
              </Avatar>
            </div>
          </Link>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 font-bold text-white transition-colors rounded-full bg-cyan-500 hover:bg-cyan-600"
          >
            Đăng Nhập
          </Link>
        )}
        {/* Mobile Menu Button */}
      </div>

      {/* Mobile Menu Content */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-white z-20 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center p-4">
          <div className="flex items-center justify-between w-full mb-6">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              <Image
                src="/logo.png"
                alt="Go To JLPT Logo"
                width={100}
                height={30}
              />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2 font-bold text-white transition-colors rounded-full bg-cyan-500 hover:bg-cyan-600"
            >
              Đóng
            </button>
          </div>
          {/* TRUYỀN setIsMobileMenuOpen CHO RenderMobileMenu */}
          <RenderMobileMenu
            items={menuItems}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        </div>
      </div>
    </header>
  );
};
// components/Header.js

export default Header;
