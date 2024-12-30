import React, { useState } from "react";

export const FilterTask = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleChange = (e) => {
    const filter = e.target.value;
    setSelectedFilter(filter);
    if (filter === "complete") onFilterChange(true);
    else if (filter === "pending") onFilterChange(false);
    else onFilterChange(null);
  };

  return (
    <div class="w-full h-full flex">
      <select
        id="filter"
        value={selectedFilter}
        onChange={handleChange}
        class="w-full h-full rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent px-2 shadow-lg">
        <option value="all">Todas</option>
        <option value="complete">Completadas</option>
        <option value="pending">Pendientes</option>
      </select>
    </div>
  );
};
