import React, { useState, useMemo } from "react";

// 🌟 PAGE ID CỦA BẠN
const FACEBOOK_PAGE_ID = "100090524688743";

// Giả định hàm findAssetHierarchy đã được định nghĩa ở đây
const findAssetHierarchy = (courses, assetCurrent) => {
  // ... (Giữ nguyên hàm findAssetHierarchy) ...
  const assetId = assetCurrent?.id;
  if (!assetId) return [];

  const hierarchy = [];

  // 1. Lặp qua Stages (Cấp 1)
  for (const stage of courses.stages || []) {
    const stageName = stage.title || stage.name;
    for (const section of stage.sections || []) {
      const sectionName = section.title || section.name;
      for (const lesson of section.lessons || []) {
        const lessonName = lesson.title || lesson.name;
        for (const asset of lesson.assets || []) {
          if (asset.id === assetId) {
            const assetName = asset.title || asset.name;
            return [stageName, sectionName, lessonName, assetName].filter(
              Boolean
            );
          }
        }
      }
    }
  }
  return [];
};

export default function ReportTab({ courses, assetCurrent }) {
  // TÍNH TOÁN NỘI DUNG TỰ ĐỘNG (Tiền tố)
  const { reportPrefix, assetId } = useMemo(() => {
    const hierarchyArray = findAssetHierarchy(courses, assetCurrent);
    const assetId = assetCurrent?.id || "N/A";
    const hierarchyPath = hierarchyArray.join(" > ");

    // Chuỗi tiền tố (Phần không đổi, dùng cho báo cáo lỗi)
    const prefix = `[Báo Lỗi Tự Động] [ID: ${assetId}] ${hierarchyPath}`;

    return { reportPrefix: prefix, assetId };
  }, [courses, assetCurrent]);

  // 🌟 STATE CHO Ý KIẾN TÙY CHỌN
  const [userComment, setUserComment] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // 🌟 HÀM XỬ LÝ GỬI BÁO CÁO (TỰ ĐỘNG SAO CHÉP VÀ CHUYỂN HƯỚNG)
  const handleOneClickReport = () => {
    const messengerUrlBase = `https://m.me/${FACEBOOK_PAGE_ID}`;

    // 🌟 GỘP NỘI DUNG: Luôn bao gồm tiền tố, thêm ý kiến người dùng nếu có
    const finalReportContent = `${reportPrefix}${
      userComment ? `: ${userComment}` : ""
    }`;

    // Yêu cầu xác nhận nhanh nếu ý kiến trống
    if (!userComment.trim()) {
      if (
        !window.confirm(
          "Bạn chưa điền mô tả lỗi/góp ý chi tiết. Bạn có chắc chắn muốn gửi báo cáo tự động này không?"
        )
      ) {
        return;
      }
    }

    if (navigator.clipboard && window.isSecureContext) {
      // 1. Sao chép nội dung cuối cùng
      navigator.clipboard
        .writeText(finalReportContent)
        .then(() => {
          // 2. Thông báo và chuyển hướng
          alert(
            "✅ Báo cáo đã được sao chép tự động! Vui lòng nhấn Ctrl+V/Dán vào cuộc trò chuyện Messenger để gửi."
          );
          window.open(messengerUrlBase, "_blank");
          setUserComment(""); // Xóa nội dung sau khi gửi
        })
        .catch((err) => {
          console.error("Không thể sao chép tự động:", err);
          alert("Lỗi sao chép tự động. Vui lòng sao chép thủ công.");
        });
    } else {
      // Dự phòng
      alert("Vui lòng sao chép thủ công và dán vào Messenger.");
      window.open(messengerUrlBase, "_blank");
    }
  };

  return (
    <div className="p-6 mt-4 bg-white rounded-lg shadow-md border border-red-200">
      <h3 className="font-bold text-lg text-red-600">Báo Lỗi / Góp ý</h3>

      <p className="mt-2 text-gray-700 font-semibold">
        Nội dung báo cáo chi tiết về tài liệu:
      </p>

      {/* PHẦN NỘI DUNG TỰ ĐỘNG (KHÔNG THỂ SỬA) */}
      <div className="mt-2 p-3 bg-gray-50 border border-gray-300 rounded-md break-words whitespace-pre-wrap text-sm text-gray-800">
        {reportPrefix}
      </div>

      <form className="mt-4">
        <label
          htmlFor="userComment"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Mô tả lỗi/Góp ý chi tiết (Tùy chọn):
        </label>

        {/* 🌟 TEXTAREA CHO Ý KIẾN TÙY CHỌN (KHÔNG BẮT BUỘC) */}
        <textarea
          id="userComment"
          name="userComment"
          rows="4"
          value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
          className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 transition duration-150"
          placeholder="Ví dụ: 'Trang 5 bị mất hình ảnh', hoặc 'Âm thanh bị rè từ phút 0:30'..."
        />

        <p className="mt-3 text-sm text-red-600 font-medium">
          Nhấn nút dưới đây để **gộp cả hai phần**, tự động sao chép và chuyển
          sang Messenger.
        </p>

        <div className="flex justify-center mt-4">
          {/* NÚT GỬI BÁO CÁO */}
          <button
            type="button"
            onClick={handleOneClickReport}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition duration-150 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-send-fill"
              viewBox="0 0 16 16"
            >
              <path d="M15.964.686a.5.5 0 0 0-.65-.65L.727 7.728l-.348 7.228A.5.5 0 0 0 .88 15.54L15.964.686zm-1.892 1.492L2.7 7.973 2.053 14.856l11.81-6.231 1.743-6.526z" />
            </svg>
            <span>Gửi Báo Cáo qua Messenger</span>
          </button>
        </div>
      </form>
    </div>
  );
}
