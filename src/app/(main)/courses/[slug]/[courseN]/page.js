"use client";

import React, { useEffect } from "react";
import CourseMenu from "../../../../../components/courseMenu/CourseMenu";
import useAuthStore from "@/store/authStore";
import useCourseStore from "@/store/courseStore";
import { getCourses } from "@/services/courseService";
import useStatusStore from "@/store/statusStore";
import { setIdCourse } from "@/lib/setIdCourse";
import { toast } from "sonner";
import CoursePage from "./[lesson]/page";

const CourseContent = ({ params }) => {
  const resolvedParams = React.use(params);
  const { slug, courseN } = resolvedParams;
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  const setCourses = useCourseStore((state) => state.setCourses);
  const courses = useCourseStore((state) => state.courses);
  const setLoading = useStatusStore((stage) => stage.setLoading);

  useEffect(() => {
    const fetchCourseData = async () => {
      setLoading(true);
      try {
        // API của bạn yêu cầu idCourse, tôi dùng 1 làm ví dụ
        const courseData = await getCourses(setIdCourse(courseN));
        setCourses(courseData); // Lưu dữ liệu vào store
        setLoading(false);
      } catch (error) {
        // console.error("Lỗi khi tải dữ liệu khóa học:", error);
        toast.error("Lỗi khi tải khóa học. Vui lòng liên hệ admin");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [user, token, courseN, slug]);
  const infoCourse = {
    totalChapters: 5,
    totalVideos: 89,
    totalHours: 56,
    courseData: 7,
  };
  return (
    <div className="p-6 bg-white shadow-md rounded-xl">
      {/* Thông tin tổng quan */}
      {/* <div className="mb-6 text-gray-600">
        <h1 className="mb-2 text-2xl font-bold text-red-600">
          Đây là trang khóa học {courseN} của {slug}
        </h1>
        <p className="font-semibold text-gray-800">Chương trình học</p>
        <p className="text-sm">
          {infoCourse.totalChapters} Chương • {infoCourse.totalVideos} videos
          bài giảng • {infoCourse.totalHours} giờ {infoCourse.totalMinutes} phút
        </p>
      </div> */}
      {/* <CourseMenu courses={courses} /> */}

      <CoursePage />
    </div>
  );
};

export default CourseContent;
