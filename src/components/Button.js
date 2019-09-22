import React from "react";

function Button({ spin, handleClick }) {
  return (
    <div>
      <button onClick={e => handleClick(e)}>{spin ? "SPIN" : null}</button>
    </div>
  );
}

export default Button;
