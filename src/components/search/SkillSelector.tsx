import { useState } from "react";
import { X } from "lucide-react";

export interface SkillSelectorProps {
  selectedSkills: string[];
  onChange: (skills: string[]) => void;
}

const ALL_SKILLS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Vue",
  "Angular",
  "Node.js",
  "Express",
  "Next.js",
  "Svelte",
  "Python",
  "Django",
  "FastAPI",
  "Flask",
  "Java",
  "Spring",
  "Go",
  "Rust",
  "Ruby",
  "Rails",
  "PHP",
  "Laravel",
  "C++",
  "C#",
  ".NET",
  "Swift",
  "Kotlin",
  "Flutter",
  "React Native",
  "GraphQL",
  "REST API",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "MySQL",
  "Firebase",
  "Docker",
  "Kubernetes",
  "AWS",
  "GCP",
  "Azure",
  "Git",
  "Linux",
  "HTML",
  "CSS",
  "SASS",
  "Tailwind",
  "Bootstrap",
  "WebSocket",
  "OAuth",
  "JWT",
  "Testing",
  "Jest",
  "Cypress",
  "SQL",
  "NoSQL",
  "Elasticsearch",
  "CI/CD",
  "Jenkins",
  "GitHub Actions",
  "Machine Learning",
  "Django REST Framework",
];

export const SkillSelector = ({
  selectedSkills,
  onChange,
}: SkillSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSkills = ALL_SKILLS.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      onChange(selectedSkills.filter((s) => s !== skill));
    } else {
      if (selectedSkills.length < 10) {
        onChange([...selectedSkills, skill]);
      }
    }
  };

  const removeSkill = (skill: string) => {
    onChange(selectedSkills.filter((s) => s !== skill));
  };

  const isMaxed = selectedSkills.length >= 10;

  return (
    <div className="space-y-4">
      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedSkills.map((skill) => (
            <div
              key={skill}
              className="flex items-center gap-2 px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-sm font-medium"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="hover:text-brand-900 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {selectedSkills.length} / 10 skills selected
        </p>
        {isMaxed && (
          <p className="text-sm text-orange-600">Maximum 10 skills reached</p>
        )}
      </div>

      <input
        type="text"
        placeholder="Search skills..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
      />

      <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
        {filteredSkills.map((skill) => (
          <button
            key={skill}
            onClick={() => toggleSkill(skill)}
            disabled={isMaxed && !selectedSkills.includes(skill)}
            className={`px-3 py-2 rounded-lg font-medium text-sm transition-all ${
              selectedSkills.includes(skill)
                ? "bg-brand-500 text-white"
                : isMaxed && !selectedSkills.includes(skill)
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {skill}
          </button>
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <p className="text-center text-gray-500 py-4">
          No skills match your search
        </p>
      )}
    </div>
  );
};

export default SkillSelector;
