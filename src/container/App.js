import { BoardWrapper } from "./App.style";
import { Fragment, useState, memo } from "react";
import List from "../components/List";
import StoreApi from "../utils/storeApi";
import JsonData from "../utils/data";
import InputCard from "../components/InputCard";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

function App() {
  const [data, setData] = useState(
    localStorage.getItem("data")
      ? JSON.parse(localStorage.getItem("data"))
      : JsonData
  );
  const [reRender, setReRender] = useState(false);
  let updatedData;
  const addCard = (title, listId, description) => {
    console.log(title, listId, description);
    const list = data.lists[listId];
    let newCard = {
      id: new Date().getTime().toString(),
      cardName: title,
      listId: listId,
      listName: list.listName,
      description: description,
      createdAt: new Date().toLocaleString(),
    };
    list.cards = [...list.cards, newCard];
    updatedData = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };
    localStorage.setItem("data", JSON.stringify(updatedData));
    setData(updatedData);
  };

  const addList = (title) => {
    const newListId = new Date().getTime().toString();
    let updatedList = {
      id: newListId,
      listName: title,
      cards: [],
    };
    updatedData = {
      ...data,
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: updatedList,
      },
    };
    localStorage.setItem("data", JSON.stringify(updatedData));
    setData(updatedData);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;
    if (type === "list") {
      console.log(destination, source, draggableId, type);
      const newListIds = data.listIds;
      newListIds.splice(source.index, 1);
      newListIds.splice(destination.index, 0, draggableId);
      updatedData = {
        ...data,
        listIds: [...new Set([...data.listIds, draggableId])],
      };
      localStorage.setItem("data", JSON.stringify(updatedData));
      setData(updatedData);
      return;
    }

    const sourceList = data.lists[source.droppableId];
    const destinationList = data.lists[destination.droppableId];
    const draggingCard = sourceList.cards.filter(
      (card) => card.id === draggableId
    )[0];
    sourceList.cards.splice(source.index, 1);
    let updatedCard = {
      ...draggingCard,
      listId: destinationList.id,
      listName: destinationList.listName,
    };
    destinationList.cards.splice(destination.index, 0, updatedCard);
    if (source.droppableId === destination.droppableId) {
      updatedData = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: destinationList,
        },
      };
    } else {
      updatedData = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: sourceList,
          [destinationList.id]: destinationList,
        },
      };
    }
    localStorage.setItem("data", JSON.stringify(updatedData));
    setData(updatedData);
  };
  return (
    <BoardWrapper>
      <StoreApi.Provider value={{ addCard, addList, setData }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Fragment key={data.id}>
            <div className="text-5xl font-extrabold my-3">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                {data.boardName}
              </span>
            </div>
            <Droppable droppableId="board" type="list" direction="horizontal">
              {(provided) => (
                <ul
                  className="board"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {data.listIds.map((listId, idx) => {
                    let list = data.lists[listId];
                    return (
                      <List
                        list={list}
                        setData={setData}
                        key={list.id}
                        data={data}
                        index={idx}
                        setReRender={setReRender}
                        reRender={reRender}
                      />
                    );
                  })}
                  {provided.placeholder}
                  <li className="list">
                    <InputCard type="list" />
                  </li>
                </ul>
              )}
            </Droppable>
          </Fragment>
        </DragDropContext>
      </StoreApi.Provider>
    </BoardWrapper>
  );
}

export default memo(App);
