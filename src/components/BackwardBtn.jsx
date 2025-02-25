import React from "react";

const BackwardBtn = (props) => {
  return (
    <button onClick={props.onClick} disabled={props.disabled}>
      <span
        className={`material-symbols-outlined ${
          props.disabled
            ? "text-gray-100 cursor-not-allowed"
            : "text-neutral-950"
        }`}
      >
        arrow_back
      </span>
    </button>
  );
};

export default BackwardBtn;
