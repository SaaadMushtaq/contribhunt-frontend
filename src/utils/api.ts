import axios, { AxiosError } from "axios";
import {
  type SearchParams,
  type ExperienceLevel,
  type ApiResponse,
} from "../types";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("contribhunt_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("contribhunt_token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);

export const auth = {
  getGitHubUrl: async () => {
    const response = await apiClient.get<ApiResponse<{ url: string }>>(
      "/api/auth/github/url",
    );
    return response.data;
  },

  getMe: async () => {
    const response =
      await apiClient.get<ApiResponse<{ user: unknown }>>("/api/auth/me");
    return response.data;
  },

  logout: async () => {
    const response =
      await apiClient.post<ApiResponse<null>>("/api/auth/logout");
    return response.data;
  },
};

export const issues = {
  searchIssues: async (params: SearchParams) => {
    const response = await apiClient.post<ApiResponse<{ issues: unknown[] }>>(
      "/api/issues/search",
      params,
    );
    return response.data;
  },

  saveSearch: async (name: string, params: SearchParams) => {
    const response = await apiClient.post<ApiResponse<{ id: string }>>(
      "/api/issues/save-search",
      {
        name,
        params,
      },
    );
    return response.data;
  },

  deleteSearch: async (id: string) => {
    const response = await apiClient.delete<ApiResponse<null>>(
      `/api/issues/save-search/${id}`,
    );
    return response.data;
  },

  trackIssue: async (data: unknown) => {
    const response = await apiClient.post<ApiResponse<{ id: string }>>(
      "/api/issues/track",
      data,
    );
    return response.data;
  },

  updateIssueStatus: async (id: string, status: string) => {
    const response = await apiClient.put<ApiResponse<null>>(
      `/api/issues/track/${id}`,
      { status },
    );
    return response.data;
  },
};

export const user = {
  getDashboard: async () => {
    const response = await apiClient.get<ApiResponse<{ dashboard: unknown }>>(
      "/api/user/dashboard",
    );
    return response.data;
  },

  updateSkills: async (skills: string[]) => {
    const response = await apiClient.put<ApiResponse<null>>(
      "/api/user/skills",
      { skills },
    );
    return response.data;
  },

  updateExperience: async (level: ExperienceLevel) => {
    const response = await apiClient.put<ApiResponse<null>>(
      "/api/user/experience",
      {
        experience_level: level,
      },
    );
    return response.data;
  },
};

export const github = {
  detectSkills: async () => {
    const response = await apiClient.post<ApiResponse<{ skills: string[] }>>(
      "/api/github/detect-skills",
    );
    return response.data;
  },
};

export default apiClient;
