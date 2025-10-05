import BusinessSection from "@/components/courseMenu/cardCourse";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/Header";
import ExamCard from "./exams/examCard";
import BlogPage from "@/components/blogs/BlogPage";

import PromoBanner from "@/components/header/Banner";
import CourseList from "@/components/courseMenu/CourseList";

export default function MainLayout({ children }) {
  const courseData = {
    image: "/courses/N1.svg", // Thay thế bằng đường dẫn ảnh thực tế của bạn
    title: "Khóa học Tiếng Nhật",
    level: "Cơ bản - Nâng cao",
    type: "Online/Offline",
    duration: "40 - 80 giờ",
    description:
      "Chinh phục các kỳ thi tiếng Nhật với lộ trình học rõ ràng, tài liệu chuẩn cho cho mọi cấp độ JLPT và sự hướng dẫn tận tâm từ đội ngũ giảng viên tại HanoiLink.",
    levels: [
      { name: "N5", active: false },
      { name: "N4", active: true }, // Mặc định là active để có màu nền
      { name: "N3", active: false },
      { name: "N2", active: false },
      { name: "N1", active: false },
    ],
    link: "/khoa-hoc-tieng-nhat",
  };
  return (
    <>
      <CourseList />
      {/* <BusinessSection content={businessContent} order={1} />
      <BusinessSection content={businessContent2} /> */}
      <ExamCard course={courseData} />
      <ExamCard course={courseData} />
      <BlogPage />
    </>
  );
}
