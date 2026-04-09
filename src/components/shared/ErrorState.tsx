import { AlertCircle } from "lucide-react";

export interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <AlertCircle size={48} className="text-red-500" />

      <p className="text-center text-red-600 max-w-md">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-6 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors font-medium"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorState;
