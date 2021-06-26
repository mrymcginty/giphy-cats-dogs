import React, { useState } from 'react';
function Button(props) {
  return (
    <div>
      <button onClick={() => props.stateChanger(props.label)}>
        {props.label}
      </button>
    </div>
  );
}
export default Button;
