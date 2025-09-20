export const LoadingComponent = ({courses, selectedCategory}) => {
    return( 
        <div className="flex flex-wrap gap-4">
    {courses[selectedCategory]?.length > 0 &&
      courses[selectedCategory].map((_, index) => (
        <div
          key={index}
          className="w-[300px] h-[250px] bg-gray-200 animate-pulse rounded-lg"
        >
          <div className="h-[150px] bg-gray-300 rounded-t-lg"></div>
          <div className="p-4">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      ))}
  </div>
           
)}
  