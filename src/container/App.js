import { BoardWrapper } from './App.style';
import { useState, memo } from 'react';
import List from '../components/List';
import StoreApi from '../utils/storeApi';
import JsonData from '../utils/data';
import InputCard from '../components/InputCard';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

function App() {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('data');
    const initialData = savedData ? JSON.parse(savedData) : JsonData;
    if (initialData.boardName === 'TrelloClone') {
      const renamedData = { ...initialData, boardName: 'Website Redesign' };
      localStorage.setItem('data', JSON.stringify(renamedData));
      return renamedData;
    }
    return initialData;
  });
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
    localStorage.setItem('data', JSON.stringify(updatedData));
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
    localStorage.setItem('data', JSON.stringify(updatedData));
    setData(updatedData);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;
    if (type === 'list') {
      console.log(destination, source, draggableId, type);
      const newListIds = data.listIds;
      newListIds.splice(source.index, 1);
      newListIds.splice(destination.index, 0, draggableId);
      updatedData = {
        ...data,
        listIds: [...new Set([...data.listIds, draggableId])],
      };
      localStorage.setItem('data', JSON.stringify(updatedData));
      setData(updatedData);
      return;
    }

    const sourceList = data.lists[source.droppableId];
    const destinationList = data.lists[destination.droppableId];
    const draggingCard = sourceList.cards.filter(
      (card) => card.id === draggableId,
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
    localStorage.setItem('data', JSON.stringify(updatedData));
    setData(updatedData);
  };
  return (
    <BoardWrapper>
      <StoreApi.Provider value={{ addCard, addList, setData }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <aside className='sidebar'>
            <div className='brand'>
              <span className='brandMark'>T</span>
              <span>TaskFlow AI</span>
            </div>
            <nav className='sidebarNav' aria-label='Main navigation'>
              <button className='navItem active' type='button'>
                <span className='navIcon' aria-hidden='true' />
                <span>Board</span>
              </button>
            </nav>
          </aside>
          <main className='mainContent' key={data.id}>
            <header className='boardHeader'>
              <div className='boardIcon' aria-hidden='true' />
              <h1>{data.boardName}</h1>
            </header>
            <Droppable droppableId='board' type='list' direction='horizontal'>
              {(provided) => (
                <ul
                  className='board'
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
                  <li className='addListPanel'>
                    <InputCard type='list' />
                  </li>
                </ul>
              )}
            </Droppable>
          </main>
        </DragDropContext>
      </StoreApi.Provider>
    </BoardWrapper>
  );
}

export default memo(App);
