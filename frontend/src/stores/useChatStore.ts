import { axiosInstance } from "@/lib/axios";
import type { User } from "@/types";
import { create } from "zustand";

interface ChatStore {
  users: User[];
  isLoading: boolean;
  error: string | null;

  fetchUsers: () => Promise<void>;
}

export const useChatStore = create<ChatStore>((set) => ({
  users: [],
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get("/users");
      set({ users: response.data.users });
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
