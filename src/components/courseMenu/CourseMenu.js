// components/CourseMenu.js"

"use client";
import React, { useState } from "react";
import Image from "next/image";

import useCourseStore from "@/store/courseStore";
import CourseModule from "./CourseModule";

const CourseMenu = () => {
  const [openChapter, setOpenChapter] = useState(null);
  const courses = useCourseStore((state) => state.courses);
  // Trong component cha
  const [openModuleIndex, setOpenModuleIndex] = useState(null);

  // Trong component cha
  const toggleModule = (index) => {
    setOpenModuleIndex(openModuleIndex === index ? null : index);
  };

  const toggleChapter = (index) => {
    setOpenChapter(openChapter === index ? null : index);
  };

  return (
    <div className="p-4 space-y-4 bg-gray-100 shadow-md sm:p-6 rounded-xl">
      {courses &&
        courses.stages.map((stage, index) => (
          <div key={index}>
            <div
              className={` flex items-center justify-between p-4 cursor-pointer rounded-xl transition-all duration-300 ${
                openChapter === index ? "bg-green-100" : "bg-white"
              }`}
              onClick={() => toggleChapter(index)}
            >
              <div className="flex items-center space-x-4 ">
                <div className="relative">
                  <Image
                    src="/courses/N1.svg"
                    alt="Icon"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span className="absolute bottom-0 left-0 p-1 text-xs font-semibold text-gray-600 -translate-x-1/2 translate-y-1/2 bg-white rounded-full">
                    {10}%
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800">{stage.name}</h4>
                  <p className="text-sm text-gray-500">
                    {1} videos • {2} bài tập • {3} bài Test sửa bài Test
                  </p>
                </div>
              </div>
              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
                  openChapter === index ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {openChapter === index && (
              <div className="p-4 mt-2 space-y-4 bg-white rounded-xl slide-up">
                {stage.sections.map((module, moduleIndex) => (
                  <CourseModule
                    key={moduleIndex}
                    index={moduleIndex}
                    indexLesson={index}
                    module={module}
                    openModuleIndex={openModuleIndex} // state từ cha
                    toggleModule={toggleModule} // hàm từ cha
                  />
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default CourseMenu;
