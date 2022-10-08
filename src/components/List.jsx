import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import ReactTextareaAutosize from "react-textarea-autosize";
import InputCard from "./InputCard";

const List = ({ children, setData, data, list }) => {
  const [listTitle, setListTitle] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = async (e, listId = list.id) => {
    data.lists[listId].listName = listTitle;
    await setData(data);
    localStorage.setItem("data", JSON.stringify(data));
    setIsEdit(false);
  };
  return (
    <Droppable droppableId={list.id}>
      {(provided) => (
        <li ref={provided.innerRef} {...provided.droppableProps} className="list p-2 pb-3 bg-gray-300 rounded h-fit">
          <ReactTextareaAutosize
            defaultValue={list.listName}
            onChange={(e) => setListTitle(e.target.value)}
            className="font-extrabold bg-transparent"
            onClick={() => setIsEdit(true)}
          />
          {isEdit && (
            <button
              className="border border-2 px-2 rounded bg-gray-200"
              onClick={handleEdit}
            >
              save
            </button>
          )}
          {children}
          <InputCard listId={list.id} />
          {provided.placeholder}
        </li>
      )}
    </Droppable>
  );
};

export default List;
