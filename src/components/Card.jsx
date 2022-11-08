import { useState, memo, useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import { SpanText } from "../container/App.style";
import CardModal from "./CardModal";
import storeApi from "../utils/storeApi";

const Card = ({ card, index, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setData } = useContext(storeApi)
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <>
          <div
            onClick={() => setIsOpen(!isOpen)}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="list_main bg-gray-50 p-2 rounded my-2"
          >
            <div className="card">
              {card.cardName}
              <br />
              <SpanText>
                {card.description &&
                  (card.description.split(" ").length > 10
                    ? card.description.split(" ").slice(0, 10).join(" ") + "..."
                    : card.description)}
              </SpanText>
            </div>
          </div>
          <CardModal data={data} isOpen={isOpen} setIsOpen={setIsOpen} setData={setData} card={card} />
        </>
      )}
    </Draggable>
  );
};

export default memo(Card);
