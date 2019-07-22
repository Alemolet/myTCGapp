import { Injectable, EventEmitter } from '@angular/core';
import { DbService } from './db.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService{

    loggedIn = new EventEmitter<boolean>();
    loaded = new EventEmitter<boolean>();

    constructor(private dbService: DbService){}

    signUp(email: string, password: string){
        return this.dbService.postUser({email, password});
    }

    //not the most efficient way for sure, should've used the endpoint provided by
    //Firebase Auth REST API; just practicing with rxjs operators.
    logIn(email: string, password: string){   

       return this.dbService.getUser({email, password})
        .pipe(map(res => {                          //converting the response Object into an array of users
          const users = [];
    
          for(const key in res){
            users.push({...res[key], id: key});     //saving also the firebase auto-generated id
          }
    
          return users;         //do not forget to return the array to use it in the subscribe method next
        })); 
    }

    logOut(){
        this.loggedIn.next(false);
    }
}