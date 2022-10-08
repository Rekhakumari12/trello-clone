
const JsonData = {
  id: 'board',
  boardName: 'TrelloClone',
  lists: {
    'list-1': {
      id: 'list-1',
      listName: 'To do',
      cards: [
        { id: 'card-1', cardName: 'Card-1', description: "Description" },
        { id: 'card-2', cardName: 'Card-2', description: "Description" }
      ]
    },
    'list-2': {
      id: 'list-2',
      listName: 'Done',
      cards: [
        { id: 'card-3', cardName: 'Card-3', description: "Description" },
      ]
    },
  },
  listIds: ['list-1', 'list-2']
}

export default JsonData
