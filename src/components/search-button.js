import React from 'react';
function Button(props) {
  return (
    <button
      className='button button--search'
      onClick={() => props.stateChanger(props.searchTerm)}
    >
      {props.label}
    </button>
  );
}
export default Button;
