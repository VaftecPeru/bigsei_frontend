const TableRow = ({ children, className = "" }) => {
    return <tr className={`border ${className}`}>{children}</tr>;
  };
  
  export default TableRow;
  