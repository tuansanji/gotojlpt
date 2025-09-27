"use client";

import React, { useState } from "react";

import VideoPlayer from "./ReactPlayer";
import LessonMenuModule from "./LessonMenu";
import useCourseStore from "@/store/courseStore";

function LessonPage() {
  const [urlVideo, setUrlVideo] = useState("");

  const courses = useCourseStore((state) => state.courses);
  const lesson = useCourseStore((state) => state.lesson);

  const [openModuleIndex, setOpenModuleIndex] = useState(null);

  let globalModuleIndex = 0;
  // Trong component cha
  const toggleModule = (index) => {
    setOpenModuleIndex(openModuleIndex === index ? null : index);
  };

  return (
    <div className="flex">
      {/* KHỐI CHÍNH BÊN TRÁI (Trình phát video và nội dung) */}
      <div className="flex-1 p-4 max-h-[100vh]">
        {/* Phần thêm trình phát video */}
        <div className="overflow-hidden bg-black rounded-xl">
          <VideoPlayer videoUrl={urlVideo} />
        </div>

        {/* Nội dung khóa học (Description, etc.) */}
        <div className="p-4 mt-4 bg-white shadow-md rounded-xl">
          <h2 className="text-2xl font-bold">Tiêu đề khóa học</h2>
          <p className="mt-2 text-gray-600">Mô tả chi tiết...</p>
        </div>
      </div>

      {/* KHỐI BÊN PHẢI (Menu bài học) */}

      <div className="p-4 mt-2 space-y-4 bg-white w-96 rounded-xl max-h-[90%] overflow-y-auto">
        {/* Lặp qua các stages đã lọc */}
        {courses && courses.stages && courses.stages[lesson.lessonCurrent] && (
          <>
            {courses.stages[lesson.lessonCurrent].sections.map(
              (stage, index) => (
                <div key={index}>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {stage.title}
                  </h4>
                  {stage.lessons.map((module, moduleIndex) => {
                    // Lấy chỉ mục duy nhất hiện tại
                    const currentGlobalIndex = globalModuleIndex;

                    // Tăng chỉ mục cho lần lặp tiếp theo
                    globalModuleIndex++;
                    return (
                      <LessonMenuModule
                        key={currentGlobalIndex}
                        index={currentGlobalIndex}
                        module={module}
                        openModuleIndex={openModuleIndex} // state từ cha
                        toggleModule={toggleModule} // hàm từ cha
                        isLessonPage
                        setUrlVideo={setUrlVideo}
                      />
                    );
                  })}
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default LessonPage;
