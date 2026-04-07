import { type ExperienceLevel } from "../../types";

export interface ExperienceDropdownProps {
  value: ExperienceLevel;
  onChange: (level: ExperienceLevel) => void;
}

const EXPERIENCE_OPTIONS: Array<{
  value: ExperienceLevel;
  label: string;
  description: string;
}> = [
  {
    value: "junior",
    label: "Junior (0-2 years)",
    description: 'Focuses on "good first issue" and beginner-friendly labels',
  },
  {
    value: "mid",
    label: "Mid (2-5 years)",
    description: "Broader range of issues across difficulty levels",
  },
  {
    value: "senior",
    label: "Senior (5+ years)",
    description: "Includes complex issues and architectural challenges",
  },
];

export const ExperienceDropdown = ({
  value,
  onChange,
}: ExperienceDropdownProps) => {
  const selectedOption = EXPERIENCE_OPTIONS.find((opt) => opt.value === value);

  return (
    <div className="space-y-3">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as ExperienceLevel)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white font-medium"
      >
        {EXPERIENCE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Description */}
      {selectedOption && (
        <p className="text-sm text-gray-600">{selectedOption.description}</p>
      )}
    </div>
  );
};

export default ExperienceDropdown;
