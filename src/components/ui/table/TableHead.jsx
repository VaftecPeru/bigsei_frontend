const TableHead = ({ children, className = "" }) => {
    return <th className={`border p-2 font-semibold ${className}`}>{children}</th>;
  };
  
  export default TableHead;
  