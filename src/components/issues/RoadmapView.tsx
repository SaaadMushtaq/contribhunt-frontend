import { useState } from "react";
import { motion } from "framer-motion";
import { type RankedIssue } from "../../types";
import IssueCard from "./IssueCard";

export interface RoadmapViewProps {
  issues: RankedIssue[];
  onTrack?: (issue: RankedIssue, status: string) => void;
  onViewModeChange?: (mode: "list" | "roadmap") => void;
}

interface Phase {
  id: string;
  name: string;
  description: string;
  color: string;
  minDifficulty: number;
  maxDifficulty: number;
  icon: string;
}

const PHASES: Phase[] = [
  {
    id: "start",
    name: "Start Here",
    description: "Perfect for beginners. Build confidence with easy issues.",
    color: "brand",
    minDifficulty: 0,
    maxDifficulty: 30,
    icon: "🚀",
  },
  {
    id: "levelup",
    name: "Level Up",
    description: "Take on moderate challenges. Expand your skills.",
    color: "blue",
    minDifficulty: 30,
    maxDifficulty: 60,
    icon: "⬆️",
  },
  {
    id: "challenge",
    name: "Challenge",
    description: "Advanced issues. Push yourself to the limit.",
    color: "purple",
    minDifficulty: 60,
    maxDifficulty: 100,
    icon: "⚡",
  },
];

const getPhaseColor = (color: string) => {
  const colors: Record<string, string> = {
    brand: "bg-brand-50 border-brand-200",
    blue: "bg-blue-50 border-blue-200",
    purple: "bg-purple-50 border-purple-200",
  };
  return colors[color] || colors.brand;
};

const getPhaseHeaderColor = (color: string) => {
  const colors: Record<string, string> = {
    brand: "bg-brand-500 text-white",
    blue: "bg-blue-500 text-white",
    purple: "bg-purple-500 text-white",
  };
  return colors[color] || colors.brand;
};

const getTimelineColor = (color: string) => {
  const colors: Record<string, string> = {
    brand: "bg-brand-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
  };
  return colors[color] || colors.brand;
};

export const RoadmapView = ({
  issues,
  onTrack,
  onViewModeChange,
}: RoadmapViewProps) => {
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(
    new Set(["start"]),
  );

  const togglePhase = (phaseId: string) => {
    const newExpanded = new Set(expandedPhases);
    if (newExpanded.has(phaseId)) {
      newExpanded.delete(phaseId);
    } else {
      newExpanded.add(phaseId);
    }
    setExpandedPhases(newExpanded);
  };

  const getIssuesForPhase = (phase: Phase) => {
    return issues.filter(
      (issue) =>
        issue.difficultyScore >= phase.minDifficulty &&
        issue.difficultyScore < phase.maxDifficulty,
    );
  };

  return (
    <div className="space-y-6">
      {onViewModeChange && (
        <div className="flex justify-end">
          <button
            onClick={() => onViewModeChange("list")}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Switch to List View
          </button>
        </div>
      )}

      <div className="space-y-6">
        {PHASES.map((phase) => {
          const phaseIssues = getIssuesForPhase(phase);
          const isExpanded = expandedPhases.has(phase.id);

          return (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              <button
                onClick={() => togglePhase(phase.id)}
                className={`w-full p-4 rounded-lg border-2 ${getPhaseColor(phase.color)} transition-all hover:shadow-md`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-left flex-1">
                    <span className="text-2xl">{phase.icon}</span>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {phase.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {phase.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 ${getPhaseHeaderColor(phase.color)} rounded-full text-sm font-semibold`}
                    >
                      {phaseIssues.length}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-600 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                </div>
              </button>

              {isExpanded && phaseIssues.length > 0 && (
                <div className="relative space-y-4 pl-8">
                  <div
                    className={`absolute left-3 top-0 bottom-0 w-1 ${getTimelineColor(phase.color)} rounded-full`}
                  />

                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                        },
                      },
                    }}
                    className="space-y-4"
                  >
                    {phaseIssues.map((issue, issueIdx) => (
                      <motion.div
                        key={issue.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: issueIdx * 0.05 }}
                        className="relative"
                      >
                        <div
                          className={`absolute -left-12 top-6 w-4 h-4 rounded-full border-4 border-white ${getTimelineColor(phase.color)} shadow-md`}
                        />

                        <IssueCard issue={issue} onTrack={onTrack} />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              )}

              {isExpanded && phaseIssues.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No issues in this phase yet.</p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {issues.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-600">
            No issues to display. Try a different search.
          </p>
        </div>
      )}
    </div>
  );
};

export default RoadmapView;
