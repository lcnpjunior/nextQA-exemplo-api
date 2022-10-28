import { APIRequestContext } from '@playwright/test'

const API_KEY = ''
const API_TOKEN = '' 
const AUTH = `OAuth oauth_consumer_key="${API_KEY}", oauth_token="${API_TOKEN}"`

export class ListsAPI{
    readonly request: APIRequestContext

    constructor(request: APIRequestContext){
        this.request = request
    }

    async createList(listName: string, idBoard: string){
        let response = await this.request.post(`lists`, {
            headers: {
                'Authorization': AUTH
              },
              params: {
                name: listName,
                idBoard: idBoard
              }
        })
        return response
    }
}