"use client";

import LoadingOverlay from "@/components/ui/LoadingOverlay.js";
import { Toaster } from "@/components/ui/ToastMessage";
import useStatusStore from "@/store/statusStore";
export default function AuthLayout({ children }) {
  const isLoading = useStatusStore((state) => state.isLoading);
  return (
    // Layout này chỉ chứa nội dung chính (children) mà không có Header/Footer
    <div className="">
      <Toaster richColors />
      {isLoading && <LoadingOverlay />}
      {children} {/* Nội dung trang login/register */}
    </div>
  );
}
