// components/PdfDisplay.js
import dynamic from "next/dynamic";
import React from "react";

// Dùng dynamic() để đảm bảo component chỉ được tải trên trình duyệt
const DynamicPdfViewer = dynamic(
  () => import("./PdfViewer"), // Thay thế bằng đường dẫn chính xác đến file PdfViewer của bạn
  {
    ssr: false, // QUAN TRỌNG: Tắt Server-Side Rendering
    loading: () => (
      <p className="p-4 text-center text-blue-600">
        Đang tải trình xem tài liệu...
      </p>
    ),
  }
);

export default function PdfDisplay(props) {
  // Truyền tất cả props (như pdfUrl) xuống component đã tải động
  return <DynamicPdfViewer {...props} />;
}
