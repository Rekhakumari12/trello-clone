import { useState, useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Modal, Box, Typography, TextareaAutosize } from '@mui/material';
import storeApi from '../utils/storeApi';
import SmallButton from './SmallButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Card = ({ card, index, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDesc] = useState(card.description)
  const [isEdit, setIsEdit] = useState(false);
  const { setData } = useContext(storeApi);
  const handleSubmit = () => {
    data.lists[card.listId].cards.filter((c) => {
      if (c.id === card.id) {
        console.log(c)
        return c.description = description;
      }
    })
    setData(data);
    localStorage.setItem("data", JSON.stringify(data));
    setIsEdit(false);
  }

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <>
          <div onClick={() => setIsOpen(!isOpen)} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="list_main bg-gray-50 p-2 rounded my-2">
            <div className="card">
              {card.cardName}<br />
              {card.description && '--'}
            </div>
          </div>

          <Modal
            open={isOpen}
            onClose={() => setIsOpen(!isOpen)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2" className='font-extrabold'>
                {card.cardName}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Status in <u>{card.listName}</u><br />
                Created at <u>{card.createdAt}</u>
              </Typography><br />
              <div className='flex items-center'>
                <TextareaAutosize
                  className='mr-2'
                  placeholder="Enter description..."
                  style={{ width: 250, border: '1px solid gray', padding: '3px 5px', borderRadius: "4px" }}
                  onChange={(e) => setDesc(e.target.value)}
                  onClick={() => setIsEdit(true)}
                  defaultValue={description}
                />
                {isEdit && (
                  <SmallButton name="save" handleClick={handleSubmit} />
                )}
              </div>
              <br />
              <SmallButton name="close" handleClick={() => setIsOpen(!isOpen)} />
            </Box>
          </Modal>
        </>
      )}
    </Draggable>
  );
}

export default Card;
