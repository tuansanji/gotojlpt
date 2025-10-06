"use client";
import React, { useState, useEffect, useRef } from "react";

import ReactPlayer from "react-player";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const VideoPlayer = ({ videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  // 🌟 useEffect: Lắng nghe sự thay đổi của videoUrl
  useEffect(() => {
    videoUrl && setIsPlaying(true);
  }, [videoUrl]);
  const handlePause = () => {
    setIsPlaying(false);
  };
  const playerRef = useRef(null);

  useEffect(() => {
    // Chờ ReactPlayer mount rồi tìm video element
    const video = playerRef.current?.getInternalPlayer
      ? playerRef.current.getInternalPlayer()
      : document.querySelector("video");

    if (video) {
      video.setAttribute("controlsList", "nodownload noremoteplayback");
      video.setAttribute("disablePictureInPicture", "true");
      video.oncontextmenu = (e) => e.preventDefault();
    }
  }, []);

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
        ref={playerRef}
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
              controlsList: "nodownload noremoteplayback",
              disablePictureInPicture: true,
              onContextMenu: (e) => e.preventDefault(),
            },
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;
