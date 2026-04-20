import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface AuthStore {
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;

  checkAdminStatus: () => Promise<void>;
  reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAdmin: false,
  isLoading: false,
  error: null,

  checkAdminStatus: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get("/admin/check");
      set({ isAdmin: response.data.isAdmin });
    } catch (error: any) {
      console.error("Failed to check admin status:", error);
      set({ error: error.response?.data?.message || "An error occurred." });
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => set({ isAdmin: false, isLoading: false, error: null }),
}));
