"use client";
import React, { useEffect, useRef, useState, memo, useCallback } from "react";
// Import icons từ lucide-react
import { Play, Pause, Repeat1, ChevronDown, Volume2 } from "lucide-react";

// Đổi tên component thành AudioPlayerCustom để tránh nhầm lẫn
function AudioPlayerCustom({
  audioUrl, // Dùng audioUrl thay vì lessonCurrent.audio
  openMenu,
  setMenuMusic2,
}) {
  const [play, setPlay] = useState(false);
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [repeatOne, setRepeatOne] = useState(false);
  const [loading, setLoading] = useState(true);
  const [menuMusic, setMenuMusic] = useState(false);

  // Load data (Đã tối ưu hóa)
  const handleLoadedData = useCallback(() => {
    setLoading(false);
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      // Tự động phát nếu đang ở trạng thái play (sau khi load)
      if (play) audioRef.current.play();
    }
  }, [play]);

  // Cập nhật progress bar
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (audioRef.current && audioRef.current.duration > 0) {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        const progressPercent = (currentTime / duration) * 100;
        setProgress(progressPercent);
      }
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  // Xử lý khi audioUrl thay đổi
  useEffect(() => {
    if (audioUrl) {
      setLoading(true);
      setPlay(false);
      setProgress(0);
      // Khi audioUrl thay đổi, trình duyệt sẽ tự động tải lại nếu src thay đổi
    }
  }, [audioUrl]);

  // Xử lí input thanh tiến trình
  const handleSeek = useCallback(
    (e) => {
      if (audioRef.current) {
        const seekTime = Number(
          (e.target.value / 100) * audioRef.current.duration
        );
        audioRef.current.currentTime = seekTime;
        setProgress(e.target.value);
        if (!play) {
          setPlay(true);
          audioRef.current.play();
        }
      }
    },
    [play]
  );

  // Phát lại một bài hát
  const handleRepeatOne = useCallback(() => {
    setRepeatOne((prev) => !prev);
  }, []);

  // Tạm dừng và tiếp tục
  const handlePlayAndPause = useCallback(() => {
    if (audioRef.current) {
      if (play) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setPlay((prev) => !prev);
    }
  }, [play]);

  // Xử lí audio kết thúc (Chỉ xử lí Repeat One)
  const handleEndAudio = useCallback(() => {
    if (repeatOne) {
      setProgress(0);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      setPlay(true);
    } else {
      setPlay(false);
      setProgress(100);
    }
  }, [repeatOne]);

  // Hàm chuyển đổi giây thành phút:giây
  const formatTime = (totalSeconds) => {
    if (isNaN(totalSeconds) || totalSeconds < 0) return "0:00";
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!audioUrl) {
    return (
      <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded-lg">
        <p className="font-medium text-red-700">Không tìm thấy URL âm thanh.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg">
      {/* HEADER & CONTROLS */}
      <div
        className={`w-full md:w-[90%] mx-auto flex flex-col justify-center items-center relative gap-8`}
      >
        {/* Nút thu gọn (Giữ nguyên logic menu cũ của bạn) */}
        <span
          className="absolute top-[-1.5rem] right-[0.5rem] cursor-pointer text-gray-600 hover:text-gray-900"
          onClick={() => {
            setMenuMusic(!menuMusic);
            if (setMenuMusic2) setMenuMusic2(!menuMusic);
          }}
        >
          <ChevronDown
            size={30}
            style={{ transform: menuMusic ? "rotate(180deg)" : "none" }}
            className="transition-transform duration-300"
          />
        </span>

        {/* LOADING (có thể ẩn nếu logic loading đã hoàn tất) */}
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white/80 z-10 rounded-xl">
            {/* Sử dụng một loading spinner đơn giản */}
            <svg
              className="animate-spin h-8 w-8 text-cyan-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}

        {/* TIÊU ĐỀ AUDIO */}
        <header className="flex items-center justify-center space-x-3 text-cyan-600">
          <Volume2 size={24} />
          <h3 className="text-xl font-bold text-gray-800">Trình Phát Audio</h3>
        </header>

        {/* CONTROL BAR (Chỉ Play/Pause và Repeat One) */}
        <div
          className={`flex flex-row gap-8 sm:gap-6 bg-[#f0e6e6] px-[2rem] py-[0.5rem] rounded-full shadow-md items-center`}
        >
          {/* Nút Play/Pause */}
          <button
            className="p-3 cursor-pointer active:opacity-80 hover:bg-cyan-600/10 rounded-full bg-cyan-500 text-white transition-colors duration-200"
            onClick={handlePlayAndPause}
          >
            {play ? (
              <Pause size={28} /> // Icon Pause
            ) : (
              <Play size={28} className="translate-x-[1px]" /> // Icon Play
            )}
          </button>

          {/* Nút Repeat One */}
          <button
            onClick={handleRepeatOne}
            className="p-3 cursor-pointer active:opacity-80 rounded-full hover:bg-slate-100 transition-colors duration-200"
          >
            <Repeat1
              size={28}
              // Thay đổi màu khi bật
              className={`${repeatOne ? "text-red-500" : "text-gray-500"}`}
            />
          </button>
        </div>

        {/* Thanh Tiến Trình (Progress Bar) */}
        <div className="relative w-full flex justify-center pt-2 pb-4">
          {/* Thời gian hiện tại */}
          <span className="absolute left-[5%] top-[1.5rem] text-cyan-600 font-bold text-xs">
            {formatTime(audioRef.current?.currentTime || 0)}
          </span>

          {/* Thời gian tổng */}
          <span className="absolute right-[5%] top-[1.5rem] font-bold text-xs">
            {formatTime(duration)}
          </span>

          {/* Input Range */}
          <input
            id="progress"
            className="w-[90%] transition-all appearance-none h-1.5 rounded-full bg-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
            type="range"
            value={progress}
            onChange={handleSeek}
            step="1"
            min="0"
            max="100"
            // Inline Style để tùy chỉnh màu progress bar (Tailwind's Cyan)
            style={{
              background: `linear-gradient(to right, #06b6d4 ${progress}%, #d1d5db ${progress}%)`,
            }}
          />
        </div>

        {/* Thẻ Audio ẩn */}
        <audio
          id="audio"
          ref={audioRef}
          src={audioUrl}
          onLoadedData={() => {
            // Đảm bảo audio loads và set duration/loading
            handleLoadedData();
            // Đặt set loading ở đây sau khi loadeddata
            setLoading(false);
          }}
          onCanPlay={() => setLoading(false)} // Cải tiến: Xử lý khi có thể chơi
          onWaiting={() => setLoading(true)} // Cải tiến: Xử lý khi đang buffer
          onPlay={() => setPlay(true)}
          onPause={() => setPlay(false)}
          onEnded={handleEndAudio}
        ></audio>
      </div>
    </div>
  );
}

export default memo(AudioPlayerCustom);
