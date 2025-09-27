// components/Submenu.js

import Link from "next/link";

const Submenu = ({ items, isSubmenu = false }) => {
  return (
    <ul
      className={`slide-up bg-white shadow-lg rounded-xl py-2 z-10 min-w-[200px] ${
        isSubmenu ? "slide-up absolute left-full top-0 ml-4" : ""
      }`}
    >
      {items.map((item, index) => (
        <li key={index} className="relative group">
          <div className="flex items-center px-4 py-2 transition-colors hover:bg-gray-100">
            {item.link ? (
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
              <span className="font-bold transition-colors cursor-pointer hover:text-cyan-500">
                {item.title}
              </span>
            )}
            {item.submenu && (
              <span className="ml-1 text-gray-500 transition-transform duration-200 group-hover:rotate-90">
                {">"}
              </span>
            )}
          </div>
          {item.submenu && (
            <div className="hidden group-hover:block">
              <Submenu items={item.submenu} isSubmenu={true} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Submenu;
