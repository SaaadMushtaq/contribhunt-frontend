import { Link } from "react-router-dom";
import { Printer, Search } from "lucide-react";
import { useSearch } from "../hooks/useSearch";
import { useAuth } from "../hooks/useAuth";
import RoadmapView from "../components/issues/RoadmapView";

export const Roadmap = () => {
  const { searchResults, trackIssue } = useSearch();
  const { isAuthenticated } = useAuth();

  const handlePrint = () => {
    window.print();
  };

  if (searchResults.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center max-w-md w-full">
          <div className="text-6xl mb-4">🗺️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No Results to Show
          </h2>
          <p className="text-gray-600 mb-8">
            Search for issues first to generate your personalized contribution
            roadmap.
          </p>
          <Link
            to="/search"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-brand-500 to-accent-500 hover:from-brand-600 hover:to-accent-600 text-white font-semibold rounded-lg transition-all"
          >
            <Search size={18} />
            Go to Search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 print:bg-white print:py-4">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 print:hidden">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Contribution Roadmap
            </h1>
            <p className="text-gray-600 mt-1">
              {searchResults.length} issue
              {searchResults.length !== 1 ? "s" : ""} organized by difficulty
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/search"
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              ← Back to Search
            </Link>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors font-medium text-sm"
            >
              <Printer size={16} />
              Print / Export
            </button>
          </div>
        </div>

        {/* Print header (only visible when printing) */}
        <div className="hidden print:block mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            ContribHunt — Contribution Roadmap
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            {searchResults.length} matched issues · Generated{" "}
            {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Roadmap view */}
        <RoadmapView
          issues={searchResults}
          onTrack={isAuthenticated ? trackIssue : undefined}
        />
      </div>
    </div>
  );
};

export default Roadmap;
