import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { LayoutList, Map } from "lucide-react";
import { useSearch } from "../hooks/useSearch";
import { useAuth } from "../hooks/useAuth";
import type { RankedIssue } from "../types";
import SearchForm from "../components/search/SearchForm";
import IssueList from "../components/issues/IssueList";
import RoadmapView from "../components/issues/RoadmapView";

type ViewMode = "list" | "roadmap";

export const Search = () => {
  const { searchResults, isSearching, searchParams, search, trackIssue } =
    useSearch();
  const { isAuthenticated } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const hasAutoSearched = useRef(false);

  useEffect(() => {
    if (searchParams.skills.length > 0 && !hasAutoSearched.current) {
      hasAutoSearched.current = true;
      search(searchParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTrackIssue = async (issue: RankedIssue, status: string) => {
    await trackIssue(issue, status);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <SearchForm />
            </div>
          </div>

          <div className="lg:col-span-2">
            {searchResults.length > 0 && (
              <div className="mb-6 flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-2 w-fit">
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex items-center gap-2 px-4 py-2 rounded transition-all font-medium ${
                    viewMode === "list"
                      ? "bg-green-100 text-green-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  title="List view"
                >
                  <LayoutList size={18} />
                  <span className="hidden sm:inline">List</span>
                </button>

                <button
                  onClick={() => setViewMode("roadmap")}
                  className={`flex items-center gap-2 px-4 py-2 rounded transition-all font-medium ${
                    viewMode === "roadmap"
                      ? "bg-green-100 text-green-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  title="Roadmap view"
                >
                  <Map size={18} />
                  <span className="hidden sm:inline">Roadmap</span>
                </button>
              </div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {viewMode === "list" ? (
                <IssueList
                  issues={searchResults}
                  isLoading={isSearching}
                  onTrack={isAuthenticated ? handleTrackIssue : undefined}
                />
              ) : (
                <RoadmapView
                  issues={searchResults}
                  onTrack={isAuthenticated ? handleTrackIssue : undefined}
                  onViewModeChange={setViewMode}
                />
              )}
            </motion.div>

            {!hasAutoSearched.current &&
              searchResults.length === 0 &&
              !isSearching && (
                <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Ready to find issues?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Select your skills in the form on the left and click "Find
                    Issues" to get started.
                  </p>
                  <p className="text-sm text-gray-500">
                    We'll match you with issues that fit your experience level
                    and interests.
                  </p>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
