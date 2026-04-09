export type ExperienceLevel = "junior" | "mid" | "senior";

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

export interface RankedIssue extends GitHubIssue {
  mergeabilityScore: number;
  difficultyScore: number;
  matchScore: number;
  estimatedTime: string;
  reasonsToApply: string[];
  reasonsToAvoid: string[];
}

export interface SearchParams {
  skills: string[];
  experienceLevel: ExperienceLevel;
  languages: string[];
  labels: string[];
  minStars: number;
  maxStars: number;
}

export interface SavedSearch {
  id: string;
  user_id: string;
  name: string;
  params: SearchParams;
  created_at: string;
}

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

export interface ApiResponse<T> {
  data: T;
  error: string | null;
  success: boolean;
}
