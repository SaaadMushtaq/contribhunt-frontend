import { Trash2, Play } from "lucide-react";
import { type SavedSearch, type SearchParams } from "../../types";

export interface SavedSearchesProps {
  searches: SavedSearch[];
  onLoad: (params: SearchParams) => void;
  onDelete: (id: string) => void;
}

export const SavedSearches = ({
  searches,
  onLoad,
  onDelete,
}: SavedSearchesProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (searches.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-gray-600 mb-2">No saved searches yet.</p>
        <p className="text-sm text-gray-500">
          Save your first search to find matching issues faster!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {searches.map((search) => (
        <div
          key={search.id}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {/* Search name */}
              <h3 className="font-semibold text-gray-900 mb-2 truncate">
                {search.name}
              </h3>

              {/* Skills badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                {search.params.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
                {search.params.skills.length > 3 && (
                  <span className="inline-block px-2 py-1 text-gray-600 text-xs font-medium">
                    +{search.params.skills.length - 3}
                  </span>
                )}
              </div>

              {/* Experience level and date */}
              <div className="flex items-center gap-2 flex-wrap text-xs text-gray-600">
                <span className="px-2 py-1 bg-gray-100 rounded capitalize">
                  {search.params.experienceLevel}
                </span>
                <span>•</span>
                <span>Saved {formatDate(search.created_at)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onLoad(search.params)}
                className="p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors"
                title="Load this search"
              >
                <Play size={16} />
              </button>
              <button
                onClick={() => onDelete(search.id)}
                className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                title="Delete this search"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedSearches;
