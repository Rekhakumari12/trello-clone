import { BoardWrapper } from "./App.style";
import { Fragment, useState } from "react";
import Card from "../components/Card";
import List from "../components/List";
import StoreApi from "../utils/storeApi";
import JsonData from "../utils/data";
import InputCard from "../components/InputCard";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const [data, setData] = useState(
    localStorage.getItem("data")
      ? JSON.parse(localStorage.getItem("data"))
      : JsonData
  );

  const addCard = (title, listId) => {
    let newCard = {
      id: new Date().getTime().toString(),
      cardName: title,
    };
    const list = data.lists[listId];
    list.cards = [...list.cards, newCard];
    const updatedData = {
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
    const newListId = new Date().getTime().toString()
    let updatedList = {
      id: newListId,
      listName: title,
      cards: []
    }
    const updatedData = {
      ...data,
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: updatedList
      }
    }
    localStorage.setItem("data", JSON.stringify(updatedData));
    setData(updatedData);
  }

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    const sourceList = data.lists[source.droppableId]
    const destinationList = data.lists[destination.droppableId]
    const draggingCard = sourceList.cards.filter(card => card.id === draggableId)[0]
    let updatedState
    sourceList.cards.splice(source.index, 1)
    destinationList.cards.splice(destination.index, 0, draggingCard)
    if (source.droppableId === destination.droppableId) {
      updatedState = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: destinationList
        }
      }
    } else {
      updatedState = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: sourceList,
          [destinationList.id]: destinationList
        }
      }
    }

    setData(updatedState)
  }
  return (
    <BoardWrapper>
      <StoreApi.Provider value={{ addCard, addList }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Fragment key={data.id}>
            <div className="board_header mb-4 text-2xl font-bold text-white">
              {data.boardName}
            </div>
            <ul className="board">
              {data.listIds.map((listId) => {
                let list = data.lists[listId];
                return (
                  <List list={list} setData={setData} key={list.id} data={data}>
                    {list.cards.map((card, idx) => {
                      return <Card card={card} key={card.id} index={idx} />;
                    })}
                  </List>
                );
              })}
              <li className="list">
                <InputCard type="list" />
              </li>
            </ul>
          </Fragment>
        </DragDropContext>
      </StoreApi.Provider>
    </BoardWrapper>
  );
}

export default App;
