import { useState } from "react";
import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { type RankedIssue } from "../../types";
import IssueCard from "./IssueCard";
import SkeletonCard from "./SkeletonCard";

export interface IssueListProps {
  issues: RankedIssue[];
  isLoading: boolean;
  onTrack?: (issue: RankedIssue, status: string) => void;
}

type SortOption = "match" | "merge" | "difficulty" | "date";

const ITEMS_PER_PAGE = 20;

export const IssueList = ({ issues, isLoading, onTrack }: IssueListProps) => {
  const [sortBy, setSortBy] = useState<SortOption>("match");
  const [currentPage, setCurrentPage] = useState(1);

  const sortedIssues = [...issues].sort((a, b) => {
    switch (sortBy) {
      case "match":
        return b.matchScore - a.matchScore;
      case "merge":
        return b.mergeabilityScore - a.mergeabilityScore;
      case "difficulty":
        return a.difficultyScore - b.difficultyScore; // Easier first
      case "date":
        return (
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedIssues.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedIssues = sortedIssues.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (issues.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-14 text-center shadow-sm">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <SearchX size={30} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No issues found
        </h3>
        <p className="text-gray-500 max-w-xs mx-auto">
          Try adjusting your skills, experience level, or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <p className="text-lg font-semibold text-gray-900">
          Found <span className="text-brand-600">{sortedIssues.length}</span>{" "}
          matching issues
        </p>

        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value as SortOption);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-medium bg-white"
        >
          <option value="match">Sort by Match Score</option>
          <option value="merge">Sort by Merge Chance</option>
          <option value="difficulty">Sort by Difficulty (Easier First)</option>
          <option value="date">Sort by Date (Newest First)</option>
        </select>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="space-y-4"
      >
        {paginatedIssues.map((issue, idx) => (
          <motion.div
            key={issue.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <IssueCard issue={issue} onTrack={onTrack} />
          </motion.div>
        ))}
      </motion.div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 py-4">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Previous
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                  currentPage === page
                    ? "bg-brand-500 text-white"
                    : "border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default IssueList;
