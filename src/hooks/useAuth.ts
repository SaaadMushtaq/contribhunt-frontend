import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import * as api from "../utils/api";

export const useAuth = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, clearUser, initializeAuth } =
    useAppStore();

  const login = async () => {
    try {
      const response = await api.auth.getGitHubUrl();
      if (response.data?.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Failed to get GitHub login URL:", error);
    }
  };

  const logout = async () => {
    try {
      await api.auth.logout();
      clearUser();
      localStorage.removeItem("contribhunt_token");
      navigate("/");
    } catch (error) {
      console.error("Failed to logout:", error);
      clearUser();
      localStorage.removeItem("contribhunt_token");
      navigate("/");
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    initializeAuth,
  };
};
