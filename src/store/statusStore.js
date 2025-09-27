import { create } from "zustand";

// Định nghĩa trạng thái và các hành động (actions)
const useStatusStore = create((set) => ({
  isLoading: false,

  setLoading: (status) =>
    set({
      isLoading: status,
    }),
}));

export default useStatusStore;
