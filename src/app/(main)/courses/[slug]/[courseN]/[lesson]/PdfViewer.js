"use client";

import React, { useState, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Tự host file Worker để đảm bảo tính ổn định
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

  const originalWarn = console.warn;
  console.warn = function (...args) {
    // Lọc cảnh báo về cache
    if (
      typeof args[0] === "string" &&
      args[0].includes("GlobalImageCache.setData")
    ) {
      return;
    }
    // Lọc cảnh báo về knockout groups
    if (
      typeof args[0] === "string" &&
      args[0].includes("Knockout groups not supported")
    ) {
      return;
    }
    // Hiển thị tất cả các cảnh báo khác
    originalWarn.apply(console, args);
  };
}

// ----------------------------------------------------
// HÀM TIỆN ÍCH: CHUẨN HÓA ĐẦU VÀO THÀNH MẢNG CÁC OBJECT PDF
// ----------------------------------------------------
const normalizePdfUrls = (pdfUrl) => {
  const API_URL_BASE = "https://api.gotojlpt.com/pdf/";
  let urlsToRender = [];
  let processedUrl = pdfUrl; // Biến tạm để giữ dữ liệu đã phân tích

  // 🌟 BƯỚC SỬA LỖI: Thử phân tích chuỗi JSON thành mảng nếu nó có vẻ là mảng
  // Điều này rất quan trọng nếu pdfUrl được truyền vào dưới dạng một chuỗi JSON.
  if (typeof pdfUrl === "string" && pdfUrl.trim().startsWith("[")) {
    try {
      // Thử parse chuỗi thành mảng
      processedUrl = JSON.parse(pdfUrl);
    } catch (e) {
      console.error("Failed to parse pdfUrl as JSON Array:", e);
      // Giữ nguyên chuỗi nếu parse thất bại
      processedUrl = pdfUrl;
    }
  }

  // TRƯỜNG HỢP 1: Đầu vào là MẢNG (hoặc đã được parse thành mảng)
  if (Array.isArray(processedUrl)) {
    urlsToRender = processedUrl
      .filter((item) => item && item.path && item.type === "pdf") // Chỉ lấy các mục là pdf
      .map((item) => {
        // Tạo URL đầy đủ
        const url = item.path.startsWith("http")
          ? item.path
          : `${API_URL_BASE}${item.path}`;
        return {
          url: encodeURI(url), // Mã hóa URL
          path: item.path,
        };
      });
  }
  // TRƯỜNG HỢP 2: Đầu vào là CHUỖI (URL đơn)
  else if (typeof processedUrl === "string" && processedUrl) {
    let fullUrl = processedUrl;
    // Nếu chuỗi là đường dẫn tương đối, thêm API_URL_BASE
    if (!processedUrl.startsWith("http")) {
      fullUrl = `${API_URL_BASE}${processedUrl}`;
    }
    // Tạo mảng chỉ với 1 phần tử
    urlsToRender = [{ url: encodeURI(fullUrl), path: processedUrl }];
  }

  return urlsToRender;
};
// ----------------------------------------------------

export default function PdfViewer({ pdfUrl }) {
  const [loadingError, setLoadingError] = useState(null);

  // 🌟 TÍNH TOÁN SCALE TỐI ƯU cho độ sắc nét (Giữ nguyên)
  const devicePixelRatio =
    typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
  // Sử dụng 1.5 hoặc devicePixelRatio * 0.75 để tăng cường độ nét
  const customScale = devicePixelRatio > 1 ? devicePixelRatio * 0.75 : 1.5;

  // 🌟 SỬ DỤNG useMemo để tính toán MẢNG CÁC URL CẦN RENDER
  const pdfFiles = useMemo(() => normalizePdfUrls(pdfUrl), [pdfUrl]);

  // State để theo dõi số trang của từng file
  const [numPagesMap, setNumPagesMap] = useState({});

  function onDocumentLoadSuccess(index, { numPages }) {
    setNumPagesMap((prev) => ({ ...prev, [index]: numPages }));
    setLoadingError(null);
  }

  function onDocumentLoadError(error) {
    console.error("Error loading PDF:", error);
    // Cảnh báo người dùng về lỗi CORS
    setLoadingError(
      "Không thể tải tài liệu PDF. Vui lòng kiểm tra console. (Lỗi có thể do CORS)."
    );
  }

  // ------------------------------------
  // PHẦN LOGIC RENDER
  // ------------------------------------

  if (pdfFiles.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Không có tài liệu PDF nào được cung cấp hoặc đường dẫn không hợp lệ.
      </div>
    );
  }

  if (loadingError) {
    return (
      <div className="p-4 text-center text-red-600 font-bold bg-red-100 rounded-lg border border-red-300">
        {loadingError}
      </div>
    );
  }

  return (
    <div
      className="pdf-display-area w-full mt-4 flex flex-col items-center overflow-y-auto"
      style={{ maxHeight: "calc(100vh - 200px)" }}
    >
      {/* LẶP QUA MẢNG CÁC FILE VÀ RENDER MỖI FILE TRONG MỘT <Document> RIÊNG */}
      {pdfFiles.map((file, fileIndex) => (
        <div key={fileIndex} className="w-full flex flex-col items-center mb-8">
          <a
            href={`https://api.gotojlpt.com/pdf-download/${encodeURI(
              file.path
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L10 11.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v7a1 1 0 11-2 0V3a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>Tải xuống Tài liệu {fileIndex + 1}</span>
          </a>

          <Document
            file={file.url}
            onLoadSuccess={(data) => onDocumentLoadSuccess(fileIndex, data)}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="p-4 text-center text-blue-600">
                Đang tải tài liệu {fileIndex + 1}...
              </div>
            }
            error={
              <div className="p-4 text-center text-red-600">
                Lỗi khi tải PDF #{fileIndex + 1}.
              </div>
            }
            noData={
              <div className="p-4 text-center text-gray-500">
                Không có dữ liệu PDF #{fileIndex + 1}.
              </div>
            }
          >
            {/* Lặp qua số trang của file hiện tại */}
            {Array.from(new Array(numPagesMap[fileIndex]), (_, pageIndex) => (
              <div
                key={`file_${fileIndex}_page_${pageIndex + 1}`}
                className="my-2 border border-gray-200 shadow-sm rounded-md overflow-hidden"
              >
                <Page
                  pageNumber={pageIndex + 1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  width={650} // Chiều rộng cố định
                  scale={customScale} // Tăng cường độ nét
                />
              </div>
            ))}
          </Document>
        </div>
      ))}
    </div>
  );
}
