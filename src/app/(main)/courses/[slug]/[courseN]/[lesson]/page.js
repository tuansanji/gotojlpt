"use client";

import useCourseStore from "@/store/courseStore";
import CourseSidebar from "./CourseSidebar";

import VideoPlayer from "./ReactPlayer";
import React, { useMemo } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
export default function CoursePage() {
  const courses = useCourseStore((state) => state.courses);
  const assetCurrent = useCourseStore((state) => state.assetCurrent);
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  function doesAssetExistInCourse(courseData, assetId) {
    // 1. Kiểm tra điều kiện cơ bản
    if (!courseData || !assetId || !Array.isArray(courseData.stages)) {
      return false;
    }
    // Đảm bảo ID là chuỗi (hoặc số) để so sánh thống nhất
    const targetId = String(assetId);
    // 2. Duyệt qua Stages (Cấp 1)
    for (const stage of courseData.stages) {
      if (Array.isArray(stage.sections)) {
        // 3. Duyệt qua Sections (Cấp 2 - Topics)
        for (const section of stage.sections) {
          if (Array.isArray(section.lessons)) {
            // 4. Duyệt qua Lessons (Cấp 3 - Modules)
            for (const lesson of section.lessons) {
              if (Array.isArray(lesson.assets)) {
                // 5. Duyệt qua Assets (Cấp 4 - Items)
                for (const asset of lesson.assets) {
                  // 6. So sánh ID
                  if (String(asset.id) === targetId) {
                    return true; // Tìm thấy
                  }
                }
              }
            }
          }
        }
      }
    }

    // Không tìm thấy sau khi duyệt hết
    return false;
  }

  const url = useMemo(() => {
    if (!assetCurrent) {
      return ""; // Trả về chuỗi rỗng nếu không có assetCurrent
    }

    const existsInCurrentCourse = doesAssetExistInCourse(
      courses,
      assetCurrent.id
    );

    if (existsInCurrentCourse) {
      // Dùng String() để đảm bảo kiểu dữ liệu, mặc dù ID có thể là số
      return String(assetCurrent.id);
    }

    return ""; // Trả về chuỗi rỗng nếu asset không thuộc khóa học hiện tại
  }, [courses, assetCurrent]);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="flex gap-6 mx-auto max-w-7xl items-start">
        <main className="w-[700px] flex-shrink-0">
          <div className="bg-white rounded-lg shadow-xl mb-6">
            <VideoPlayer videoUrl={url} />
          </div>
          {url && (
            <div className="p-4 bg-teal-100 rounded-lg flex justify-between items-center">
              <p className="font-bold text-lg">{assetCurrent?.title}</p>
            </div>
          )}
          {pathSegments && (
            <Image
              src={`/courses/lo_trinh_${pathSegments[2]}_${pathSegments[3]}.png`}
              width={1000}
              height={1000}
              className="h-full w-full mt-4"
              alt="Course roadmap"
            />
          )}
        </main>

        <div className="flex-grow h-full sticky top-8 overflow-y-auto bg-white rounded-lg shadow-xl p-4">
          <CourseSidebar rawData={courses} />
        </div>
      </div>
    </div>
  );
}
