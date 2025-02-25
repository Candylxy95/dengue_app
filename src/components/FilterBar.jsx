import React from "react";
import ForwardBtn from "./ForwardBtn";
import BackwardBtn from "./BackwardBtn";
import FilterBtn from "./FilterByWeekBtn";
import ChartBtn from "./ChartBtn";
import { useState } from "react";

const FilterBar = (props) => {
  return (
    <div className="flex justify-between p-2">
      <div className="flex w-1/5">
        <div className="px-2">
          <BackwardBtn
            onClick={props.onBackwardClick}
            style={props.backwardBtnStyle}
            disabled={props.backwardDisabled}
          />
        </div>
        <div className="px-2">
          <ForwardBtn onClick={props.onForwardClick} />
        </div>
      </div>
      <div className="flex">
        <div className="px-2">
          <ChartBtn
            className="bg-slate-500 p-1 px-2 hover:bg-rose-400 active:bg-red-800 text-stone-50 "
            onClick={props.onChartClick}
          >
            {props.isGraph ? "View Table" : "View Graph"}
          </ChartBtn>
        </div>
      </div>
      <div className="flex w-1/5 justify-end">
        <FilterBtn
          filterValue={props.filterValue}
          setFilterValue={props.setFilterValue}
          setOffsetValue={props.setOffsetValue}
        />
      </div>
    </div>
  );
};

export default FilterBar;
