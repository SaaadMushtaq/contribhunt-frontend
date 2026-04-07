import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { LayoutList, Map, Search as SearchIcon } from "lucide-react";
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
  const [hasSearched, setHasSearched] = useState(false);
  const hasAutoSearched = useRef(false);

  useEffect(() => {
    if (searchParams.skills.length > 0 && !hasAutoSearched.current) {
      hasAutoSearched.current = true;
      search(searchParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mark as searched as soon as a search begins
  useEffect(() => {
    if (isSearching) setHasSearched(true);
  }, [isSearching]);

  const handleTrackIssue = async (issue: RankedIssue, status: string) => {
    await trackIssue(issue, status);
  };

  const showResults = hasSearched || isSearching;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <SearchForm />
            </div>
          </div>

          {/* Results panel */}
          <div className="lg:col-span-2 space-y-4">
            {/* View mode toggle — only when results exist */}
            {showResults && searchResults.length > 0 && (
              <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 w-fit shadow-sm">
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === "list"
                      ? "bg-brand-500 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                  title="List view"
                >
                  <LayoutList size={15} />
                  List
                </button>
                <button
                  onClick={() => setViewMode("roadmap")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === "roadmap"
                      ? "bg-brand-500 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                  title="Roadmap view"
                >
                  <Map size={15} />
                  Roadmap
                </button>
              </div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {showResults ? (
                viewMode === "list" ? (
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
                )
              ) : (
                /* Only shown before the very first search */
                <div className="bg-white border border-gray-200 rounded-xl p-14 text-center shadow-sm">
                  <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
                    <SearchIcon size={30} className="text-brand-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Ready to find issues?
                  </h3>
                  <p className="text-gray-500 max-w-xs mx-auto leading-relaxed">
                    Pick your skills on the left and hit{" "}
                    <span className="font-semibold text-gray-700">
                      "Find Issues"
                    </span>{" "}
                    to get matched results.
                  </p>
                  <div className="mt-8 flex items-center justify-center gap-6 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-brand-400 inline-block" />
                      Smart matching
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-accent-400 inline-block" />
                      Skill-based filters
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-gray-300 inline-block" />
                      100% free
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
