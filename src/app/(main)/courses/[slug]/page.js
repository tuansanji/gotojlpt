import BusinessSection from "@/components/courseMenu/cardCourse";
import React from "react";

export default function PageCourse({ params }) {
  const resolvedParams = React.use(params);
  const { slug } = resolvedParams;

  const businessContent2 = {
    eyebrow: slug,
    description: "Đầy đủ khóa học N5 đến N1, tài liệu và bài thi JLPT.",

    ctaLink: "/courses/dungmori",
    items: [
      {
        id: "/courses/dungmori/n1",
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
        id: "/courses/dungmori/n2",
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
        id: "/courses/dungmori/n3",
        image: "/courses/N3.svg",
        badge: "N3",
        title: "Khóa học N3",
        description: [
          <p key="jp1">– Có thể làm phiên dịch cơ bản</p>,
          <p key="jp2">– Xem phim, nghe tin tức nắm được ý chính</p>,
          <p key="jp3">– Có thể làm việc với tư cách kỹ sư tại nhà máy</p>,
        ],
      },
      {
        id: "/courses/dungmori/n4",
        image: "/courses/N2.svg",
        badge: "N4",
        title: "Khóa học N4",
        description: [
          <p key="jp1">– Nắm vững kiến thức cơ bản tiếng Nhật</p>,
          <p key="jp2">– Giao tiếp các chủ đề quen thuộc hàng ngày</p>,
          <p key="jp3">– Đủ điều kiện du học, làm việc cơ bản tại Nhật</p>,
        ],
      },
      {
        id: "/courses/dungmori/n5",
        image: "/courses/N2.svg",
        badge: "N5",
        title: "Khóa học N5",
        description: [
          <p key="jp1">– Làm quen với bảng chữ cái, từ vựng cơ bản</p>,
          <p key="jp2">– Giao tiếp đơn giản, hỏi đáp thông tin cá nhân</p>,
          <p key="jp3">– Khởi đầu cho hành trình học tiếng Nhật</p>,
        ],
      },
    ],
  };

  return (
    <div>
      <BusinessSection content={businessContent2} />
    </div>
  );
}
