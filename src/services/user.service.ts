import { Injectable } from '@angular/core';
import { BaseHttpClientService } from './base-http-client.service';
import { IUser } from '../model/user'

@Injectable({
    providedIn: 'root'
  })
  
  export class userService {
    usersDataUrl = "https://jsonplaceholder.typicode.com/users";
    constructor(private _http: BaseHttpClientService){}  
    getUsersData() {
      return this._http.getData<IUser[]>(this.usersDataUrl);
    }
  }