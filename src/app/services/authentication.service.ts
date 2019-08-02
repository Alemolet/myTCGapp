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
      return email.slice(0, index);   //truncating the email at the @ character; user can later edit them nickname.
    }

    userInfoInit(): Observable<User>{
      let counter: number = 0;
      let index: number = 0;
      let tempUserObj: any[] = []
      let user: User;

      return this.dbService.getAllUsers().pipe(map(res => {
        let users = [];

        for(let key in res){
            users.push({...res[key]});
            this.cuEmail === res[key].email ? index = counter : counter++;
        }
        
        user = new User(users[index].email, users[index].password, users[index].nickname);

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