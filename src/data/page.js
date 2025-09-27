import BusinessSection from "@/components/courseMenu/cardCourse";
import PromoBanner from "@/components/header/Banner";
import Header from "@/components/header/Header";
import Image from "next/image";

import Footer from "@/components/footer/footer";
import BlogPage from "@/components/blogs/BlogPage";
import ExamCard from "../app/(main)/exams/examCard";

export default function Home() {
  // Hardcode dữ liệu mẫu cho BusinessSection
  const businessContent = {
    eyebrow: "Riki",
    description: "Đầy đủ khóa học N5 đến N1, tài liệu và bài thi JLPT.",
    cta: "Xem thêm khóa học",
    ctaLink: "/courses/riki",
    items: [
      {
        id: "courses/riki/n1",
        image: "/courses/N1.svg",
        badge: "N1",
        title: "Khóa học N1",
        description: [
          <p key="jp1">– Sử dụng tiếng Nhật tự nhiên như người bản xứ</p>,
          <p key="jp2">– Không gặp trở ngại nào trong giao tiếp</p>,
          <p key="jp3">
            – Có thể tự tin chọn công việc mình yêu thích với mức lương không
            thua kém người Nhật
          </p>,
        ],
      },
      {
        id: "courses/riki/n2",
        image: "/courses/n2.svg",
        badge: "N2",
        title: "Khóa học N2",
        description: [
          <p key="jp1">– Có thể xem phim không cần phụ đề</p>,
          <p key="jp2">– Có thể làm biên dịch, phiên dịch</p>,
          <p key="jp3">
            – Có thể giao tiếp thoải mái và tự tin với người bản xứ
          </p>,
        ],
      },
      {
        id: "courses/riki/n3",
        image: "/courses/N3.svg",
        badge: "N3",
        title: "Khóa học N3",
        description: [
          <p key="jp1">– Có thể làm phiên dịch cơ bản</p>,
          <p key="jp2">– Xem phim, nghe tin tức nắm được ý chính</p>,
          <p key="jp3">– Có thể làm việc với tư cách kỹ sư tại nhà máy</p>,
        ],
      },
    ],
  };
  const businessContent2 = {
    eyebrow: "Dũng Mori",
    description: "Đầy đủ khóa học N5 đến N1, tài liệu và bài thi JLPT.",
    cta: "Xem thêm khóa học",
    ctaLink: "/courses/dungmori",
    items: [
      {
        id: "courses/dungmori/n1",
        image: "/courses/N1.svg",
        badge: "N1",
        title: "Khóa học N1",
        description: [
          <p key="jp1">– Sử dụng tiếng Nhật tự nhiên như người bản xứ</p>,
          <p key="jp2">– Không gặp trở ngại nào trong giao tiếp</p>,
          <p key="jp3">
            – Có thể tự tin chọn công việc mình yêu thích với mức lương không
            thua kém người Nhật
          </p>,
        ],
      },
      {
        id: "courses/dungmori/n2",
        image: "/courses/n2.svg",
        badge: "N2",
        title: "Khóa học N2",
        description: [
          <p key="jp1">– Có thể xem phim không cần phụ đề</p>,
          <p key="jp2">– Có thể làm biên dịch, phiên dịch</p>,
          <p key="jp3">
            – Có thể giao tiếp thoải mái và tự tin với người bản xứ
          </p>,
        ],
      },
      {
        id: "courses/dungmori/n3",
        image: "/courses/N3.svg",
        badge: "N3",
        title: "Khóa học N3",
        description: [
          <p key="jp1">– Có thể làm phiên dịch cơ bản</p>,
          <p key="jp2">– Xem phim, nghe tin tức nắm được ý chính</p>,
          <p key="jp3">– Có thể làm việc với tư cách kỹ sư tại nhà máy</p>,
        ],
      },
    ],
  };
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

  const menuItems = [
    {
      title: "VỀ RIKI",
      submenu: [
        { title: "Giới thiệu công ty", link: "/gioi-thieu" },
        { title: "Tuyển dụng Riki", link: "/tuyen-dung" },
        { title: "Bản tin Riki", link: "/ban-tin" },
      ],
    },
    {
      title: "JLPT",
      submenu: [
        {
          title: "Học Online",
          submenu: [
            { title: "Khóa cơ bản", link: "/online-co-ban" },
            { title: "Lớp tích hợp", link: "/online-tich-hop" },
          ],
        },
        { title: "Học Offline", link: "/offline" },
        { title: "Trực tuyến", link: "/truc-tuyen" },
      ],
    },
    // Add other menu items here
    { title: "GIAO TIẾP", link: "/giao-tiep" },
    {
      title: "KỸ NĂNG",
      submenu: [
        { title: "Riki Flix", link: "/riki-flix" },
        { title: "Business", link: "/business" },
        { title: "Tokutei", link: "/tokutei" },
      ],
    },
    { title: "B2B", link: "/b2b" },
    { title: "NGÔN NGỮ KHÁC", link: "/ngon-ngu-khac" },
    { title: "GÓC CHIA SẺ", link: "/goc-chia-se" },
  ];

  return (
    <div>
      <BusinessSection content={businessContent} order={1} />
      <BusinessSection content={businessContent2} />
      <ExamCard course={courseData} />
      <ExamCard course={courseData} />
      <BlogPage />
    </div>
  );
}
