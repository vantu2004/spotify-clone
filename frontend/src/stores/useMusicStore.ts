import { axiosInstance } from "@/lib/axios";
import type { Album } from "@/types";
import { create } from "zustand";

interface MusicStore {
  albums: Album[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;

  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,

  fetchAlbums: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get("/albums");

      set({ albums: response.data.albums });
    } catch (error: any) {
      console.error("Failed to fetch albums:", error);
      set({
        error:
          error.response?.data?.message ||
          "An error occurred while fetching albums.",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAlbumById: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get(`/albums/${id}`);

      set({ currentAlbum: response.data.album });
    } catch (error: any) {
      console.error("Failed to fetch album by ID:", error);
      set({
        error:
          error.response?.data?.message ||
          "An error occurred while fetching album.",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
