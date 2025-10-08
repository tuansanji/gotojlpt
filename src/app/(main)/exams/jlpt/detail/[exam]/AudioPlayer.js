// Giả sử bạn định nghĩa component này ở đâu đó bên ngoài (hoặc bên trong)
// component cha, ví dụ: const FixedAudioPlayer = ({ audioUrl, isHeaderBottom }) => { ... }
const FixedAudioPlayer = ({ audioUrl, isHeaderBottom }) => {
  // Chỉ render nếu có audio
  if (!audioUrl) return null;

  return (
    // ⭐️ QUAN TRỌNG: Khối này luôn tồn tại trong DOM.
    // Dùng visibility/opacity để ẩn/hiện, KHÔNG dùng điều kiện render (&&).
    // Dùng sticky top-0 để nó luôn bám dính.
    <div
      className={`
        sticky top-[50px] z-10 p-2 bg-white shadow-md border-b 
        transition-opacity duration-300 
        ${!isHeaderBottom ? "opacity-100 visible" : "opacity-0 invisible h-0"}
      `}
      // Tùy chỉnh top: 50px là ví dụ, để nó nằm dưới các thanh cố định khác nếu có.
      style={{ top: "0px" }}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Dùng key là audioUrl. Nếu audioUrl không đổi, element audio không bị tạo lại. */}
        <audio
          key={audioUrl}
          controls
          src={audioUrl}
          className="w-full rounded-md border border-gray-200"
          autoPlay // Có thể thêm autoPlay nếu cần
        />
      </div>
    </div>
  );
};
export default FixedAudioPlayer;
