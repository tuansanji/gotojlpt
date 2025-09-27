// components/CourseModule.js

"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid"; // Cần cài đặt Heroicons
import Link from "next/link";
import useCourseStore from "@/store/courseStore";

const CourseModule = ({
  module,
  isLessonPage = false,
  indexLesson,
  index,
  openModuleIndex,
  toggleModule,
  setUrlVideo,
}) => {
  const params = useParams();
  const { slug, courseN } = params;

  const courses = useCourseStore((state) => state.courses);
  const setLesson = useCourseStore((state) => state.setLesson);
  const isModuleOpen = openModuleIndex === index;

  return (
    <div className={`border border-gray-200 rounded-lg `}>
      <div
        className={`flex items-center justify-between p-4 cursor-pointer ${
          isModuleOpen && "bg-green-100"
        }`}
        onClick={() => toggleModule(index)}
      >
        <div className="flex items-center space-x-2">
          <h5 className="font-semibold text-gray-800">{module.title}</h5>
          {module.lessons.some((l) => l.is_active) && (
            <span className="px-2 py-1 text-xs font-bold text-purple-700 bg-purple-100 rounded-full">
              Học thử
            </span>
          )}
        </div>
        <div className="flex items-center">
          <ChevronUpIcon
            className={`w-5 h-5 text-gray-500 transition-transform ${
              isModuleOpen ? "" : "rotate-180"
            }`}
          />
        </div>
      </div>

      {isModuleOpen && (
        <>
          <ul className="border-t border-gray-200 slide-up">
            {module.lessons.map((lesson, indexLessons) => (
              <li
                key={indexLessons}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center space-x-3">
                  <svg
                    className={`w-5 h-5 text-red-500`} // Màu tím cho tiến trình
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6h16c1.1 0 2-.9 2-2s-.9-2-2-2H4c-1.1 0-2 .9-2 2s.9 2 2 2zM2 11h20c1.1 0 2-.9 2-2s-.9-2-2-2H2c-1.1 0-2 .9-2 2s.9 2 2 2zM22 16H2c-1.1 0-2 .9-2 2s.9 2 2 2h20c1.1 0 2-.9 2-2s-.9-2-2-2z" // Ba gạch ngang (giống như danh sách bài học)
                    />
                  </svg>
                  <div>
                    <Link
                      onClick={() =>
                        setLesson({
                          lessonCurrent: indexLesson,
                        })
                      }
                      href={`/courses/${slug}/${courseN}/${lesson.id}`}
                      className="text-gray-700 transition-colors hover:text-blue-600"
                    >
                      {lesson.slug}
                    </Link>

                    <p className="text-xs text-gray-500">{lesson.duration}</p>
                  </div>
                </div>
                {lesson.locked && (
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 
                     3.24 7 6v2H6c-1.1 0-2 .9-2 
                     2v10c0 1.1.9 2 2 2h12c1.1 
                     0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 
                     9c-1.1 0-2-.9-2-2s.9-2 
                     2-2 2 .9 2 2-.9 2-2 2zM9 
                     6c0-1.66 1.34-3 3-3s3 
                     1.34 3 3v2H9V6z"
                    ></path>
                  </svg>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default CourseModule;
