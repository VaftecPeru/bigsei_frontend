const TableHeader = ({ children, className = "" }) => {
    return <thead className={`bg-gray-200 ${className}`}>{children}</thead>;
  };
  
  export default TableHeader;
  