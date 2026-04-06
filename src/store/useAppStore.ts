import { create } from "zustand";
import {
  type User,
  type SearchParams,
  type RankedIssue,
  type DashboardData,
  type ExperienceLevel,
} from "../types";
import * as api from "../utils/api";

const defaultSearchParams: SearchParams = {
  skills: [],
  experienceLevel: "junior" as ExperienceLevel,
  languages: [],
  labels: [],
  minStars: 0,
  maxStars: 100000,
};

interface AppStoreState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  searchResults: RankedIssue[];
  isSearching: boolean;
  searchParams: SearchParams;
  dashboard: DashboardData | null;
  error: string | null;

  setUser: (user: User | null) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
  setSearchResults: (results: RankedIssue[]) => void;
  setIsSearching: (searching: boolean) => void;
  setSearchParams: (params: Partial<SearchParams>) => void;
  setDashboard: (data: DashboardData) => void;
  setError: (error: string | null) => void;
  initializeAuth: () => Promise<void>;
}

export const useAppStore = create<AppStoreState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  searchResults: [],
  isSearching: false,
  searchParams: defaultSearchParams,
  dashboard: null,
  error: null,

  setUser: (user) => {
    set({
      user,
      isAuthenticated: !!user,
    });
  },

  clearUser: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  setSearchResults: (results) => {
    set({ searchResults: results });
  },

  setIsSearching: (searching) => {
    set({ isSearching: searching });
  },

  setSearchParams: (params) => {
    set((state) => ({
      searchParams: {
        ...state.searchParams,
        ...params,
      },
    }));
  },

  setDashboard: (data) => {
    set({ dashboard: data });
  },

  setError: (error) => {
    set({ error });
  },

  initializeAuth: async () => {
    try {
      set({ isLoading: true });
      const token = localStorage.getItem("contribhunt_token");

      if (!token) {
        set({ isLoading: false });
        return;
      }

      const response = await api.auth.getMe();
      if (response.success && response.data) {
        set({
          user: response.data as unknown as User,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        localStorage.removeItem("contribhunt_token");
        set({ isLoading: false });
      }
    } catch (error) {
      console.error("Auth initialization error:", error);
      localStorage.removeItem("contribhunt_token");
      set({ isLoading: false });
    }
  },
}));

export default useAppStore;
