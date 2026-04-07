import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ExternalLink, ChevronDown } from "lucide-react";
import { type RankedIssue } from "../../types";

export interface IssueCardProps {
  issue: RankedIssue;
  onTrack?: (issue: RankedIssue, status: string) => void;
}

const LANGUAGE_COLORS: Record<string, string> = {
  javascript: "bg-yellow-100 text-yellow-800",
  typescript: "bg-blue-100 text-blue-800",
  python: "bg-brand-100 text-brand-800",
  java: "bg-red-100 text-red-800",
  cpp: "bg-purple-100 text-purple-800",
  csharp: "bg-purple-100 text-purple-800",
  go: "bg-cyan-100 text-cyan-800",
  rust: "bg-orange-100 text-orange-800",
  ruby: "bg-red-100 text-red-800",
  php: "bg-indigo-100 text-indigo-800",
};

export const IssueCard = ({ issue, onTrack }: IssueCardProps) => {
  const [isReasonsOpen, setIsReasonsOpen] = useState(false);
  const [isTrackMenuOpen, setIsTrackMenuOpen] = useState(false);

  const getDifficultyColor = (score: number) => {
    if (score < 30) return "text-brand-600";
    if (score < 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getLanguageColor = (language: string | null) => {
    if (!language) return "bg-gray-100 text-gray-800";
    return (
      LANGUAGE_COLORS[language.toLowerCase()] || "bg-gray-100 text-gray-800"
    );
  };

  const handleTrack = (status: string) => {
    if (onTrack) {
      onTrack(issue, status);
    }
    setIsTrackMenuOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Header row - Repo and stars */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900">
            {issue.repository.name}
          </span>
          {issue.repository.language && (
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${getLanguageColor(issue.repository.language)}`}
            >
              {issue.repository.language}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-gray-600 text-sm">
          <Star size={16} className="text-yellow-400 fill-yellow-400" />
          {issue.repository.stargazers_count}
        </div>
      </div>

      {/* Title - linked */}
      <a
        href={issue.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-lg font-semibold text-gray-900 hover:text-brand-600 transition-colors mb-3 line-clamp-2"
      >
        {issue.title}
      </a>

      {/* Labels */}
      {issue.labels.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {issue.labels.slice(0, 3).map((label) => (
            <span
              key={label.id}
              className="px-2 py-1 rounded text-xs font-medium text-white"
              style={{ backgroundColor: `#${label.color}` }}
            >
              {label.name}
            </span>
          ))}
          {issue.labels.length > 3 && (
            <span className="px-2 py-1 text-xs text-gray-600">
              +{issue.labels.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Scores grid */}
      <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-y border-gray-200">
        {/* Match Score */}
        <div className="flex flex-col items-center">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg
              className="absolute inset-0 w-12 h-12 transform -rotate-90"
              viewBox="0 0 50 50"
            >
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="3"
              />
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="#eb6538"
                strokeWidth="3"
                strokeDasharray={`${(issue.matchScore / 100) * 126} 126`}
              />
            </svg>
            <span className="text-sm font-bold text-gray-900">
              {Math.round(issue.matchScore)}%
            </span>
          </div>
          <p className="text-xs text-gray-600 mt-1 font-medium">Match</p>
        </div>

        {/* Merge Chance */}
        <div className="flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-blue-600">
            {Math.round(issue.mergeabilityScore)}%
          </div>
          <p className="text-xs text-gray-600 font-medium">Merge</p>
        </div>

        {/* Difficulty */}
        <div className="flex flex-col items-center justify-center">
          <div
            className={`text-2xl font-bold ${getDifficultyColor(issue.difficultyScore)}`}
          >
            {Math.round(issue.difficultyScore)}%
          </div>
          <p className="text-xs text-gray-600 font-medium">Difficulty</p>
        </div>
      </div>

      {/* Estimated time */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
          ⏱ {issue.estimatedTime}
        </span>
      </div>

      {/* Reasons section */}
      <button
        onClick={() => setIsReasonsOpen(!isReasonsOpen)}
        className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded transition-colors mb-4"
      >
        <span className="font-medium text-gray-900">Why this issue?</span>
        <ChevronDown
          size={18}
          className={`transition-transform text-gray-600 ${isReasonsOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isReasonsOpen && (
        <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
          {/* Reasons to apply */}
          {issue.reasonsToApply.length > 0 && (
            <div>
              <p className="text-sm font-medium text-brand-700 mb-1">
                ✅ Reasons to Apply:
              </p>
              <ul className="text-sm text-gray-700 space-y-1 list-none">
                {issue.reasonsToApply.map((reason, idx) => (
                  <li key={idx} className="pl-2">
                    • {reason}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Reasons to avoid */}
          {issue.reasonsToAvoid.length > 0 && (
            <div>
              <p className="text-sm font-medium text-amber-700 mb-1">
                ⚠️ Reasons to Avoid:
              </p>
              <ul className="text-sm text-gray-700 space-y-1 list-none">
                {issue.reasonsToAvoid.map((reason, idx) => (
                  <li key={idx} className="pl-2">
                    • {reason}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Footer actions */}
      <div className="flex items-center gap-2">
        <a
          href={issue.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg transition-colors font-medium"
        >
          <ExternalLink size={16} />
          View Issue
        </a>

        {onTrack && (
          <div className="relative">
            <button
              onClick={() => setIsTrackMenuOpen(!isTrackMenuOpen)}
              className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors font-medium flex items-center gap-1"
            >
              Track
              <ChevronDown size={16} />
            </button>

            {isTrackMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10">
                <button
                  onClick={() => handleTrack("interested")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-sm"
                >
                  👀 Interested
                </button>
                <button
                  onClick={() => handleTrack("in-progress")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-sm"
                >
                  🚀 In Progress
                </button>
                <button
                  onClick={() => handleTrack("completed")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-sm"
                >
                  ✅ Completed
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default IssueCard;
