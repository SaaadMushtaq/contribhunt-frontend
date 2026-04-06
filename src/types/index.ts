// Experience levels for contributors
export type ExperienceLevel = "junior" | "mid" | "senior";

// User interface
export interface User {
  id: string;
  github_id: string;
  username: string;
  avatar_url: string;
  email: string;
  skills: string[];
  experience_level: ExperienceLevel;
  created_at: string;
}

// GitHub API types
export interface GitHubLabel {
  id: number;
  name: string;
  description: string | null;
  color: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
}

export interface GitHubIssue {
  id: number;
  title: string;
  description: string;
  url: string;
  state: "open" | "closed";
  labels: GitHubLabel[];
  repository: GitHubRepository;
  created_at: string;
  updated_at: string;
  author: {
    login: string;
    avatar_url: string;
  };
}

// Ranked issue with scoring metrics
export interface RankedIssue extends GitHubIssue {
  mergeabilityScore: number;
  difficultyScore: number;
  matchScore: number;
  estimatedTime: string;
  reasonsToApply: string[];
  reasonsToAvoid: string[];
}

// Search parameters
export interface SearchParams {
  skills: string[];
  experienceLevel: ExperienceLevel;
  languages: string[];
  labels: string[];
  minStars: number;
  maxStars: number;
}

// Saved search
export interface SavedSearch {
  id: string;
  user_id: string;
  name: string;
  params: SearchParams;
  created_at: string;
}

// Contribution history
export interface ContributionHistory {
  id: string;
  user_id: string;
  issue_title: string;
  issue_url: string;
  repo_name: string;
  repo_url: string;
  language: string;
  status: "interested" | "in-progress" | "completed" | "abandoned";
  created_at: string;
  updated_at: string;
}

// Dashboard data
export interface DashboardData {
  savedSearches: SavedSearch[];
  contributionHistory: ContributionHistory[];
  skills: string[];
  stats: {
    total: number;
    completed: number;
    inProgress: number;
    abandoned: number;
  };
}

// Generic API response
export interface ApiResponse<T> {
  data: T;
  error: string | null;
  success: boolean;
}
