import { useState, memo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import ReactTextareaAutosize from "react-textarea-autosize";
import InputCard from "./InputCard";
import SmallButton from "./SmallButton";
import { TextAreaWrapper } from "../container/App.style";
import Card from "./Card";

const List = ({ setData, data, list, index }) => {
  const [listTitle, setListTitle] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const onSave = async (e, listId = list.id) => {
    if (listTitle) {
      data.lists[listId].listName = listTitle;
    } else {
      data.lists[listId].listName = 'Please enter list name ';
    }
    data.lists[listId].cards.forEach(card => {
      return card.listName = listTitle
    });
    await setData(data);
    localStorage.setItem("data", JSON.stringify(data));
    setIsEdit(false)
  };

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Droppable droppableId={list.id}>
            {(provided) => (
              <li ref={provided.innerRef} {...provided.droppableProps} className="list py-3 px-4 bg-gray-300 rounded h-fit" >
                <TextAreaWrapper>
                  <ReactTextareaAutosize
                    defaultValue={list.listName}
                    onChange={(e) => setListTitle(e.target.value.trim())}
                    className="area-editable"
                    onClick={() => setIsEdit(true)}
                  />
                </TextAreaWrapper>
                {isEdit && (
                  <SmallButton name="save" handleClick={onSave} />
                )}
                {list.cards.map((card, idx) => {
                  return <Card card={card} key={card.id} index={idx} data={data} />;
                })}
                {/* <Card card={card} key={card.id} index={idx} data={data} /> */}
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

export default memo(List);
