// pages/blog/index.js hoặc app/blog/page.js

import React from "react";
import BlogCard from "./BlogCard";
import Sidebar from "./Sidebar";

// Dữ liệu giả định
const posts = [
  {
    slug: "hoc-tieng-nhat-bat-dau-tu-dau",
    title: "Học Tiếng Nhật Bắt Đầu Từ Đâu?",
    excerpt: `Khi mới học tiếng Nhật, nhiều bạn thường bị “ngợp” bởi bảng chữ cái, ngữ pháp phức tạp và lượng từ vựng khổng lồ. Thực ra, để đi đúng hướng bạn chỉ cần:
Bắt đầu với Hiragana – Katakana thật chắc.
Học 300–500 từ vựng cơ bản trong đời sống.
Làm quen ngữ pháp sơ cấp N5 với các mẫu câu đơn giản.
👉 Lời khuyên: học ít nhưng đều đặn mỗi ngày 30 phút sẽ hiệu quả hơn “học dồn” rồi bỏ giữa chừng.`,
    image: "/blogs/1.png",
    tags: ["Kinh nghiệm", "Tiếng nhật "],
  },
  {
    slug: "bi-quyet-tu-hoc-jlpt-n3",
    title: "Bí quyết tự học JLPT N3 hiệu quả và bền vững",
    excerpt: `JLPT N3 là cột mốc nhiều bạn hướng tới khi chuẩn bị đi du học hoặc xin việc. Muốn đỗ N3, bạn cần:

Ngữ pháp: học theo sách Shinkanzen Master hoặc Soumatome.

Từ vựng + Kanji: ôn theo flashcard Anki hoặc Quizlet.

Nghe hiểu: luyện nghe tin tức NHK Easy hoặc podcast Nhật ngắn.

Làm đề: luyện ít nhất 5 đề mô phỏng (mock test) trước ngày thi.
👉 Tip: dành thời gian nhiều hơn cho phần nghe, vì đây là phần “ăn điểm” dễ nhất.`,
    image: "/blogs/2.png",
    tags: ["Học tập", "Kinh nghiệm"],
  },
  {
    slug: "du-hoc-nhat-ban-chuan-bi-gi",
    title: "Du học Nhật Bản: Cần chuẩn bị những gì?",
    excerpt: `Đi du học không chỉ là học ngôn ngữ mà còn là chuẩn bị kỹ càng về tinh thần và tài chính.

Tiếng Nhật: ít nhất N4, nếu có N3 càng tốt.

Giấy tờ: hộ chiếu, hồ sơ cá nhân, chứng minh tài chính.

Kỹ năng sống: nấu ăn, quản lý chi tiêu, tự lập.
👉 Đặc biệt: hãy tìm hiểu trước văn hóa Nhật Bản để tránh “sốc văn hóa”.`,
    image: "/blogs/3.png",
    tags: ["Du lịch", "Kyoto"],
  },
];

const popularPosts = [
  {
    slug: "ung-dung-hoc-tieng-nhat",
    title: "5 ứng dụng miễn phí giúp bạn học tiếng Nhật mỗi ngày",
    image: "/blogs/5.jpg",
    date: "10/03/2025",
  },
  {
    slug: "vi-sao-nen-thi-jlpt-du-khong-di-du-hoc",
    title: "Vì Sao Nên Thi JLPT Dù Không Đi Du Học?",
    image: "/blogs/4.jpg",
    date: "05/02/2025",
  },
];

const categories = [
  { slug: "van-hoa", name: "Văn hóa" },
  { slug: "hoc-tap", name: "Học tập" },
  { slug: "du-lich", name: "Du lịch" },
  { slug: "kinh-nghiem", name: "Kinh nghiệm" },
];

export default function BlogPage() {
  return (
    <div className="px-4 py-10 bg-gray-100 md:px-10">
      <div className="container mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-center text-gray-800">
          Riki Blog
        </h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Cột chính - Danh sách bài viết */}
          <div className="space-y-6 md:col-span-2">
            {posts.map((post, index) => (
              <BlogCard key={index} post={post} />
            ))}
          </div>

          {/* Cột sidebar */}
          <div className="md:col-span-1 ">
            <Sidebar categories={categories} popularPosts={popularPosts} />
          </div>
        </div>
      </div>
    </div>
  );
}
