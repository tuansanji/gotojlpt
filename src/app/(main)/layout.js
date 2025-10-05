"use client";

import Footer from "@/components/footer/footer";

import Header from "@/components/header/Header";
import { Toaster } from "@/components/ui/ToastMessage";
import LoadingOverlay from "@/components/ui/LoadingOverlay.js";
import useStatusStore from "@/store/statusStore";
import PromoBanner from "@/components/header/Banner";

export default function MainLayout({ children }) {
  const isLoading = useStatusStore((state) => state.isLoading);
  return (
    <>
      <PromoBanner />
      <Toaster richColors />
      <Header /> {/* Header hiển thị */}
      {isLoading && <LoadingOverlay />}
      <main>
        {children} {/* Nội dung trang */}
      </main>
      <Footer /> {/* Footer hiển thị */}
    </>
  );
}
