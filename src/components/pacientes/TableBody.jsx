import React from 'react';

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody ref={ref} className={`divide-y divide-gray-200 ${className}`} {...props} />
));

TableBody.displayName = "TableBody";

export { TableBody };