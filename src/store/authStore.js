import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create(
  // 1. Gói store logic vào hàm persist()
  persist(
    (set) => ({
      user: null,
      token: null,
      purchased_courses: null,

      // Hành động (actions) để cập nhật trạng thái
      // Khi gọi login, persist sẽ tự động lưu state mới vào localStorage
      login: (userData, tokenData) =>
        set({
          user: userData,
          token: tokenData,
        }),

      // Khi gọi logout, persist sẽ tự động lưu state mới (null) vào localStorage
      logout: () =>
        set({
          user: null,
          token: null,
          purchased_courses: null,
        }),
      getCourseOfUser: (courses) =>
        set({
          purchased_courses: courses,
        }),
    }),

    // 2. Cấu hình persist
    {
      name: "auth-storage", // Tên key sẽ được lưu trong localStorage (ví dụ: 'auth-storage')
      storage: createJSONStorage(() => localStorage), // Chỉ định sử dụng localStorage
    }
  )
);

export default useAuthStore;
