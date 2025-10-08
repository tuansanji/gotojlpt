import BusinessSection from "@/components/courseMenu/cardCourse";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/Header";
import ExamCard from "./exams/examCard";
import BlogPage from "@/components/blogs/BlogPage";

import PromoBanner from "@/components/header/Banner";
import CourseList from "@/components/courseMenu/CourseList";

import ExamsHomePage from "./exams/ExamsHomePage";

export default function MainLayout({ children }) {
  return (
    <>
      <CourseList />
      <ExamsHomePage />
      {/* <BusinessSection content={businessContent} order={1} />
      <BusinessSection content={businessContent2} /> */}
      {/* <ExamCard course={courseDataRiki} />
      <ExamCard course={courseDataDungMori} /> */}
      <BlogPage />
    </>
  );
}
