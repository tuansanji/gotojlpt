import { getDetailCourse } from "@/services/courseService";
import useAuthStore from "@/store/authStore";
import useCourseStore from "@/store/courseStore";
import useStatusStore from "@/store/statusStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CourseCardV2 = ({ course }) => {
  const isEdit = useCourseStore((state) => state.isEdit);
  const setIsEdit = useCourseStore((state) => state.setIsEdit);
  const token = useAuthStore((state) => state.token);
  const setLoading = useStatusStore((state) => state.setLoading);
  const routes = useRouter();

  const handleGetDetailCourse = (course) => {
    routes.push(`/courses/${course.provider}/${course.level}`);
  };

  // Hàm định dạng tiền tệ Việt Nam
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(parseFloat(price));
  };

  // Hàm hiển thị tag cho Delivery Mode
  const DeliveryTag = ({ mode }) => {
    let color = "bg-gray-200 text-gray-800";
    if (mode === "video") color = "bg-blue-100 text-blue-800";
    if (mode === "live") color = "bg-red-100 text-red-800";
    if (mode === "hybrid") color = "bg-green-100 text-green-800";

    const text =
      mode === "video" ? "Video" : mode === "live" ? "Live Class" : "Hybrid";

    return (
      <span
        className={` justify-center rounded-full px-2 py-0.5 text-xs font-medium ${color} flex-shrink-0`}
      >
        {text}
      </span>
    );
  };

  return (
    <Link
      href={`/courses/${course.provider}/${course.level}`}
      passHref
      className="block bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer"
    >
      {/* 🌟 FIX: Giảm padding tổng thể */}
      <div className="md:p-5 p-3">
        {/* Header: Level & Provider */}
        <div className="flex  justify-between items-center mb-4">
          <span
            // 🌟 FIX: Giảm kích thước Level Tag
            className={`text-sm justify-center flex items-center  font-extrabold px-3 py-1 rounded-full flex-shrink-0 ${
              course.level === "N1"
                ? "bg-yellow-400 text-gray-800"
                : "bg-indigo-500 text-white"
            }`}
          >
            {course.level}
          </span>
          <p
            // 🌟 FIX: Giảm kích thước Provider, kết hợp min-w-0 truncate để co lại
            className={`md:text-xl text-[13px] font-extrabold capitalize tracking-wider min-w-0 truncate
          ${course.provider === "dungmori" ? "text-red-600" : "text-blue-600"}`}
          >
            {course.provider}
          </p>
        </div>

        {/* Title & Description */}
        <h2 className="md:text-lg  text-[13px]  font-bold text-gray-900 mb-2 truncate">
          {course.title}
        </h2>
        <p className="text-gray-600 md:text-sm  text-[12px]  h-10 overflow-hidden mb-2 md:mb-4">
          {course.short_desc}
        </p>

        {/* Tags & Price */}
        <div className="flex justify-between items-center pt-2 md:pt-4 border-t border-gray-100">
          {/* FIX: Dùng flex-grow và min-w-0 để khối giá tiền co lại và chiếm hết chỗ còn lại */}
          <div className="space-y-1   flex-grow min-w-0">
            <p className="text-[12px] md:text-xl font-bold text-red-600 truncate">
              {formatPrice(course.price)}
            </p>
            {course.stages_count > 0 && (
              <p className="text-xs text-gray-500">
                {course.stages_count} Chặng
              </p>
            )}
          </div>
          <DeliveryTag mode={course.delivery_mode} />
        </div>
      </div>
    </Link>
  );
};

export default CourseCardV2;
