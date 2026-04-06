const SkeletonCard = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-start mb-3">
        <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
        <div className="h-5 bg-gray-200 rounded w-16 animate-pulse" />
      </div>
      <div className="h-6 bg-gray-200 rounded w-full animate-pulse" />
      <div className="h-4 bg-gray-200 rounded w-64 animate-pulse" />
      <div className="grid grid-cols-3 gap-4">
        <div className="h-16 bg-gray-200 rounded animate-pulse" />
        <div className="h-16 bg-gray-200 rounded animate-pulse" />
        <div className="h-16 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="flex gap-2 pt-2">
        <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse" />
        <div className="w-24 h-10 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
};

export default SkeletonCard;
