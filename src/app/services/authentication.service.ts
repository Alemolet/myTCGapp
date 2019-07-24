import { Injectable, EventEmitter } from '@angular/core';
import { DbService } from './db.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService{

    loaded = new EventEmitter<boolean>();
    data = new EventEmitter<string[]>();

    cuEmail: string = '';                   //Current User Email
    cuPassword: string = '';                //Current User Password

    constructor(private dbService: DbService){}

    signUp(email: string, password: string){
        return this.dbService.postUser({email, password});
    }

    //not the most efficient way for sure, should've used the endpoint provided by
    //Firebase Auth REST API; just practicing with rxjs operators.
    logIn(email: string, password: string){   
     this.cuEmail = email;   //'settings' modal component
     this.cuPassword = password; //'settings' modal component

      let data: string[] = [];
      data.push(email);
      data.push(password);
      data.push(this.nickGenerator(this.cuEmail)); 

      this.data.emit(data);

      return this.dbService.getUser({email, password});

      /*BACKUP
       return this.dbService.getUser({email, password})
        .pipe(map(res => {                          //converting the response Object into an array of users
          const users = [];
    
          for(const key in res){
            users.push({...res[key], id: key});     //saving also the firebase auto-generated id
          }
    
          return users;         //do not forget to return the array to use it in the subscribe method next
        })); */
    }

    logOut(){
        this.dbService.loggedIn.next(false);
    }

    nickGenerator(email: string){
      let index: number = 0;
  
      for(let i=0; i<email.length; i++){
        if(email[i] == '@'){
          index = i;
          return email.slice(0, index);     //truncating the email at the @ character; user can later edit it.
        }
      }
    }
}