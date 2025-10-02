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

  //   const setNCourseCurrent = useCourseStore((state) => state.setNCourseCurrent);
  //   const setURL_VIDEO = useCourseStore((state) => state.setURL_VIDEO);

  const handleGetDetailCourse = (course) => {
    routes.push(`/courses/${course.provider}/${course.level}`);
    // token && setLoading(true);
    // try {
    //   //   const courseData = await getDetailCourse(token, id);
    //   //   setNCourseCurrent(courseData);
    //   //   setURL_VIDEO(courseData?.stages[0]?.url_intro || "");
    //   //   setIsEdit();
    //   //   setLoading(false);
    // } catch (error) {
    //   //   toast.error("Lỗi khi tải khóa học. Vui lòng liên hệ admin");
    //   //   setLoading(false);
    // } finally {
    //   //   setLoading(false);
    // }
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
        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${color}`}
      >
        {text}
      </span>
    );
  };

  return (
    <div
      onClick={() => {
        handleGetDetailCourse(course);
      }}
      // href={course.url}
      className="block bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="p-6">
        {/* Header: Level & Provider */}
        <div className="flex justify-between items-center mb-4">
          <span
            className={`text-lg font-extrabold px-3 py-1 rounded-full ${
              course.level === "N1"
                ? "bg-yellow-400 text-gray-800"
                : "bg-indigo-500 text-white"
            }`}
          >
            {course.level}
          </span>
          <p
            className={`text-2xl font-extrabold capitalize tracking-wider 
          ${course.provider === "dungmori" ? "text-red-600" : "text-blue-600"}`}
          >
            {course.provider}
          </p>
        </div>

        {/* Title & Description */}
        <h2 className="text-xl font-bold text-gray-900 mb-2 truncate">
          {course.title}
        </h2>
        <p className="text-gray-600 text-sm h-10 overflow-hidden mb-4">
          {course.short_desc}
        </p>

        {/* Tags & Price */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-red-600">
              {formatPrice(course.price)}
            </p>
            {course.stages_count > 0 && (
              <p className="text-xs text-gray-500">
                {course.stages_count} Module
              </p>
            )}
          </div>
          <DeliveryTag mode={course.delivery_mode} />
        </div>
      </div>
    </div>
  );
};

export default CourseCardV2;
