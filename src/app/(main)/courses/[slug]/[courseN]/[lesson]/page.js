"use client";

import useCourseStore from "@/store/courseStore";
import CourseSidebar from "./CourseSidebar";
import VideoPlayer from "./ReactPlayer";
import React, { useMemo, useState } from "react"; // ⬅️ THÊM useState
import Image from "next/image";
import { usePathname } from "next/navigation";

import dynamic from "next/dynamic";
import ReportTab from "./ReportTab";

// Định nghĩa các hằng số cho tab
const TAB = {
  DOC: "DOCUMENT",
  DOC_FULL: "FULL_DOCUMENT",
  ROADMAP: "ROADMAP",
  REPORT: "REPORT",
};

export default function CoursePage() {
  const courses = useCourseStore((state) => state.courses);
  const assetCurrent = useCourseStore((state) => state.assetCurrent);
  const pathname = usePathname();
  const pathSegments = pathname.split("/");

  // 1. STATE để quản lý tab hiện tại, mặc định là Lộ trình
  const [activeTab, setActiveTab] = useState(TAB.ROADMAP);

  // Lấy slug và courseN từ pathSegments
  // Giả định /courses/{slug}/{courseN}/...
  const slug = pathSegments[2];
  const courseN = pathSegments[3];

  // Logic kiểm tra Asset tồn tại (giữ nguyên)
  function doesAssetExistInCourse(courseData, assetId) {
    // ... (logic hàm doesAssetExistInCourse giữ nguyên) ...
    if (!courseData || !assetId || !Array.isArray(courseData.stages)) {
      return false;
    }
    const targetId = String(assetId);
    for (const stage of courseData.stages) {
      if (Array.isArray(stage.sections)) {
        for (const section of stage.sections) {
          if (Array.isArray(section.lessons)) {
            for (const lesson of section.lessons) {
              if (Array.isArray(lesson.assets)) {
                for (const asset of lesson.assets) {
                  if (String(asset.id) === targetId) {
                    return true;
                  }
                }
              }
            }
          }
        }
      }
    }
    return false;
  }

  // URL Video (Giữ nguyên)
  const videoUrl = useMemo(() => {
    if (!assetCurrent) return "";
    const existsInCurrentCourse = doesAssetExistInCourse(
      courses,
      assetCurrent.id
    );
    if (existsInCurrentCourse) {
      return String(assetCurrent.id);
    }
    return "";
  }, [courses, assetCurrent]);

  // 2. Tính toán URL cho Ảnh và PDF
  const roadmapImageUrl = `/courses/lo_trinh_${slug}_${courseN}.png`;

  // Hàm tìm Section cha (Cấp 2) chứa Asset hiện tại
  function findParentSection(listCourses, assetId) {
    // Kiểm tra điều kiện cơ bản
    if (!listCourses || !assetId || !Array.isArray(listCourses.stages)) {
      return null;
    }

    const targetId = String(assetId);

    // 1. Duyệt qua Stages (Cấp 1)
    for (const stage of listCourses.stages) {
      if (Array.isArray(stage.sections)) {
        // 2. Duyệt qua Sections (Cấp 2 - Đây là đối tượng cha cần tìm)
        for (const section of stage.sections) {
          if (Array.isArray(section.lessons)) {
            // 3. Duyệt qua Lessons (Cấp 3)
            for (const lesson of section.lessons) {
              if (Array.isArray(lesson.assets)) {
                // 4. Duyệt qua Assets (Cấp 4)
                for (const asset of lesson.assets) {
                  // 5. So sánh ID
                  if (String(asset.id) === targetId) {
                    // ✅ TÌM THẤY: Trả về đối tượng Section (Cấp 2) này
                    return section;
                  }
                }
              }
            }
          }
        }
      }
    }

    // Không tìm thấy
    return null;
  }

  // Hàm giả định (Bạn cần thay thế bằng logic truy vấn dữ liệu thực tế của bạn)
  const findAssetHierarchy = (courses, assetCurrent) => {
    const assetId = assetCurrent?.id;
    if (!assetId) return [];

    const hierarchy = [];

    // 1. Lặp qua Stages (Cấp 1)
    for (const stage of courses.stages || []) {
      // Tên cấp cha (stages) thường dùng title hoặc name
      const stageName = stage.title || stage.name;

      // 2. Lặp qua Sections (Cấp 2)
      for (const section of stage.sections || []) {
        const sectionName = section.title || section.name;

        // 3. Lặp qua Lessons (Cấp 3)
        for (const lesson of section.lessons || []) {
          const lessonName = lesson.title || lesson.name;

          // 4. Lặp qua Assets (Cấp 4)
          for (const asset of lesson.assets || []) {
            if (asset.id === assetId) {
              // Đã tìm thấy asset, trả về chuỗi cấp bậc
              const assetName = asset.title || asset.name;

              // Trả về một mảng chứa tên các cấp cha theo thứ tự
              return [stageName, sectionName, lessonName, assetName].filter(
                Boolean
              ); // Lọc bỏ giá trị null/undefined
            }
          }
        }
      }
    }

    return []; // Không tìm thấy
  };

  const PdfViewer = dynamic(() => import("./PdfViewer"), { ssr: false });
  // 3. Hàm render nội dung dựa trên tab
  const renderContent = () => {
    switch (activeTab) {
      case TAB.DOC:
        return <PdfViewer pdfUrl={assetCurrent?.url_pdf} />;
      case TAB.DOC_FULL:
        return (
          <PdfViewer
            pdfUrl={findParentSection(courses, assetCurrent.id)?.content_md}
          />
        );
      case TAB.ROADMAP: {
        return (
          <Image
            key="roadmap-image" // Thêm key để React biết đây là phần tử khác
            src={roadmapImageUrl}
            width={1000}
            height={1000}
            className="h-full w-full mt-4 rounded-lg shadow-md"
            alt="Course roadmap"
          />
        );
      }
      // Hiện ảnh Lộ trình
      case TAB.REPORT:
        return (
          <ReportTab courses={courses} assetCurrent={assetCurrent} />
          // <div className="p-6 mt-4 bg-white rounded-lg shadow-md border border-red-200">
          //   <h3 className="font-bold text-lg text-red-600">Báo Lỗi / Góp ý</h3>
          //   <p className="mt-2 text-gray-700">
          //     Vui lòng điền vào form báo lỗi để chúng tôi có thể xử lý vấn đề
          //     của bạn.
          //   </p>
          //   {/* THÊM FORM BÁO LỖI Ở ĐÂY */}
          // </div>
        );
      default:
        return null;
    }
  };

  // 4. Component Button
  const TabButton = ({ tab, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 ${
        activeTab === tab
          ? "bg-blue-600 text-white shadow-md"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="flex gap-6 mx-auto max-w-7xl items-start">
        <main className="w-[700px] flex-shrink-0">
          {/* KHỐI VIDEO PLAYER */}
          <div className="bg-white rounded-lg shadow-xl mb-6">
            <VideoPlayer videoUrl={videoUrl} />
          </div>

          {/* KHỐI THANH ĐIỀU KHIỂN & TITLE */}
          {videoUrl && (
            <div className="p-4 bg-teal-100 rounded-lg flex justify-between items-center mb-6">
              <p className="font-bold text-lg">{assetCurrent?.title}</p>
            </div>
          )}

          {/* KHỐI 4 NÚT TAB */}
          <div className="flex gap-3 p-4 bg-white rounded-lg shadow-md mb-6 border-b-2 border-gray-200">
            <TabButton tab={TAB.DOC} label="Tài liệu bài học" />
            <TabButton tab={TAB.DOC_FULL} label="Tài liệu chặng" />
            <TabButton tab={TAB.ROADMAP} label="Lộ trình" />
            <TabButton tab={TAB.REPORT} label="Báo lỗi" />
          </div>

          {/* KHỐI NỘI DUNG THAY ĐỔI */}
          {renderContent()}
        </main>

        <div className="flex-grow h-full sticky top-8 overflow-y-auto bg-white rounded-lg shadow-xl p-4">
          <CourseSidebar rawData={courses} />
        </div>
      </div>
    </div>
  );
}
