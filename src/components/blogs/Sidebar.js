// components/Sidebar.js
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Sidebar = ({ categories, popularPosts }) => {
  return (
    <aside className="space-y-8">
      {/* Phần Danh mục */}
      <div className="p-6 bg-white shadow-sm rounded-xl">
        <h3 className="mb-4 text-lg font-bold text-gray-800">Danh mục</h3>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index}>
              <Link href={`/blog/category/${category.slug}`}>
                <p className="text-gray-600 transition-colors hover:text-cyan-500">
                  {category.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
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
