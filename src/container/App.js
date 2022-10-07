import { BoardWrapper } from "./App.style";
import { Fragment, useState } from "react";
import { ReactComponent as PlusIcon } from "../assets/plus.svg";
import Card from "../components/Card";
import List from "../components/List";
import StoreApi from "../utils/storeApi";
import JsonData from "../utils/data";
function App() {
  const [data, setData] = useState(localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : JsonData)

  const addCard = (title, listId) => {
    let newCard = {
      id: new Date().getTime(),
      cardName: title
    }
    const list = data.lists[listId]
    list.cards = [...list.cards, newCard]
    const updatedData = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list
      }
    }
    setData(updatedData)
  }

  return (
    <BoardWrapper>
      <StoreApi.Provider value={{ addCard }}>
        <Fragment key={data.id}>
          <div className="board_header mb-4 text-2xl font-bold">{data.boardName}</div>
          <ul className="board">
            {data.listIds.map((listId) => {
              let list = data.lists[listId]
              return (
                <List list={list} setData={setData} key={list.id} data={data}>
                  {list.cards.map((card) => {
                    return (
                      <Card card={card} key={card.id} />
                    );
                  })}
                </List>
              );
            })}
            <li className="list">
              <div className="list_header flex pt-2 text-slate-500 bg-gray-200 rounded p-2">
                <PlusIcon width={"12px"} className="mr-2" />
                <span>Add another list</span>
              </div>
            </li>
          </ul>
        </Fragment>
      </StoreApi.Provider>
    </BoardWrapper >
  );
}

export default App;
