"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid"; // Cần cài đặt Heroicons
import Link from "next/link";
import useCourseStore from "@/store/courseStore";

import useAuthStore from "@/store/authStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const LessonMenuModule = ({
  module,
  index,
  openModuleIndex,
  toggleModule,
  setUrlVideo,
}) => {
  const token = useAuthStore((state) => state.token);

  const isModuleOpen = openModuleIndex === index;
  // Giả định bạn có hàm này trong component hoặc service nào đó

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
          {/* {module.lessons.some((l) => l.is_active) && (
            <span className="px-2 py-1 text-xs font-bold text-purple-700 bg-purple-100 rounded-full">
              Học thử
            </span>
          )} */}
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
            {module.assets.map((asset, index) => (
              <li key={index} className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 
                     10 10 10-4.48 10-10S17.52 2 12 2zm-2 
                     14.5v-9l6 4.5-6 4.5z"
                    ></path>
                  </svg>
                  <div>
                    <button
                      onClick={() => {
                        console.log(asset);
                        setUrlVideo(`${asset.id}`);
                      }}
                      className="text-gray-700 transition-colors hover:text-blue-600"
                    >
                      {asset.title}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default LessonMenuModule;
