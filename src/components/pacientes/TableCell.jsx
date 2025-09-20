import React from "react";

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td ref={ref} className={`p-4 align-middle text-gray-900  ${className}`} {...props} />
));

TableCell.displayName = "TableCell";

export { TableCell };