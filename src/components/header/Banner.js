// components/PromoBanner.js

const PromoBanner = () => {
  return (
    <div className="px-4 py-2 md:p-2 text-center bg-[#ffcf57]">
      <div className="container mx-auto">
        <p className="text-[15px] font-semibold text-gray-700 md:text-base">
          Ưu đãi giảm tới <strong className="text-red-600">50%</strong> toàn bộ
          khóa học tiếng Nhật
        </p>
      </div>
    </div>
  );
};

export default PromoBanner;
