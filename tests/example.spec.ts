import { test, expect } from '@playwright/test';
import { BoardsAPI } from './api_classes/boards-api';
import { ListsAPI } from './api_classes/lists-api';
import { CardsAPI } from './api_classes/cards-api';

test.describe('Test Trello APIs - NextQA Test Automation Class', () => {
  
  let boardsRequest: BoardsAPI
  let listsRequest: ListsAPI
  let cardsRequest: CardsAPI

  let boardId
  let listsCardsObj = [
    {
      listName: 'Backlog',
      listId: '',
      listDescription: 'Descrição da coluna backlog',
      cards: [
        {
          name: 'backlog task card01',
          description: ''
        },
        {
          name: 'backlog task card03',
          description: ''
        },
        {
          name: 'backlog task card03',
          description: ''
        }
      ]
    },
    {
      listName: 'To Do',
      listId: '',
      listDescription: 'descrição da coluna ToDo',
      cards: [
        {
          name: 'To Do Bug card01',
          description: ''
        },
        {
          name: 'To Do Bug card03',
          description: ''
        },
        {
          name: 'To Do Bug card03',
          description: ''
        }
      ]
    },
    {
      listName: 'In Progress',
      listId: '',
      listDescription: 'descrição da coluna ToDo',
      cards: [
        {
          name: 'To Do Bug card01',
          description: ''
        },
        {
          name: 'To Do Bug card03',
          description: ''
        },
        {
          name: 'To Do Bug card03',
          description: ''
        }
      ]
    }
  ]

  test.beforeEach(async ({ request }) => {
    boardsRequest = new BoardsAPI(request)
    listsRequest = new ListsAPI(request)
    cardsRequest = new CardsAPI(request)
  })
  
  test('Obtem board do usuário', async () => {   

    let response = await boardsRequest.getUserBoards()

    expect(response.ok()).toBeTruthy(); 
    const body = JSON.parse(await response.text())
    console.log(body)
    body.forEach(board => {
      if(board.name== 'NextQA'){
        boardId = body[0].id
        console.log('Encontrou o Board ID: ',boardId)
      }
    })
  });

  test('Cria listas e cards', async () => {   

    await Promise.all(
      
      listsCardsObj.map(async (list, index) => {

      let response = await listsRequest.createList(list.listName, boardId);
      expect(response.ok()).toBeTruthy()
      const body = JSON.parse(await response.text())
      console.log(body)

      listsCardsObj[index].listId = body.id

      console.log(listsCardsObj)

    })
    
    );

  });

})

