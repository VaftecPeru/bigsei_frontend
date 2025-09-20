import React from "react";

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={`h-12 px-4 text-center align-middle font-medium text-gray-500 ${className}`}
    {...props}
  />
));

TableHead.displayName = "TableHead";

export { TableHead };
