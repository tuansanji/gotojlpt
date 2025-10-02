// "use client";

import useCourseStore from "@/store/courseStore";
import CourseSidebar from "./CourseSidebar";
import CourseSidebarAdmin from "./CourseSidebar1";
import VideoPlayer from "./ReactPlayer";

export default function CoursePage() {
  const courses = useCourseStore((state) => state.courses);
  const assetCurrent = useCourseStore((state) => state.assetCurrent);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="flex gap-6 mx-auto max-w-7xl items-start">
        <main className="w-[700px] flex-shrink-0">
          <div className="bg-white rounded-lg shadow-xl mb-6">
            <VideoPlayer videoUrl={assetCurrent?.id || ""} />
          </div>

          <div className="p-4 bg-teal-100 rounded-lg flex justify-between items-center">
            <p className="font-bold text-lg">{assetCurrent?.title}</p>
          </div>
        </main>

        <div className="flex-grow h-[calc(100vh-4rem)] sticky top-8 overflow-y-auto bg-white rounded-lg shadow-xl p-4">
          <CourseSidebar rawData={courses} />
        </div>
      </div>
    </div>
  );
}
