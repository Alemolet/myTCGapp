import { Injectable, EventEmitter } from '@angular/core';
import { DbService } from './db.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService{

    loaded = new EventEmitter<boolean>();

    private _cuEmail: string = '';                   //Current User's Email
    private _cuPassword: string = '';                //Current User's Password
    private _cuNickname: string = '';                //Current User's Nickname

    constructor(private dbService: DbService){}

    signUp(email: string, password: string){
        const nickname: string = this.nickGenerator(email);

        return this.dbService.postUser({email, password, nickname});
    }

    logIn(email: string, password: string){   
      this._cuEmail = email;   
      this._cuPassword = password; 

      return this.dbService.getUser({email, password});
    }

    logOut(){
      this.dbService.loggedIn.next(false);
    }

    nickGenerator(email: string){
      let index: number = 0;
  
      for(let i=0; i<email.length; i++){
        if(email[i] == '@'){
          index = i;
        }
      }
      return email.slice(0, index);   //truncating the email at the @ character; user can later edit it.
    }

    userInfoInit(): Observable<User>{
      let index: string;
      let user: User;

      return this.dbService.getAllUsers().pipe(map(res => {
        let users = [];

        for(let key in res){
            users.push({...res[key]});
        }
        
        users.filter(user => user.email === this.cuEmail);
        user = new User(users[0].email, users[0].password, users[0].nickname);

        return user;
      }));
    }

    get cuEmail(){
      return this._cuEmail;
    }

    get cuPassword(){
      return this._cuPassword;
    }

    get cuNickname(){
      return this._cuNickname;
    }
  }

    

      /*BACKUP - in login method - 
      //not the most efficient way for sure, should've used the endpoint provided by
      //Firebase Auth REST API; just practicing with rxjs operators.

       return this.dbService.getUser({email, password})
        .pipe(map(res => {                          //converting the response Object into an array of users
          const users = [];
    
          for(const key in res){
            users.push({...res[key], id: key});     //saving also the firebase auto-generated id
          }
    
          return users;         //do not forget to return the array to use it in the subscribe method next
        })); */