import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCourseStore = create(
  persist(
    (set) => ({
      courses: null,
      assetCurrent: null,
      lesson: {
        lessonCurrent: null,
      },

      setCourses: (courseData) => set({ courses: courseData }),
      setAssetCurrent: (assetData) => set({ assetCurrent: assetData }),

      setLesson: (data) =>
        set((state) => ({
          // <-- Truyền hàm callback vào set
          lesson: {
            ...state.lesson, // <-- Giờ bạn có thể truy cập state.lesson
            lessonCurrent: data.lessonCurrent,
          },
        })),
    }),

    {
      name: "courses-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCourseStore;
