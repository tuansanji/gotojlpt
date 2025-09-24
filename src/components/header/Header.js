"use client"; // This is a client component
// Component menu desktop dùng state để điều khiển submenu2

// components/Header.js

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const menuItems = [
  {
    title: "Riki",
    link: "/riki",
    submenu: [
      { title: "N1", link: "/riki/n1" },
      { title: "N2", link: "/riki/n2" },
      { title: "N3", link: "/riki/n3" },
      { title: "N4", link: "/riki/n4" },
      { title: "N5", link: "/riki/n5" },
    ],
  },
  {
    title: "Dũng Mori",
    link: "/dungmori",
    submenu: [
      { title: "N1", link: "/dungmori/n1" },
      { title: "N2", link: "/dungmori/n2" },
      { title: "N3", link: "/dungmori/n3" },
      { title: "N4", link: "/dungmori/n4" },
      { title: "N5", link: "/dungmori/n5" },
    ],
  },
  {
    title: "Thi Thử",
    submenu: [
      {
        title: "Dũng Mori",
        link: "/thithu/dungmori",
        submenu: [
          {
            title: "N1",
            link: "/thithu/dungmori/n1",
          },
          {
            title: "N2",
            link: "/thithu/dungmori/n2",
          },
          {
            title: "N3",
            link: "/thithu/dungmori/n3",
          },
          {
            title: "N4",
            link: "/thithu/dungmori/n4",
          },
          {
            title: "N5",
            link: "/thithu/dungmori/n5",
          },
        ],
      },
      {
        title: "Riki",
        link: "/thithu/riki",
        submenu: [
          {
            title: "N1",
            link: "/thithu/riki/n1",
          },
          {
            title: "N2",
            link: "/thithu/riki/n2",
          },
          {
            title: "N3",
            link: "/thithu/riki/n3",
          },
          {
            title: "N4",
            link: "/thithu/riki/n4",
          },
          {
            title: "N5",
            link: "/thithu/riki/n5",
          },
        ],
      },
    ],
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
      className={`  rounded-xl py-2 z-10 min-w-[200px]   ${
        isSubmenu
          ? "absolute left-full top-0 ml-4"
          : "flex space-x-4 lg:space-x-6 gap-x-2"
      }`}
    >
      {items.map((item, index) => (
        <li
          key={index}
          className={`relative ${isSubmenu ? "py-2 px-4" : "py-2 md:py-0"}`}
          onMouseEnter={() => !isSubmenu && setHoveredIndex(index)}
          onMouseLeave={() => !isSubmenu && setHoveredIndex(null)}
        >
          <div className="flex items-center">
            {item.link ? (
              item.external ? (
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold transition-colors hover:text-cyan-500"
                >
                  {item.title}
                </Link>
              ) : (
                <Link
                  href={item.link}
                  className="font-bold transition-colors hover:text-cyan-500"
                >
                  {item.title}
                </Link>
              )
            ) : (
              <span className="font-bold transition-colors cursor-pointer hover:text-cyan-500">
                {item.title}
              </span>
            )}
          </div>

          {/* Submenu1 */}
          {item.submenu && !isSubmenu && hoveredIndex === index && (
            <div
              className={`absolute left-0 top-full bg-white shadow-lg rounded-xl pt-5 py-2 z-10 min-w-[200px] animate-slide-up `}
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
                      {subItem.link ? (
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
                    {/* Submenu2: Luôn render, chỉ ẩn/hiện bằng CSS và state */}
                    {subItem.submenu && hoveredSubIndex === subIndex && (
                      <div
                        className={`pl-2.5 left-full absolute min-w-[200px] top-0`}
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
          {/* Submenu cấp lồng (isSubmenu=true) vẫn hiện như cũ */}
          {item.submenu && isSubmenu && (
            <div
              className={`absolute left-full top-0 bg-white shadow-lg rounded-xl py-2 z-10 min-w-[200px]`}
            >
              <ul>
                {item.submenu.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <Link
                      href={subItem.link}
                      className="font-bold transition-colors hover:text-cyan-500"
                    >
                      {subItem.title}
                    </Link>
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

const RenderMobileMenu = ({ items }) => {
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
              {item.link ? (
                item.external ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-gray-800 transition-colors hover:text-cyan-500"
                  >
                    {item.title}
                  </a>
                ) : (
                  <Link
                    href={item.link}
                    className="font-bold text-gray-800 transition-colors hover:text-cyan-500"
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

  return (
    <header className="relative flex items-center justify-center p-2 bg-white shadow-md  text-[#343A40]">
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
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <RenderDesktopMenu items={menuItems} />
        </nav>
        <Link
          href="/login"
          className="px-4 py-2 font-bold text-white transition-colors rounded-full bg-cyan-500 hover:bg-cyan-600"
        >
          Đăng Nhập
        </Link>
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
          <RenderMobileMenu items={menuItems} />
        </div>
      </div>
    </header>
  );
};
// components/Header.js

export default Header;
