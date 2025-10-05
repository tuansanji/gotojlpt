// components/BlogCard.js
import React from "react";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ post }) => {
  return (
    <div className="flex flex-col p-4 space-y-4 transition-shadow duration-300 border border-gray-200 shadow-sm md:flex-row md:space-y-0 md:space-x-6 rounded-xl hover:shadow-lg">
      {/* 🌟 FIX 1: Cố định kích thước vùng chứa ảnh trên desktop */}
      <div className="flex-shrink-0 w-full md:w-60 **md:h-40**">
        <Image
          src={post.image}
          alt={post.title}
          // Thay đổi kích thước này chỉ là gợi ý cho Next/Image, không phải CSS
          width={240}
          height={160}
          // 🌟 FIX 2: Đảm bảo ảnh chiếm hết không gian vùng chứa và được cắt/zoom (object-cover)
          className="object-cover rounded-lg w-full h-full"
        />
      </div>

      {/* 🌟 FIX 3: Biến khối nội dung thành Flexbox (cột) để căn chỉnh đều */}
      <div className="flex-1 space-y-2 flex flex-col **justify-between**">
        {/* Khối trên: Tiêu đề và Mô tả */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 transition-colors hover:text-cyan-500">
            <Link href={`/blog/${post.slug}`}>
              <p>{post.title}</p>
            </Link>
          </h3>
          {/* Giữ nguyên line-clamp-3 để mô tả không đẩy các item khác xuống */}
          <p className="text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>
        </div>

        {/* Khối dưới: Tags (đã được đẩy xuống cuối nhờ justify-between) */}
        <div className="flex flex-wrap gap-2 text-xs **mt-2**">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-gray-700 bg-gray-200 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
