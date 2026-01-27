import { axiosInstance } from "@/lib/axios";
import type { User } from "@/types";
import { create } from "zustand";

interface ChatStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;

  fetchUsers: () => Promise<void>;
}

export const useChatStore = create<ChatStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get("/users");
      set({ user: response.data.user });
    } catch (error: any) {
      console.error("Failed to fetch users:", error);
      set({
        error:
          error.response?.data?.message ||
          "An error occurred while fetching users.",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
