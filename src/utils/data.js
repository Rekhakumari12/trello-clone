
const JsonData = {
  id: 'board',
  boardName: 'TrelloClone',
  lists: {
    'list-1': {
      id: 'list-1',
      listName: 'To do',
      cards: [
        { id: 'card-1', cardName: 'Card-1', description: "Description", listId: 'list-1', listName: 'Todo', createdAt: '10/8/2022, 2:23:00 PM' },
        { id: 'card-2', cardName: 'Card-2', description: "Description", listId: 'list-1', listName: 'Todo', createdAt: '10/8/2022, 2: 24: 00 PM' }
      ]
    },
    'list-2': {
      id: 'list-2',
      listName: 'Done',
      cards: [
        { id: 'card-3', cardName: 'Card-3', description: "Description", listId: 'list-2', listName: 'Done', createdAt: '10/8/2022, 2:23:00 PM' },
      ]
    },
  },
  listIds: ['list-1', 'list-2']
}

export default JsonData
