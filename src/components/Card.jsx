import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Card = ({ card, index }) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="list_main bg-gray-50 p-2 rounded my-2">
          <div className="card">
            {card.cardName}
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Card;
