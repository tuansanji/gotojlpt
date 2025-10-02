// components/CourseCard.js
import React from "react";
import Image from "next/image";

const CourseCard = ({ course }) => {
  return (
    <div className="relative p-6 overflow-hidden bg-white shadow-md rounded-2xl">
      <div className="flex flex-col items-center space-y-4 md:flex-row md:items-start md:space-y-0 md:space-x-8">
        {/* Hình ảnh chính và icons trang trí */}
        <div className="relative flex-shrink-0 w-full md:w-1/2">
          <Image
            src={course.imageUrl}
            alt={course.title}
            width={300}
            height={200}
            layout="responsive"
            className="rounded-xl"
          />
          {/* Icons trang trí */}
          <div className="absolute transform -translate-y-1/2 top-4 left-4">
            <svg
              className="w-12 h-12 text-blue-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 15v-4H8.97l.03-.02c.07-.052.12-.102.16-.142.2-.24.32-.57.32-.93 0-.7-.47-1.34-1.2-1.57V9h2.24c.4 0 .76.16 1.04.44l.02.02.02-.02C13.59 9.68 14 10.04 14 10.5c0 .7-.47 1.34-1.2 1.57V15h2.24c.4 0 .76.16 1.04.44l.02.02.02-.02c.28.28.44.64.44 1.04 0 .7-.47 1.34-1.2 1.57V17h-2.24c-.4 0-.76-.16-1.04-.44l-.02-.02-.02.02c-.28-.28-.44-.64-.44-1.04zM12 4a8 8 0 100 16 8 8 0 000-16z"></path>
            </svg>
          </div>
          <div className="absolute transform -translate-y-1/2 top-10 left-16">
            <svg
              className="w-12 h-12 text-pink-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 15v-4H8.97l.03-.02c.07-.052.12-.102.16-.142.2-.24.32-.57.32-.93 0-.7-.47-1.34-1.2-1.57V9h2.24c.4 0 .76.16 1.04.44l.02.02.02-.02C13.59 9.68 14 10.04 14 10.5c0 .7-.47 1.34-1.2 1.57V15h2.24c.4 0 .76.16 1.04.44l.02.02.02-.02c.28.28.44.64.44 1.04 0 .7-.47 1.34-1.2 1.57V17h-2.24c-.4 0-.76-.16-1.04-.44l-.02-.02-.02.02c-.28-.28-.44-.64-.44-1.04zM12 4a8 8 0 100 16 8 8 0 000-16z"></path>
            </svg>
          </div>
        </div>

        {/* Nội dung text */}
        <div className="flex-1 space-y-4 text-center md:text-left">
          <h3 className="text-2xl font-bold text-gray-800 md:text-3xl">
            {course.title}
          </h3>
          <div className="flex flex-col items-center text-sm font-medium text-gray-600 md:flex-row md:space-x-4 md:text-base">
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"></path>
                <path d="M12 2c-4.97 0-9 4.03-9 9 0 3.19 1.63 6.02 4.09 7.78C7.54 19.34 9.65 20.73 12 21.26c2.35-.53 4.46-1.92 6.91-3.48C19.37 17.02 21 14.19 21 11c0-4.97-4.03-9-9-9zm-1 16.5V17H5.29c-.3-.87-.49-1.84-.49-2.85 0-3.6 2.9-6.5 6.5-6.5S18 10.55 18 14c0 1.01-.19 1.98-.49 2.85h-5.22v1.5z"></path>
              </svg>
              <span>{course.level}</span>
            </div>
            <div className="flex items-center mt-2 space-x-2 md:mt-0">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
                <path d="M12 5v7l4.25 2.54.75-1.23L12 11.2V5z"></path>
              </svg>
              <span>{course.hours}</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-gray-700 md:text-base">
            {course.description}
          </p>

          {/* Các nút cấp độ */}
          <div className="flex justify-center mt-6 space-x-4 md:justify-start">
            {course.level.map((level, index) => (
              <span
                key={index}
                className="px-4 py-2 font-semibold text-gray-700 transition-colors duration-200 border border-gray-400 rounded-full cursor-pointer hover:bg-gray-100"
              >
                {level}
              </span>
            ))}
          </div>

          <div className="mt-4 text-right">
            <a
              href={course.link}
              className="flex items-center justify-end space-x-2 text-lg font-semibold text-cyan-500 hover:underline"
            >
              <span>Xem chi tiết</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7-7 7M5 12h14"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      {/* Icon hoa đào */}
      <div className="absolute top-2 right-2 md:top-6 md:right-6">
        <Image
          src="/icons/sakura.png"
          alt="Sakura icon"
          width={40}
          height={40}
        />
      </div>
    </div>
  );
};

export default CourseCard;
