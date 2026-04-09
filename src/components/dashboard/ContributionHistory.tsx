import { useState } from "react";
import { ExternalLink, ChevronDown } from "lucide-react";
import { type ContributionHistory as ContributionHistoryType } from "../../types";

export interface ContributionHistoryProps {
  history: ContributionHistoryType[];
  onStatusUpdate: (id: string, status: string) => void;
}

type FilterStatus =
  | "all"
  | "interested"
  | "in-progress"
  | "completed"
  | "abandoned";

const STATUS_COLORS: Record<string, string> = {
  interested: "bg-gray-100 text-gray-800",
  "in-progress": "bg-blue-100 text-blue-800",
  completed: "bg-brand-100 text-brand-800",
  abandoned: "bg-red-100 text-red-800",
};

const STATUS_LABELS: Record<string, string> = {
  interested: "👀 Interested",
  "in-progress": "🚀 In Progress",
  completed: "✅ Completed",
  abandoned: "❌ Abandoned",
};

export const ContributionHistory = ({
  history,
  onStatusUpdate,
}: ContributionHistoryProps) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterStatus>("all");
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const filteredHistory =
    selectedFilter === "all"
      ? history
      : history.filter((item) => item.status === selectedFilter);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (history.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-gray-600 mb-2">No contribution history yet.</p>
        <p className="text-sm text-gray-500">
          Start tracking issues to see them here!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {(
          [
            "all",
            "interested",
            "in-progress",
            "completed",
            "abandoned",
          ] as const
        ).map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-colors ${
              selectedFilter === filter
                ? "bg-brand-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {filter === "all"
              ? "All"
              : filter === "in-progress"
                ? "In Progress"
                : filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredHistory.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-600">No issues with this status.</p>
          </div>
        ) : (
          filteredHistory.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <a
                    href={item.issue_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-900 font-semibold hover:text-brand-600 transition-colors mb-2"
                  >
                    {item.issue_title}
                    <ExternalLink size={14} />
                  </a>

                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2 flex-wrap">
                    <a
                      href={item.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-brand-600 transition-colors"
                    >
                      {item.repo_name}
                    </a>
                    {item.language && (
                      <>
                        <span>•</span>
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                          {item.language}
                        </span>
                      </>
                    )}
                  </div>

                  <p className="text-xs text-gray-500">
                    Tracked {formatDate(item.created_at)}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${STATUS_COLORS[item.status]}`}
                  >
                    {STATUS_LABELS[item.status]}
                  </span>

                  <div className="relative">
                    <button
                      onClick={() =>
                        setDropdownOpen(
                          dropdownOpen === item.id ? null : item.id,
                        )
                      }
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Change status"
                    >
                      <ChevronDown size={18} className="text-gray-600" />
                    </button>

                    {dropdownOpen === item.id && (
                      <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10">
                        {(
                          [
                            "interested",
                            "in-progress",
                            "completed",
                            "abandoned",
                          ] as const
                        ).map((status) => (
                          <button
                            key={status}
                            onClick={() => {
                              onStatusUpdate(item.id, status);
                              setDropdownOpen(null);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-sm"
                          >
                            {STATUS_LABELS[status]}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {history.length > 0 && (
        <div className="text-xs text-gray-600 pt-4 border-t border-gray-200">
          Total: {history.length} issues tracked | Completed:{" "}
          {history.filter((h) => h.status === "completed").length}
        </div>
      )}
    </div>
  );
};

export default ContributionHistory;
