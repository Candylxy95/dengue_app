import React from "react";

const ChartBtn = (props) => {
  return (
    <button
      style={{ borderRadius: "5px" }}
      className={props.className}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default ChartBtn;
