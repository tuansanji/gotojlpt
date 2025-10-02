// components/Sidebar.js
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Sidebar = ({ categories, popularPosts }) => {
  return (
    <aside className="space-y-8">
      {/* Phần Danh mục */}
      <div className="p-6 bg-white shadow-sm rounded-xl">
        <div className="course-box">
          <div className="border-l-4 border-blue-600 p-4 my-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-blue-600 mb-2 pb-1 border-b border-dashed border-gray-300">
              Khóa học Dũng Mori & Riki: Lộ trình JLPT toàn diện
            </h2>
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-red-500">Dũng Mori</strong> và
              <strong className="text-red-500"> Riki Nihongo</strong> cung cấp
              các khóa học tiếng Nhật
              <strong className="text-red-500"> từ N5 đến N1</strong> dưới hình
              thức
              <strong className="text-red-500"> online</strong> tiện lợi. Cả hai
              đều tập trung vào việc luyện thi chứng chỉ
              <strong className="text-red-500"> JLPT</strong> với lộ trình học
              đầy đủ các kỹ năng:
              <strong className="text-red-500 ml-0.5  ">
                Từ vựng, Kanji, Ngữ pháp, Đọc hiểu
              </strong>{" "}
              và
              <strong className="text-red-500"> Nghe hiểu</strong>. Các khóa học
              chuyên sâu như
              <strong className="text-red-500"> Luyện đề</strong> hoặc rèn luyện
              kỹ năng chuyên biệt cũng được cung cấp, giúp học viên dễ dàng
              chinh phục mục tiêu JLPT của mình.
            </p>
          </div>
        </div>
        {/* <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index}>
              <Link href={`/blog/category/${category.slug}`}>
                <p className="text-gray-600 transition-colors hover:text-cyan-500">
                  {category.name}
                </p>
              </Link>
            </li>
          ))}
        </ul> */}
      </div>

      {/* Phần Bài viết nổi bật */}
      <div className="p-6 bg-white shadow-sm rounded-xl">
        <h3 className="mb-4 text-lg font-bold text-gray-800">
          Bài viết nổi bật
        </h3>
        <ul className="space-y-4">
          {popularPosts.map((post, index) => (
            <li key={index} className="flex space-x-4">
              <div className="flex-shrink-0 w-1/3">
                <Image
                  width={100}
                  height={60}
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-16 rounded-lg"
                />
              </div>
              <div className="flex-1">
                <Link href={`/blog/${post.slug}`}>
                  <p className="text-sm font-semibold text-gray-700 transition-colors hover:text-cyan-500 line-clamp-2">
                    {post.title}
                  </p>
                </Link>
                <p className="mt-1 text-xs text-gray-500">{post.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
