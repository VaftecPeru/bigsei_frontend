import React from "react";

const Button = React.forwardRef(function Button(
  { className = "", variant = "default", size = "default", ...rest },
  ref
) {
  const variants = {
    default: "bg-gray-800 text-white hover:bg-purple-700",
    outline: "border border-gray-200 hover:bg-gray-100",
    ghost: "hover:bg-gray-100",
    link: "text-purple-600 underline-offset-4 hover:underline",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium
      ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2
      focus-visible:ring-purple-600 focus-visible:ring-offset-2 disabled:pointer-events-none
      disabled:opacity-50 ${variants[variant] || ""} ${
        sizes[size] || ""
      } ${className}`}
      {...rest}
    />
  );
});

export { Button };
