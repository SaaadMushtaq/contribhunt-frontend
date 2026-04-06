import { type LucideIcon } from "lucide-react";

export interface StatsCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  color: string;
}

export const StatsCard = ({
  label,
  value,
  icon: Icon,
  color,
}: StatsCardProps) => {
  const colorClasses: Record<string, string> = {
    green: "text-green-600 bg-green-50",
    blue: "text-blue-600 bg-blue-50",
    purple: "text-purple-600 bg-purple-50",
    red: "text-red-600 bg-red-50",
    orange: "text-orange-600 bg-orange-50",
  };

  const bgColor = colorClasses[color] || colorClasses.green;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
