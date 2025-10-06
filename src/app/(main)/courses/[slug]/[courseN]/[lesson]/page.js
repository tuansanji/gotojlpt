"use client";

import useCourseStore from "@/store/courseStore";
import CourseSidebar from "./CourseSidebar";
import VideoPlayer from "./ReactPlayer";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { List, Menu, X } from "lucide-react";

import dynamic from "next/dynamic";
import ReportTab from "./ReportTab";
import AudioPlayer from "./AudioPlayer";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CoursePage() {
  const courses = useCourseStore((state) => state.courses);
  const assetCurrent = useCourseStore((state) => state.assetCurrent);
  const pathname = usePathname();
  const pathSegments = pathname.split("/");

  // STATE MỚI: Quản lý trạng thái đóng/mở của sidebar (cho mobile)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Định nghĩa các hằng số cho tab
  const TAB = {
    DOC: "DOCUMENT",
    DOC_FULL: "FULL_DOCUMENT",
    ROADMAP: "ROADMAP",
    REPORT: "REPORT",
  };
  const defaultTab = useMemo(() => {
    // Đảm bảo assetCurrent tồn tại trước khi truy cập thuộc tính
    if (!assetCurrent || !assetCurrent.id) {
      return TAB.ROADMAP; // Giá trị dự phòng an toàn
    }

    const parentSection = findParentSection(courses, assetCurrent.id);
    const hasPdfUrl = !!assetCurrent.url_pdf;
    const hasParentContent = !!parentSection?.content_md;

    // 1. Ưu tiên 1: Có URL PDF
    if (hasPdfUrl) {
      return TAB.DOC;
    }

    // 3. Ưu tiên 3: Còn lại (KHÔNG có PDF, KHÔNG có Content MD)
    return TAB.ROADMAP;
  }, [courses, assetCurrent]);

  // 1. STATE để quản lý tab hiện tại, mặc định là Lộ trình
  const [activeTab, setActiveTab] = useState(defaultTab);
  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);
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

  // 2. Hàm tìm Section cha (Giữ nguyên)
  function findParentSection(listCourses, assetId) {
    // ... (logic hàm findParentSection giữ nguyên) ...
    if (!listCourses || !assetId || !Array.isArray(listCourses.stages)) {
      return null;
    }

    const targetId = String(assetId);
    for (const stage of listCourses.stages) {
      if (Array.isArray(stage.sections)) {
        for (const section of stage.sections) {
          if (Array.isArray(section.lessons)) {
            for (const lesson of section.lessons) {
              if (Array.isArray(lesson.assets)) {
                for (const asset of lesson.assets) {
                  if (String(asset.id) === targetId) {
                    return section;
                  }
                }
              }
            }
          }
        }
      }
    }
    return null;
  }

  const PdfViewer = dynamic(() => import("./PdfViewer"), { ssr: false });
  // 3. Hàm render nội dung dựa trên tab (Giữ nguyên)
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
        const normalizedSlug = slug ? String(slug).toLowerCase() : "";
        const normalizedCourseN = courseN ? String(courseN).toLowerCase() : "";
        return (
          <Image
            key="roadmap-image"
            src={`/courses/lo_trinh_${normalizedSlug}_${normalizedCourseN}.png`}
            width={1000}
            height={1000}
            className="h-full w-full mt-4 rounded-lg shadow-md"
            alt="Course roadmap"
          />
        );
      }
      case TAB.REPORT:
        return <ReportTab courses={courses} assetCurrent={assetCurrent} />;
      default:
        return null;
    }
  };

  // 4. Component Button (CẬP NHẬT KÍCH THƯỚC)
  const TabButton = ({ tab, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      // 🌟 CẬP NHẬT: Giảm padding: px-3 py-1.5 và loại bỏ whitespace-nowrap
      className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors duration-200 ${
        activeTab === tab
          ? "bg-blue-600 text-white shadow-md"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NÚT MỞ/ĐÓNG SIDEBAR TRÊN MOBILE */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        // CLASS MỚI ĐÃ CHỈNH SỬA
        className="

    md:hidden 
    fixed bottom-6 right-6 z-50 
    text-white                          
    bg-cyan-600 hover:bg-cyan-700     
    hover:scale-105 transition-all duration-300
    shadow-lg                          
    flex items-center gap-2       justify-center       
    py-2.5 px-4        
                    rounded-full   
  "
      >
        {isSidebarOpen ? (
          // Khi sidebar mở: Icon X màu trắng
          <X size={24} className="text-white" />
        ) : (
          <>
            {/* Khi sidebar đóng: Hiển thị text "Chọn bài" */}
            {/* Icon List (màu trắng) */}
            <List size={20} className="text-white" />

            {/* Text "Chọn bài" (màu trắng, font hơi đậm) */}
            <span className="text-sm font-medium text-white">Chọn bài</span>
          </>
        )}
      </button>

      {/* BỐ CỤC CHÍNH */}
      <div className="flex gap-6 mx-auto max-w-7xl items-start pt-0 md:p-8 md:pt-8">
        {/* MAIN CONTENT */}
        <main className="w-full md:w-[700px] flex-shrink-0">
          {assetCurrent && assetCurrent.url_sound ? (
            // 1. HIỂN THỊ AUDIO PLAYER (nếu url_sound có giá trị)
            <div className="bg-white shadow-xl md:mb-6 mb-3 md:rounded-lg p-4">
              {/* Component AudioPlayer cần được tạo riêng */}
              <AudioPlayer audioUrl={assetCurrent?.url_sound} />
            </div>
          ) : (
            // 2. HIỂN THỊ VIDEO PLAYER (nếu url_sound là null hoặc không có)
            <div className="bg-white shadow-xl md:mb-6 mb-3 md:rounded-lg">
              {assetCurrent && assetCurrent.link === "#" && (
                <VideoPlayer videoUrl={videoUrl} />
              )}
            </div>
          )}

          {/* KHỐI THANH ĐIỀU KHIỂN & TITLE */}
          {videoUrl && (
            <div className="md:p-4 p-2 bg-teal-100 rounded-lg flex justify-between items-center md:mb-6 mb-2 mx-1 md:mx-0">
              <p className="font-bold text-lg">{assetCurrent?.title}</p>
            </div>
          )}

          {/* 🌟 CẬP NHẬT: KHỐI 4 NÚT TAB - Dùng flex-wrap để xuống dòng */}
          <div
            // 🌟 THAY ĐỔI: Thêm flex-wrap để buộc các nút xuống dòng
            className="flex flex-wrap gap-3 p-4 bg-white shadow-md mb-6 border-b-2 border-gray-200 mx-4 md:mx-0 rounded-lg"
          >
            <TabButton tab={TAB.DOC} label="Tài liệu bài học" />
            <TabButton tab={TAB.DOC_FULL} label="Tài liệu chặng" />
            <TabButton tab={TAB.ROADMAP} label="Lộ trình" />
            <TabButton tab={TAB.REPORT} label="Báo lỗi" />
          </div>

          {/* KHỐI NỘI DUNG THAY ĐỔI */}
          <div className="mx-4 md:mx-0">{renderContent()}</div>
        </main>

        {/* SIDEBAR - BỐ CỤC RESPONSIVE */}

        {/* Desktop Sidebar */}
        <div className="hidden md:block flex-grow h-full sticky top-8 overflow-y-auto bg-white rounded-lg shadow-xl p-4">
          <CourseSidebar rawData={courses} />
        </div>

        {/* Mobile Sidebar (Drawer) */}
        {/* Overlay làm mờ màn hình */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar Drawer thực tế */}
        <div
          className={`
            fixed top-0 right-0 h-full w-full bg-white shadow-2xl p-0 z-50 transition-transform duration-300 ease-in-out transform
            md:hidden
            ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-bold text-lg">Mục lục khóa học</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-gray-600 hover:text-gray-900"
            >
              <X size={24} />
            </button>
          </div>
          <CourseSidebar
            rawData={courses}
            setIsSidebarOpen={setIsSidebarOpen}
            isSidebarOpen={isSidebarOpen}
          />
        </div>
      </div>
    </div>
  );
}
