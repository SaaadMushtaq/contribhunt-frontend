import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, CheckCircle, Clock, Bookmark } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useGitHub } from "../hooks/useGitHub";
import { useAppStore } from "../store/useAppStore";
import { user as userApi, issues as issuesApi } from "../utils/api";
import type { DashboardData, SearchParams } from "../types";
import StatsCard from "../components/dashboard/StatsCard";
import SkillsPanel from "../components/dashboard/SkillsPanel";
import SavedSearches from "../components/dashboard/SavedSearches";
import ContributionHistory from "../components/dashboard/ContributionHistory";
import LoadingState from "../components/shared/LoadingState";
import ErrorState from "../components/shared/ErrorState";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { isDetecting, detectSkills } = useGitHub();
  const { setSearchParams } = useAppStore();

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Fetch dashboard data
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchDashboard = async () => {
      try {
        setIsFetching(true);
        const response = await userApi.getDashboard();
        if (response.success && response.data) {
          setDashboard(response.data as unknown as DashboardData);
        } else {
          setError(response.error || "Failed to load dashboard");
        }
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchDashboard();
  }, [isAuthenticated]);

  const handleUpdateSkills = async (skills: string[]) => {
    await userApi.updateSkills(skills);
    if (dashboard) {
      setDashboard({ ...dashboard, skills });
    }
  };

  const handleLoadSearch = (params: SearchParams) => {
    setSearchParams(params);
    navigate("/search");
  };

  const handleDeleteSearch = async (id: string) => {
    await issuesApi.deleteSearch(id);
    if (dashboard) {
      setDashboard({
        ...dashboard,
        savedSearches: dashboard.savedSearches.filter((s) => s.id !== id),
      });
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    await issuesApi.updateIssueStatus(id, status);
    if (dashboard) {
      setDashboard({
        ...dashboard,
        contributionHistory: dashboard.contributionHistory.map((item) =>
          item.id === id
            ? {
                ...item,
                status: status as
                  | "interested"
                  | "in-progress"
                  | "completed"
                  | "abandoned",
              }
            : item,
        ),
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  if (authLoading || isFetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingState message="Loading your dashboard..." size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ErrorState
          message={error}
          onRetry={() => {
            setError(null);
            setIsFetching(true);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome header */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 flex items-center gap-6">
          {user?.avatar_url && (
            <img
              src={user.avatar_url}
              alt={user.username}
              className="w-20 h-20 rounded-full object-cover border-4 border-green-100"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back,{" "}
              <span className="text-green-600">{user?.username}</span>!
            </h1>
            {user?.created_at && (
              <p className="text-gray-500 text-sm mt-1">
                Member since {formatDate(user.created_at)}
              </p>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            label="Issues Tracked"
            value={dashboard?.stats.total ?? 0}
            icon={BookOpen}
            color="blue"
          />
          <StatsCard
            label="In Progress"
            value={dashboard?.stats.inProgress ?? 0}
            icon={Clock}
            color="orange"
          />
          <StatsCard
            label="Completed"
            value={dashboard?.stats.completed ?? 0}
            icon={CheckCircle}
            color="green"
          />
          <StatsCard
            label="Saved Searches"
            value={dashboard?.savedSearches.length ?? 0}
            icon={Bookmark}
            color="purple"
          />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column */}
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Skills
              </h2>
              <SkillsPanel
                skills={dashboard?.skills ?? []}
                onUpdate={handleUpdateSkills}
                onDetect={detectSkills}
                isDetecting={isDetecting}
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Saved Searches
              </h2>
              <SavedSearches
                searches={dashboard?.savedSearches ?? []}
                onLoad={handleLoadSearch}
                onDelete={handleDeleteSearch}
              />
            </div>
          </div>

          {/* Right column */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Contribution History
            </h2>
            <ContributionHistory
              history={dashboard?.contributionHistory ?? []}
              onStatusUpdate={handleStatusUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
