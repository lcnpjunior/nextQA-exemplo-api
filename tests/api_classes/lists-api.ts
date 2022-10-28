import { APIRequestContext } from '@playwright/test'

const API_KEY = '501564235593d291fcbac0b97cff6ba1'
const API_TOKEN = '18f31c024e2b6cdc88f3461cf076f4ff922c7b8fb4c3e40cb4f5e9deb14eb45b' 
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