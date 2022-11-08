import { useState, useContext, memo } from "react";
import { Collapse } from "@mui/material";
import { ReactComponent as PlusIcon } from "../assets/plus.svg";
import { ReactComponent as CancelIcon } from "../assets/cancel.svg";
import storeApi from "../utils/storeApi";

const InputCard = ({ listId, type }) => {
  const { addCard, addList } = useContext(storeApi);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const handleBtnClick = () => {
    if (type === 'list') {
      addList(title, listId);
    } else {
      addCard(title, listId);
    }
    setIsOpen(!isOpen);
    setTitle("");
  };
  return (
    <>
      <Collapse in={isOpen}>
        <input
          type="text"
          placeholder={
            type === `list`
              ? `Enter list title..`
              : `Enter a title for this card...`
          }
          className="mt-2 w-full"
          onChange={(e) => setTitle(e.target.value)}
          defaultValue={title}
        />
        <div className="flex my-2">
          <button
            className="bg-sky-500 hover:bg-sky-600 py-1 px-2 rounded text-white mr-4"
            onClick={handleBtnClick}
          >
            {type === `list` ? `Add list` : `Add card`}
          </button>
          <CancelIcon width={"15px"} onClick={() => setIsOpen(!isOpen)} />
        </div>
      </Collapse>
      <Collapse in={!isOpen} id="addcard">
        <div
          className="list_footer flex pt-2 text-slate-500 bg-gray-200 rounded p-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <PlusIcon width={"12px"} className="mr-2" />
          <span>{type === `list` ? `Add another list` : `Add a card`}</span>
        </div>
      </Collapse>
    </>
  );
};

export default memo(InputCard);
