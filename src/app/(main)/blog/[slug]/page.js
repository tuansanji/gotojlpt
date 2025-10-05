// app/blog/[slug]/page.js

import React from "react";
import Image from "next/image";
import Sidebar from "@/components/blogs/Sidebar.js";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/courses";

// Dữ liệu giả định cho sidebar
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

const categories = [{ slug: "van-hoa", name: "Văn hóa" }];

// Component trang Blog
// Chú ý: `params` được truyền vào từ Next.js
export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  // Tìm bài viết tương ứng với slug
  const post = blogPosts.find((p) => p.slug === slug);

  // Xử lý trường hợp không tìm thấy bài viết
  if (!post) {
    notFound(); // Chuyển hướng đến trang 404
  }

  const { title, date, author, image, content, tags } = post;

  return (
    <div className="px-4 py-10 bg-gray-100 md:px-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="p-6 bg-white shadow-sm md:col-span-2 rounded-xl">
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
            <div
              className="prose prose-base prose-indigo prose-a:text-indigo-600 prose-strong:text-gray-900 text-gray-700 max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
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
          <div className="md:col-span-1">
            <Sidebar categories={categories} popularPosts={popularPosts} />
          </div>
        </div>
      </div>
    </div>
  );
}
