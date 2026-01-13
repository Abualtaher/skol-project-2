import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ padding: "8px", marginBottom: "20px", width: "100%" }}
    />
  );
};

export default SearchBar;
