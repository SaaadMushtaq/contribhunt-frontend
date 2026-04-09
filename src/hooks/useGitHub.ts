import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAppStore } from "../store/useAppStore";
import * as api from "../utils/api";

export const useGitHub = () => {
  const [isDetecting, setIsDetecting] = useState(false);
  const { user, setUser } = useAppStore();

  const detectSkills = async () => {
    try {
      setIsDetecting(true);
      const response = await api.github.detectSkills();

      if (response.success && response.data?.skills) {
        const detectedSkills = response.data.skills;
        const skillCount = detectedSkills.length;

        if (user) {
          setUser({
            ...user,
            skills: detectedSkills,
          });
        }

        toast.success(
          `Detected ${skillCount} skill${skillCount !== 1 ? "s" : ""} from your GitHub profile`,
        );
      } else {
        toast.error(response.error || "Failed to detect skills");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to detect skills";
      toast.error(errorMessage);
    } finally {
      setIsDetecting(false);
    }
  };

  return {
    isDetecting,
    detectSkills,
  };
};
