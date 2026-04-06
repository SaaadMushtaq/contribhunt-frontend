import { toast } from "react-hot-toast";
import { useAppStore } from "../store/useAppStore";
import * as api from "../utils/api";
import { type SearchParams, type RankedIssue } from "../types";

export const useSearch = () => {
  const {
    searchResults,
    isSearching,
    searchParams,
    setSearchResults,
    setIsSearching,
    setSearchParams,
    setError,
  } = useAppStore();

  const search = async (params: SearchParams) => {
    try {
      setIsSearching(true);
      const response = await api.issues.searchIssues(params);

      if (response.success && response.data) {
        setSearchResults(response.data as unknown as RankedIssue[]);
      } else {
        setError(response.error || "Failed to search issues");
        toast.error(response.error || "Failed to search issues");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred while searching";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSearching(false);
    }
  };

  const updateParams = (params: Partial<SearchParams>) => {
    setSearchParams(params);
  };

  const saveCurrentSearch = async (name: string) => {
    try {
      const response = await api.issues.saveSearch(name, searchParams);

      if (response.success) {
        toast.success(`Search "${name}" saved successfully`);
      } else {
        toast.error(response.error || "Failed to save search");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to save search";
      toast.error(errorMessage);
    }
  };

  const trackIssue = async (issue: RankedIssue, status: string) => {
    try {
      const data = {
        issue_id: issue.id,
        issue_title: issue.title,
        issue_url: issue.url,
        repo_name: issue.repository.name,
        repo_url: issue.repository.url,
        language: issue.repository.language,
        status,
      };

      const response = await api.issues.trackIssue(data);

      if (response.success) {
        toast.success(`Issue tracked with status: ${status}`);
      } else {
        toast.error(response.error || "Failed to track issue");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to track issue";
      toast.error(errorMessage);
    }
  };

  return {
    searchResults,
    isSearching,
    searchParams,
    search,
    updateParams,
    saveCurrentSearch,
    trackIssue,
  };
};
