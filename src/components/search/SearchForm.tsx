import { useState } from "react";
import { ChevronDown, Zap, Info, Link2 } from "lucide-react";
import { useSearch } from "../../hooks/useSearch";
import { useAuth } from "../../hooks/useAuth";
import { useGitHub } from "../../hooks/useGitHub";
import { type SearchParams } from "../../types";
import SkillSelector from "./SkillSelector";
import ExperienceDropdown from "./ExperienceDropdown";

const LABEL_OPTIONS = ["good first issue", "help wanted", "beginner friendly"];

export const SearchForm = () => {
  const { searchParams, isSearching, search, updateParams } = useSearch();
  const { isAuthenticated } = useAuth();
  const { isDetecting, detectSkills } = useGitHub();

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [languageInput, setLanguageInput] = useState("");
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const handleAddLanguage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && languageInput.trim()) {
      const newLanguages = [...searchParams.languages, languageInput.trim()];
      updateParams({ languages: newLanguages });
      setLanguageInput("");
    }
  };

  const removeLanguage = (lang: string) => {
    updateParams({
      languages: searchParams.languages.filter((l) => l !== lang),
    });
  };

  const toggleLabel = (label: string) => {
    const newLabels = selectedLabels.includes(label)
      ? selectedLabels.filter((l) => l !== label)
      : [...selectedLabels, label];
    setSelectedLabels(newLabels);
    updateParams({ labels: newLabels });
  };

  const handleSearch = async () => {
    const params: SearchParams = {
      ...searchParams,
      labels: selectedLabels,
    };
    await search(params);
  };

  const isSearchDisabled = searchParams.skills.length === 0 || isSearching;

  return (
    <div className="space-y-6">
      {!isAuthenticated && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <Info size={15} className="text-blue-500 mt-0.5 shrink-0" />
          <p className="text-sm text-blue-800 leading-relaxed">
            Login with GitHub to auto-detect your skills and save your searches
            for later.
          </p>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Your Skills</h3>
            {isAuthenticated && (
              <button
                onClick={detectSkills}
                disabled={isDetecting}
                className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors disabled:opacity-50 font-medium"
              >
                <Link2 size={13} />
                {isDetecting ? "Detecting..." : "Auto-detect from GitHub"}
              </button>
            )}
          </div>
          <SkillSelector
            selectedSkills={searchParams.skills}
            onChange={(skills) => updateParams({ skills })}
          />
        </div>

        <hr className="border-gray-200" />

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">
            Experience Level
          </h3>
          <ExperienceDropdown
            value={searchParams.experienceLevel}
            onChange={(level) => updateParams({ experienceLevel: level })}
          />
        </div>

        <hr className="border-gray-200" />

        <div className="space-y-3">
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="flex items-center gap-2 text-lg font-semibold text-gray-900 hover:text-gray-600 transition-colors"
          >
            Filters (Optional)
            <ChevronDown
              size={20}
              className={`transition-transform ${isFiltersOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isFiltersOpen && (
            <div className="space-y-4 mt-4 pt-4 border-t border-gray-200">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Languages
                </label>
                <input
                  type="text"
                  placeholder="Type and press Enter..."
                  value={languageInput}
                  onChange={(e) => setLanguageInput(e.target.value)}
                  onKeyDown={handleAddLanguage}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                />
                {searchParams.languages.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {searchParams.languages.map((lang) => (
                      <div
                        key={lang}
                        className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                      >
                        {lang}
                        <button
                          onClick={() => removeLanguage(lang)}
                          className="hover:text-gray-900"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Repository Stars: {searchParams.minStars} -{" "}
                  {searchParams.maxStars}
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    value={searchParams.minStars}
                    onChange={(e) =>
                      updateParams({ minStars: parseInt(e.target.value) })
                    }
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    value={searchParams.maxStars}
                    onChange={(e) =>
                      updateParams({ maxStars: parseInt(e.target.value) })
                    }
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Issue Labels
                </label>
                <div className="space-y-2">
                  {LABEL_OPTIONS.map((label) => (
                    <label
                      key={label}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedLabels.includes(label)}
                        onChange={() => toggleLabel(label)}
                        className="w-4 h-4 text-brand-500 border-gray-300 rounded focus:ring-brand-500"
                      />
                      <span className="text-sm text-gray-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <hr className="border-gray-200" />

        <button
          onClick={handleSearch}
          disabled={isSearchDisabled}
          className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
            isSearchDisabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-linear-to-r from-brand-500 to-accent-500 hover:from-brand-600 hover:to-accent-600 text-white"
          }`}
        >
          {isSearching ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Zap size={20} />
              Find Issues
            </>
          )}
        </button>

        {searchParams.skills.length === 0 && (
          <p className="text-sm text-gray-500 text-center">
            Select at least one skill to search for issues
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchForm;
