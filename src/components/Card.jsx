import { useState, memo, useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { SpanText } from '../container/App.style';
import CardModal from './CardModal';
import storeApi from '../utils/storeApi';

const Card = ({ card, index, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setData } = useContext(storeApi);
  const formattedDate = card.createdAt
    ? new Date(card.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : 'No date';
  const initials = card.cardName
    ? card.cardName
        .split(' ')
        .map((word) => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'C';

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <>
          <div
            onClick={() => setIsOpen(!isOpen)}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className='taskCard'
          >
            <div className='card'>
              {card.cardName}
              <SpanText>
                {card.description &&
                  (card.description.split(' ').length > 10
                    ? card.description.split(' ').slice(0, 10).join(' ') + '...'
                    : card.description)}
              </SpanText>
              <div className='cardMeta'>
                <div className='metaLeft'>
                  <span className='priorityBadge'>Low</span>
                  <span className='cardDate'>{formattedDate}</span>
                </div>
                <span className='assignee'>{initials}</span>
              </div>
            </div>
          </div>
          <CardModal
            data={data}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setData={setData}
            card={card}
          />
        </>
      )}
    </Draggable>
  );
};

export default memo(Card);
