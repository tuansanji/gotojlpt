"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Tự host file Worker (Giữ nguyên)
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

  const originalWarn = console.warn;
  console.warn = function (...args) {
    if (
      typeof args[0] === "string" &&
      (args[0].includes("GlobalImageCache.setData") ||
        args[0].includes("Knockout groups not supported"))
    ) {
      return;
    }
    originalWarn.apply(console, args);
  };
}

// HÀM TIỆN ÍCH: CHUẨN HÓA ĐẦU VÀO (Giữ nguyên)
const normalizePdfUrls = (pdfUrl) => {
  const API_URL_BASE = "https://api.gotojlpt.com/pdf/";
  let urlsToRender = [];
  let processedUrl = pdfUrl;

  if (typeof pdfUrl === "string" && pdfUrl.trim().startsWith("[")) {
    try {
      processedUrl = JSON.parse(pdfUrl);
    } catch (e) {
      console.error("Failed to parse pdfUrl as JSON Array:", e);
      processedUrl = pdfUrl;
    }
  }

  if (Array.isArray(processedUrl)) {
    urlsToRender = processedUrl
      .filter((item) => item && item.path && item.type === "pdf")
      .map((item) => {
        const url = item.path.startsWith("http")
          ? item.path
          : `${API_URL_BASE}${item.path}`;
        return {
          url: encodeURI(url),
          path: item.path,
        };
      });
  } else if (typeof processedUrl === "string" && processedUrl) {
    let fullUrl = processedUrl;
    if (!processedUrl.startsWith("http")) {
      fullUrl = `${API_URL_BASE}${processedUrl}`;
    }
    urlsToRender = [{ url: encodeURI(fullUrl), path: processedUrl }];
  }

  return urlsToRender;
};

// ----------------------------------------------------

export default function PdfViewer({ pdfUrl }) {
  const [loadingError, setLoadingError] = useState(null);

  // STATE: Chiều rộng Responsive cho PDF
  const [pdfContainerWidth, setPdfContainerWidth] = useState(null);

  // 🌟 STATE MỚI: Chiều rộng cửa sổ cho tính toán chính xác
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  // 🌟 THAY ĐỔI: useEffect để theo dõi chiều rộng cửa sổ
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🌟 THAY ĐỔI: Tính toán chiều rộng PDF dựa trên WindowWidth
  useEffect(() => {
    const DESKTOP_BREAKPOINT = 768;
    const MARGIN_MOBILE = 32; // mx-4 = 1rem * 2 = 32px
    const DESKTOP_CONTENT_MAX = 700;

    if (windowWidth >= DESKTOP_BREAKPOINT) {
      // Desktop: Lấy chiều rộng cố định 700px và trừ đi 40px padding an toàn (660px)
      // (Đảm bảo nó không bao giờ vượt quá 660px trên desktop)
      setPdfContainerWidth(DESKTOP_CONTENT_MAX - 40);
    } else {
      // Mobile: Chiều rộng viewport trừ đi margin mx-4 (32px)
      // Điều này đảm bảo nó vừa khít với vùng nội dung <main>
      setPdfContainerWidth(windowWidth - MARGIN_MOBILE);
    }
  }, [windowWidth]);

  // TÍNH TOÁN SCALE TỐI ƯU
  const devicePixelRatio =
    typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

  // 🌟 THAY ĐỔI: Sử dụng scale an toàn hơn 1.0 trên mobile.
  // Nếu màn hình nhỏ (<768px), scale luôn là 1.0 (hoặc 1.1) để ưu tiên hiển thị toàn bộ.
  const customScale =
    windowWidth < 768
      ? 1.0 // Giảm scale an toàn trên mobile
      : devicePixelRatio > 1
      ? devicePixelRatio * 0.75
      : 1;

  const pdfFiles = useMemo(() => normalizePdfUrls(pdfUrl), [pdfUrl]);
  const [numPagesMap, setNumPagesMap] = useState({});

  function onDocumentLoadSuccess(index, { numPages }) {
    setNumPagesMap((prev) => ({ ...prev, [index]: numPages }));
    setLoadingError(null);
  }

  function onDocumentLoadError(error) {
    console.error("Error loading PDF:", error);
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

  // Chờ đợi chiều rộng được tính toán trước khi render trang
  if (!pdfContainerWidth) {
    return (
      <div className="p-4 text-center text-blue-600">
        Đang tính toán kích thước hiển thị...
      </div>
    );
  }

  return (
    <div
      className="pdf-display-area w-full mt-4 flex flex-col items-center overflow-y-auto"
      style={{ maxHeight: "calc(100vh - 200px)" }}
    >
      {/* LẶP QUA MẢNG CÁC FILE VÀ RENDER MỖI FILE */}
      {pdfFiles.map((file, fileIndex) => (
        <div key={fileIndex} className="w-full flex flex-col items-center mb-8">
          {/* Nút Tải xuống (Giữ nguyên) */}
          <a
            href={`https://api.gotojlpt.com/pdf-download/${encodeURI(
              file.path
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            // 🌟 CSS RESPONSIVE ĐÃ CẬP NHẬT:
            // Mặc định (Mobile): px-3 py-1.5, text-sm, font-medium
            // Desktop (md:): Tăng padding lên px-4 py-2, tăng kích thước chữ lên base
            className="flex items-center justify-center space-x-2 px-3 py-1.5 md:px-4 md:py-2 bg-indigo-600 text-white text-sm md:text-base font-medium rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              // Mặc định (Mobile): h-4 w-4
              // Desktop (md:): Tăng lên h-5 w-5
              className="h-4 w-4 md:h-5 md:w-5"
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
                  // SỬ DỤNG CHIỀU RỘNG ĐÃ TÍNH TOÁN
                  width={pdfContainerWidth}
                  // 🌟 SỬ DỤNG SCALE AN TOÀN HƠN
                  scale={customScale}
                />
              </div>
            ))}
          </Document>
        </div>
      ))}
    </div>
  );
}
