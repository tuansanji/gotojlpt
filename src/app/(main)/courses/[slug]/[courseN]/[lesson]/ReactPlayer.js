// components/VideoPlayer.js
"use client";
import React from "react";

import ReactPlayer from "react-player";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const VideoPlayer = ({ videoUrl }) => {
  if (!videoUrl) {
    return (
      <div className="p-4 text-center text-gray-500 ">
        Không có video để phát.
      </div>
    );
  }

  return (
    <div className="relative pt-[56.25%]">
      <ReactPlayer
        src={`${API_URL}lesson-assets/stream/${videoUrl}`}
        controls={true}
        width="100%"
        height="100%"
        className="absolute top-0 left-0"
        config={{
          // Cấu hình cho file video thông thường (cần thiết nếu stream thất bại)
          file: {
            attributes: {
              controlsList: "nodownload",
              // Thử thêm thuộc tính cho thẻ video gốc
              disablePictureInPicture: true,
            },
            // ✅ Thử buộc render thẻ <video> HTML5 thay vì player phức tạp
            forceVideo: true,
          },

          // Cấu hình cho HLS/DASH (Nếu API_URL của bạn là một stream)
          hls: {
            // ... (tùy chọn HLS nếu bạn có)
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;
