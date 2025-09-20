import React from "react";

const TableComponent = React.forwardRef(({ children, className, ...props }, ref) => {
  return (
    <div className="w-full overflow-auto">
      <table ref={ref} className={`w-full border-collapse text-sm ${className || ""}`} {...props}>
        {children}
      </table>
    </div>
  );
});

TableComponent.displayName = "TableComponent";

export { TableComponent };
