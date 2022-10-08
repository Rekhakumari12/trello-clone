import React from 'react';

const SmallButton = ({ name, handleClick }) => {
  return (
    <button
      className="border border-2 px-2 rounded bg-gray-200 mb-1"
      onClick={handleClick}
    >
      {name}
    </button>
  );
}

export default SmallButton;
