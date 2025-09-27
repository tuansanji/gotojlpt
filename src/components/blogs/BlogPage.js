// pages/blog/index.js hoặc app/blog/page.js

import React from "react";
import BlogCard from "./BlogCard";
import Sidebar from "./Sidebar";

// Dữ liệu giả định
const posts = [
  {
    slug: "bai-viet-1",
    title: "Khám phá văn hóa Nhật Bản qua ẩm thực độc đáo",
    excerpt:
      "Tìm hiểu về các món ăn truyền thống và hiện đại, từ sushi, ramen đến các món tráng miệng tinh tế.",
    image: "/exams/blog.png",
    tags: ["Văn hóa", "Ẩm thực"],
  },
  {
    slug: "bai-viet-2",
    title: "10 cách học từ vựng tiếng Nhật hiệu quả cho người mới bắt đầu",
    excerpt:
      "Bài viết này sẽ chia sẻ những bí quyết giúp bạn học từ vựng một cách nhanh chóng và ghi nhớ lâu hơn.",
    image: "/exams/blog.png",
    tags: ["Học tập", "Kinh nghiệm"],
  },
  {
    slug: "bai-viet-3",
    title: "Những địa điểm du lịch tuyệt vời ở Kyoto vào mùa thu",
    excerpt:
      "Cùng khám phá những ngôi đền cổ kính, những con đường rợp lá vàng và đỏ khi đến Kyoto.",
    image: "/exams/blog.png",
    tags: ["Du lịch", "Kyoto"],
  },
  // Thêm các bài viết khác
];

const popularPosts = [
  {
    slug: "popular-1",
    title: "5 mẹo luyện nghe JLPT N3 cực kỳ hiệu quả",
    image: "/exams/blog.png",
    date: "10/10/2025",
  },
  {
    slug: "popular-2",
    title: "Lộ trình học tiếng Nhật từ N5 lên N2 chỉ trong 1 năm",
    image: "/exams/blog.png",
    date: "05/10/2025",
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
          <div className="md:col-span-1">
            <Sidebar categories={categories} popularPosts={popularPosts} />
          </div>
        </div>
      </div>
    </div>
  );
}
