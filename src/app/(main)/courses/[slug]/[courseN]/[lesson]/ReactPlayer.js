"use client";
import React, { useState, useEffect } from "react";

import ReactPlayer from "react-player";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const VideoPlayer = ({ videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  // 🌟 useEffect: Lắng nghe sự thay đổi của videoUrl
  useEffect(() => {
    setIsPlaying(true);
  }, [videoUrl]);
  const handlePause = () => {
    setIsPlaying(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

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
        // playing={videoUrl ? true : false}
        playing={isPlaying}
        onPause={handlePause}
        onPlay={handlePlay}
        className="absolute top-0 left-0"
        config={{
          file: {
            forceVideo: true,
            attributes: {
              onContextMenu: (e) => e.preventDefault(),
              controlsList: "nodownload",
              disablePictureInPicture: true,
            },
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;
