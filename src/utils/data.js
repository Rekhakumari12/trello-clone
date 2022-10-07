
const JsonData = {
  id: 1,
  boardName: 'TrelloClone',
  lists: {
    'list-1': {
      id: 'list-1',
      listName: 'To do',
      cards: [
        { id: 1, cardName: 'Card-1', description: "Description" },
        { id: 2, cardName: 'Card-2', description: "Description" }
      ]
    },
  },
  listIds: ['list-1']
}

export default JsonData
//data.board.lists[]
// ,
// {
//   id: 2, listName: 'Doing', cards: [
//     { id: 1, cardName: 'Card-1', description: "Description", isEdit: false }
//   ],
//     isEdit: false
// },
// {
//   id: 3, listName: 'Done', cards: [
//     { id: 1, cardName: 'Card-1', description: "Description", isEdit: false }
//   ],
//     isEdit: false
// }