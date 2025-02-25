import React from "react";

const ForwardBtn = (props) => {
  return (
    <button onClick={props.onClick}>
      <span className="material-symbols-outlined">arrow_forward</span>
    </button>
  );
};

export default ForwardBtn;
