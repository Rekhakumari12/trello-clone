import React from 'react';

const Card = ({ card }) => {
  return (
    <div className="list_main bg-gray-50 p-2 rounded my-2">
      <div className="card">
        {card.cardName}
      </div>
    </div>
  );
}

export default Card;
