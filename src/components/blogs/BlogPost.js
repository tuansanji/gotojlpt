// pages/blog/[slug].js hoặc app/blog/[slug]/page.js

import React from "react";
import Image from "next/image";
import Sidebar from "./Sidebar"; // Sử dụng lại Sidebar đã tạo trước đó

// Dữ liệu giả định cho một bài viết blog
const postData = {
  slug: "kham-pha-van-hoa-nhat-ban-qua-am-thuc",
  title: "Khám phá văn hóa Nhật Bản qua ẩm thực độc đáo",
  date: "24/09/2025",
  author: "Riki",
  image: "/images/blog/post-1.jpg",
  content: `
    <p class="mb-4">Ẩm thực Nhật Bản không chỉ là những món ăn ngon mà còn là cả một nghệ thuật tinh tế. Mỗi món ăn đều mang trong mình một câu chuyện về văn hóa, lịch sử và con người Nhật Bản.</p>
    <p class="mb-4">Sushi, với sự kết hợp hài hòa giữa cơm giấm và hải sản tươi sống, là biểu tượng của sự tinh khiết và đơn giản. Ramen, món mì quốc dân với nước dùng đậm đà, lại thể hiện sự ấm cúng và thoải mái.</p>
    <p class="mb-4 font-bold">Hãy cùng chúng tôi khám phá những điều thú vị này!</p>
    <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">Các món ăn truyền thống</h2>
    <p class="mb-4">Ngoài sushi và ramen, Nhật Bản còn có nhiều món ăn truyền thống khác như Tempura, Okonomiyaki, và Takoyaki. Mỗi món ăn đều có cách chế biến riêng biệt và mang hương vị đặc trưng của từng vùng miền.</p>
  `,
  tags: ["Văn hóa", "Ẩm thực", "Du lịch"],
};

// Dữ liệu giả định cho các bài viết nổi bật
const popularPosts = [
  {
    slug: "popular-1",
    title: "5 mẹo luyện nghe JLPT N3 cực kỳ hiệu quả",
    image: "/images/blog/popular-1.jpg",
    date: "10/10/2025",
  },
  {
    slug: "popular-2",
    title: "Lộ trình học tiếng Nhật từ N5 lên N2 chỉ trong 1 năm",
    image: "/images/blog/popular-2.jpg",
    date: "05/10/2025",
  },
  // Thêm các bài viết nổi bật khác
];

// Dữ liệu giả định cho các danh mục
const categories = [
  { slug: "van-hoa", name: "Văn hóa" },
  { slug: "hoc-tap", name: "Học tập" },
  { slug: "du-lich", name: "Du lịch" },
  { slug: "kinh-nghiem", name: "Kinh nghiệm" },
];

export default function BlogPostPage() {
  const { title, date, author, image, content, tags } = postData;

  return (
    <div className="px-4 py-10 bg-gray-100 md:px-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Cột chính - Nội dung bài viết */}
          <div className="p-6 bg-white shadow-sm md:col-span-2 rounded-xl">
            {/* Tiêu đề và thông tin bài viết */}
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-4xl">
              {title}
            </h1>
            <div className="flex items-center mb-6 space-x-4 text-sm text-gray-500">
              <span>
                Bởi:{" "}
                <span className="font-semibold text-gray-700">{author}</span>
              </span>
              <span>
                Ngày đăng:{" "}
                <span className="font-semibold text-gray-700">{date}</span>
              </span>
            </div>

            {/* Hình ảnh chính */}
            <div className="w-full h-auto mb-6 overflow-hidden rounded-lg">
              <Image
                src={image}
                alt={title}
                width={800}
                height={450}
                layout="responsive"
                objectFit="cover"
              />
            </div>

            {/* Nội dung bài viết */}
            <div
              className="prose text-gray-700 max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Các thẻ (tags) */}
            <div className="flex flex-wrap gap-2 mt-8 text-sm">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-700"
                >
                  {tag}
                </span>
              ))}
            </div>
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
