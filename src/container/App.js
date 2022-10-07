import { BoardWrapper } from "./App.style";
import { Fragment, useState } from "react";
import Card from "../components/Card";
import List from "../components/List";
import StoreApi from "../utils/storeApi";
import JsonData from "../utils/data";
import InputCard from "../components/InputCard";

function App() {
  const [data, setData] = useState(
    localStorage.getItem("data")
      ? JSON.parse(localStorage.getItem("data"))
      : JsonData
  );

  const addCard = (title, listId) => {
    let newCard = {
      id: new Date().getTime(),
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
    const newListId = new Date().getTime()
    let updatedList = {
      id: newListId,
      listName: title,
      cards: []
    }

    const updatedData = {
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: updatedList
      }
    }
    localStorage.setItem("data", JSON.stringify(updatedData));
    setData(updatedData);
  }
  return (
    <BoardWrapper>
      <StoreApi.Provider value={{ addCard }}>
        <Fragment key={data.id}>
          <div className="board_header mb-4 text-2xl font-bold text-white">
            {data.boardName}
          </div>
          <ul className="board">
            {data.listIds.map((listId) => {
              let list = data.lists[listId];
              return (
                <List list={list} setData={setData} key={list.id} data={data}>
                  {list.cards.map((card) => {
                    return <Card card={card} key={card.id} />;
                  })}
                </List>
              );
            })}
            <li className="list">
              <InputCard type="list" addList={addList} />
            </li>
          </ul>
        </Fragment>
      </StoreApi.Provider>
    </BoardWrapper>
  );
}

export default App;
