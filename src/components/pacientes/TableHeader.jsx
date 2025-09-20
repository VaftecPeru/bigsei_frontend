import React from "react";

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={`bg-blue-800 text-white ${className}`}
    {...props}
  />
));

TableHeader.displayName = "TableHeader";

export { TableHeader };
