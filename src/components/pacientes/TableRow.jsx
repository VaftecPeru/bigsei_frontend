import React from "react";

const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={`  transition-colors text-white ${className}`}
    {...props}
  />
));

TableRow.displayName = "TableRow";

export { TableRow };