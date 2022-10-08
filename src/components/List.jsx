import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import ReactTextareaAutosize from "react-textarea-autosize";
import InputCard from "./InputCard";

const List = ({ children, setData, data, list, index }) => {
  const [listTitle, setListTitle] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = async (e, listId = list.id) => {
    data.lists[listId].listName = listTitle;
    await setData(data);
    localStorage.setItem("data", JSON.stringify(data));
    setIsEdit(false);
  };
  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Droppable droppableId={list.id}>
            {(provided) => (
              <li ref={provided.innerRef} {...provided.droppableProps} className="list py-3 px-4 bg-gray-300 rounded h-fit">
                <ReactTextareaAutosize
                  defaultValue={list.listName}
                  onChange={(e) => setListTitle(e.target.value)}
                  className="font-extrabold bg-transparent"
                  onClick={() => setIsEdit(true)}
                />
                {isEdit && (
                  <button
                    className="border border-2 px-2 rounded bg-gray-200 mb-1"
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
        </div>
      )}
    </Draggable>
  );
};

export default List;
