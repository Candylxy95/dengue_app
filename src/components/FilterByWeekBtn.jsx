import React from "react";

const FilterByWeekBtn = (props) => {
  const weeks = Array.from({ length: 53 }, (_, index) => index + 1);

  const handleChange = (e) => {
    props.setOffsetValue(0);
    props.setFilterValue(e.target.value);
  };

  return (
    <select value={props.filterValue} onChange={handleChange}>
      <option value="">Select Week</option>
      {weeks.map((week) => (
        <option key={week} value={week}>
          Week {week}
        </option>
      ))}
    </select>
  );
};

export default FilterByWeekBtn;
