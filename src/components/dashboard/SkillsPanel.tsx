import { useState } from "react";
import { X, Plus, Zap } from "lucide-react";

export interface SkillsPanelProps {
  skills: string[];
  onUpdate: (skills: string[]) => void;
  onDetect: () => void;
  isDetecting: boolean;
}

export const SkillsPanel = ({
  skills: initialSkills,
  onUpdate,
  onDetect,
  isDetecting,
}: SkillsPanelProps) => {
  const [skills, setSkills] = useState<string[]>(initialSkills);
  const [skillInput, setSkillInput] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      const newSkill = skillInput.trim();
      if (!skills.includes(newSkill)) {
        const updatedSkills = [...skills, newSkill];
        setSkills(updatedSkills);
        setHasChanges(true);
      }
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    const updatedSkills = skills.filter((s) => s !== skill);
    setSkills(updatedSkills);
    setHasChanges(true);
  };

  const handleSave = () => {
    onUpdate(skills);
    setHasChanges(false);
  };

  const handleCancel = () => {
    setSkills(initialSkills);
    setHasChanges(false);
  };

  const handleDetect = () => {
    onDetect();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Your Skills</h3>
        <button
          onClick={handleDetect}
          disabled={isDetecting}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          <Zap size={16} />
          {isDetecting ? "Detecting..." : "Re-detect from GitHub"}
        </button>
      </div>

      {skills.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-gray-600 font-medium">
            {skills.length} skill{skills.length !== 1 ? "s" : ""}
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div
                key={skill}
                className="flex items-center gap-2 px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-sm font-medium"
              >
                {skill}
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-brand-900 transition-colors ml-1"
                  title="Remove skill"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Add Skill</label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a skill and press Enter..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleAddSkill}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
          />
          <button
            onClick={() => {
              if (skillInput.trim()) {
                handleAddSkill({
                  key: "Enter",
                } as React.KeyboardEvent<HTMLInputElement>);
              }
            }}
            className="p-2 bg-brand-100 hover:bg-brand-200 text-brand-600 rounded-lg transition-colors"
            title="Add skill"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {hasChanges && (
        <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors font-medium"
          >
            Save Changes
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      )}

      {!hasChanges && skills.length === 0 && (
        <p className="text-sm text-gray-500 text-center py-4">
          No skills yet. Add some to get started!
        </p>
      )}
    </div>
  );
};

export default SkillsPanel;
