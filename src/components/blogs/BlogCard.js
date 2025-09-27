// components/BlogCard.js
import React from "react";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ post }) => {
  return (
    <div className="flex flex-col p-4 space-y-4 transition-shadow duration-300 border border-gray-200 shadow-sm md:flex-row md:space-y-0 md:space-x-6 rounded-xl hover:shadow-lg">
      <div className="flex-shrink-0">
        <Image
          src={post.image}
          alt={post.title}
          width={250}
          height={150}
          className="object-cover rounded-lg"
        />
      </div>
      <div className="flex-1 space-y-2">
        <h3 className="text-xl font-bold text-gray-800 transition-colors hover:text-cyan-500">
          <Link href={`/blog/${post.slug}`}>
            <p>{post.title}</p>
          </Link>
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2 text-xs">
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
