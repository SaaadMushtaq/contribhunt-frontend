export interface LoadingStateProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export const LoadingState = ({
  message = "Loading...",
  size = "md",
}: LoadingStateProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      {/* Animated spinner */}
      <div
        className={`${sizeClasses[size]} border-4 border-gray-200 border-t-brand-500 rounded-full animate-spin`}
      />

      {/* Message */}
      <p className={`${textSizeClasses[size]} text-gray-600`}>{message}</p>
    </div>
  );
};

export default LoadingState;
