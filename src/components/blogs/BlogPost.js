// pages/blog/[slug].js hoặc app/blog/[slug]/page.js

import React from "react";
import Image from "next/image";
import Sidebar from "./Sidebar"; // Sử dụng lại Sidebar đã tạo trước đó

// Dữ liệu giả định cho một bài viết blog
const postData = {
  slug: "hoc-tieng-nhat-bat-dau-tu-dau",
  title: "Khám phá văn hóa Nhật Bản qua ẩm thực độc đáo",
  date: "24/09/2025",
  author: "Riki",
  image: "/images/blog/post-1.jpg",
  content: `
   <div class="blog-post max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-10 leading-relaxed text-gray-800">
  <!-- Title -->
  <h1 class="text-4xl font-extrabold mb-6 text-indigo-700 tracking-tight">
    Học Tiếng Nhật Bắt Đầu Từ Đâu? Lộ Trình Cho Người Mới
  </h1>

  <!-- Intro -->
  <p class="mb-6 text-lg text-gray-600">
    Bước chân vào hành trình học tiếng Nhật, nhiều bạn cảm thấy bối rối: 
    học bảng chữ trước hay từ vựng trước, nên tập trung vào nghe nói hay ngữ pháp? 
    Nếu không có lộ trình rõ ràng, bạn dễ rơi vào tình trạng “học mãi không tiến bộ” 
    và nhanh chóng nản lòng. Bài viết này sẽ giúp bạn định hướng, 
    từng bước xây nền tảng vững chắc để học hiệu quả và bền lâu.
  </p>

  <!-- Section 1 -->
  <h2 class="text-2xl font-semibold mt-8 mb-3 text-indigo-700">1. Làm quen với bảng chữ cái</h2>
  <p class="mb-4">
    Bảng chữ cái chính là cửa ngõ đầu tiên. Tiếng Nhật có <strong>Hiragana</strong>, 
    <strong>Katakana</strong> và hơn 2000 chữ Kanji thông dụng. 
    Tuy nhiên, đừng vội nhảy ngay vào Kanji. Hãy đầu tư 1–2 tuần 
    để học thật chắc Hiragana và Katakana. Viết tay nhiều lần, đọc to từng chữ 
    và luyện bằng flashcard sẽ giúp bạn nhớ lâu hơn. 
  </p>
  <p class="mb-4">
    Một mẹo nhỏ: hãy dán bảng chữ cái ở góc bàn học hoặc làm hình nền điện thoại. 
    Việc tiếp xúc thường xuyên sẽ giúp bạn “ngấm” nhanh hơn mà không cần quá nhiều áp lực.
  </p>

  <!-- Section 2 -->
  <h2 class="text-2xl font-semibold mt-8 mb-3 text-indigo-700">2. Xây vốn từ vựng cơ bản</h2>
  <p class="mb-4">
    Sau khi đã quen với bảng chữ, hãy học từ vựng cơ bản. 
    Khoảng <strong>300–500 từ</strong> đầu tiên sẽ bao phủ 70% các tình huống 
    trong giao tiếp hàng ngày: chào hỏi, ăn uống, mua sắm, hỏi đường. 
  </p>
  <ul class="list-disc list-inside mb-4 pl-2 space-y-1 text-gray-700">
    <li>Dùng app <span class="font-semibold text-indigo-600">Anki</span> hoặc <span class="font-semibold text-indigo-600">Quizlet</span> để học theo flashcard.</li>
    <li>Học theo chủ đề (gia đình, trường lớp, cửa hàng) thay vì học ngẫu nhiên.</li>
    <li>Ôn lại từ vựng cũ xen kẽ với từ mới theo nguyên tắc “spaced repetition”.</li>
  </ul>
  <p class="mb-4">
    Khi gặp từ mới trong anime, bài hát hoặc truyện tranh, hãy ghi chú ngay. 
    Việc gắn từ vựng vào sở thích giúp não bộ nhớ nhanh và lâu hơn.
  </p>

  <!-- Section 3 -->
  <h2 class="text-2xl font-semibold mt-8 mb-3 text-indigo-700">3. Ngữ pháp sơ cấp (N5)</h2>
  <p class="mb-4">
    Ngữ pháp tiếng Nhật theo cấu trúc <strong>Chủ ngữ – Tân ngữ – Động từ</strong>. 
    Ví dụ: 「私は本を読みます」 (Tôi đọc sách). 
    Khi mới học, hãy tập trung vào mẫu câu đơn giản: khẳng định, phủ định, câu hỏi. 
  </p>
  <p class="mb-4">
    Giáo trình <span class="font-semibold">Minna no Nihongo</span> và 
    <span class="font-semibold">Genki</span> là lựa chọn phổ biến. 
    Mỗi ngày học 1–2 mẫu ngữ pháp, kèm ví dụ thực tế. 
    Bạn có thể viết nhật ký ngắn bằng tiếng Nhật để luyện áp dụng.
  </p>

  <!-- Section 4 -->
  <h2 class="text-2xl font-semibold mt-8 mb-3 text-indigo-700">4. Nghe và nói – đừng chờ đến khi “giỏi rồi mới luyện”</h2>
  <p class="mb-4">
    Sai lầm của nhiều người học là chỉ tập trung vào đọc và viết, bỏ qua nghe nói. 
    Ngay cả khi mới biết ít từ vựng, hãy bắt đầu luyện nghe mỗi ngày. 
    Bạn có thể:
  </p>
  <ul class="list-decimal list-inside mb-4 pl-2 space-y-1 text-gray-700">
    <li>Xem anime, J-drama có phụ đề.</li>
    <li>Nghe tin tức ngắn từ <span class="font-semibold">NHK Easy</span>.</li>
    <li>Tập nói lại theo nhân vật (shadowing technique).</li>
  </ul>
  <p class="mb-4">
    Về kỹ năng nói, hãy tìm một người bạn đồng hành hoặc dùng ứng dụng 
    như <span class="font-semibold">HelloTalk</span> để trò chuyện với người Nhật. 
    Sự tiến bộ sẽ đến nhanh hơn bạn nghĩ.
  </p>

  <!-- Section 5 -->
  <h2 class="text-2xl font-semibold mt-8 mb-3 text-indigo-700">5. Bí quyết duy trì – học ít nhưng đều</h2>
  <blockquote class="border-l-4 border-indigo-400 pl-4 italic text-gray-600 bg-indigo-50 rounded-r-lg py-3 mb-6">
    “Mỗi ngày chỉ cần 30 phút. Điều quan trọng không phải là học bao nhiêu, 
    mà là học bao lâu và liên tục thế nào.”
  </blockquote>
  <p class="mb-4">
    Thay vì học dồn 3 tiếng rồi bỏ bê vài ngày, hãy duy trì nhịp độ ổn định. 
    Bạn có thể chia nhỏ: 10 phút học chữ, 10 phút từ vựng, 10 phút nghe. 
    Sau 3–6 tháng, sự kiên trì này sẽ mang lại kết quả rõ rệt.
  </p>

  <!-- Conclusion -->
  <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mt-8 shadow-inner">
    <h3 class="text-xl font-bold text-indigo-700 mb-3">👉 Kết luận</h3>
    <p class="text-gray-700">
      Lộ trình học tiếng Nhật cho người mới không phức tạp: 
      <span class="font-semibold">bảng chữ cái → từ vựng cơ bản → ngữ pháp N5 → luyện nghe nói</span>. 
      Quan trọng nhất là sự kiên trì và niềm vui trong học tập. 
      Hãy biến tiếng Nhật thành một phần trong cuộc sống hàng ngày – nghe nhạc, xem phim, ghi chú – 
      để việc học không còn là áp lực, mà trở thành hành trình thú vị.
    </p>
  </div>
</div>

  `,
  tags: ["Văn hóa", "Ẩm thực", "Du lịch"],
};

// Dữ liệu giả định cho các bài viết nổi bật
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

// Dữ liệu giả định cho các danh mục
const categories = [
  { slug: "kinh-nghiem", name: "Văn hóa" },
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
