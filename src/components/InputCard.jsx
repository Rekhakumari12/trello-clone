import { useState, useContext } from 'react';
import { Collapse } from '@mui/material';
import { ReactComponent as PlusIcon } from "../assets/plus.svg";
import { ReactComponent as CancelIcon } from "../assets/cancel.svg";
import storeApi from '../utils/storeApi';

const InputCard = ({ isOpen, setIsOpen, listId }) => {
  const { addCard } = useContext(storeApi);
  const [cardTitle, setCardTitle] = useState('');
  const handleBtnClick = () => {
    addCard(cardTitle, listId)
    setCardTitle('')
    setIsOpen(!isOpen)
  }
  return (
    <>
      <Collapse in={isOpen}>
        <input type="text" placeholder="Enter a title for this card..." className="mt-2 w-full" onChange={(e) => setCardTitle(e.target.value)} defaultValue={cardTitle} />
        <div className="flex my-2">
          <button className="bg-sky-500 hover:bg-sky-600 py-1 px-2 rounded text-white mr-4" onClick={handleBtnClick}>Add Card</button>
          <CancelIcon width={"15px"} onClick={() => setIsOpen(!isOpen)} />
        </div>
      </Collapse>
      <Collapse in={!isOpen}>
        <div className="list_footer flex pt-2 text-slate-500 bg-gray-200 rounded p-2 mt-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <PlusIcon width={"12px"} className="mr-2" />
          <span>Add a card</span>
        </div>
      </Collapse>
    </>
  );
}

export default InputCard;
