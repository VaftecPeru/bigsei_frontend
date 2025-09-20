import React from "react";

const SearchBarM = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder || "Buscar..."}
      style={{
        padding: "8px",
        width: "100%",
        marginBottom: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
      }}
    />
  );
};

export default SearchBarM;
