export const Loading2Component = () => {
  return (
    <div className="flex flex-wrap gap-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="w-[300px] h-auto bg-white border rounded-xl shadow-md animate-pulse"
        >
          <div className="h-[150px] bg-gray-200 rounded-t-xl"></div>
          <div className="p-4 space-y-2">
            <div className="h-5 bg-gray-300 rounded w-4/5"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-3 bg-gray-300 rounded w-2/3 mt-4"></div>
            <div className="mt-3 h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
