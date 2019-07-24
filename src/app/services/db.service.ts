import { Card } from '../models/card.model';
import { TemporaryDB } from '../models/temporary-db.model';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from 'angularfire2/auth'
import { Router } from '@angular/router';

@Injectable()
export class DbService{
    
    cardRemoved = new EventEmitter<{flag: boolean, id: number}>();
    loggedIn = new EventEmitter<boolean>();

    private url: string = 'https://mytcgapp.firebaseio.com/';
    private API_KEY: string = 'AIzaSyBSu_yoiOQ2kkxh7gSCJG1O3uAOvr3jjcQ';

    constructor(private http: HttpClient, private af: AngularFireAuth, private router: Router){
    }

    addCard(card: Card){
        TemporaryDB.deck.push(card);
    }

    removeCard(location: number, card: Card){
        TemporaryDB.deck.splice(location, 1);
        this.cardRemoved.emit({
            flag: true, 
            //id: location   //this kind of control isn't correct because the Card ID is static
            id: card.id      //while the card location in the array is dynamic (may change)
        });
    }

    doesDeckContain(card: Card): boolean{
        let flag: boolean = false;

        flag = TemporaryDB.deck.some(elem => elem.name == card.name);

        return flag;
    }

    hasCards(): boolean{
        return TemporaryDB.deck.length == 0 ? false : true ;
    }

    postCard(card: Card){
        return this.http.post(this.url + 'collection.json', {
            id: card.id,
            name: card.name,
            description: card.description,
            type: card.type,
            imgPath: card.imgPath
        });
    }

    postUser(user: {email: string, password: string/*, nickname: string*/}){    //check the possibility to add arguments and params in the request body
        return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.API_KEY, {
            email: user.email,
            password: user.password,
           // nickname: this.authService.nickGenerator(user.email),
            returnSecureToken: true
        });
    }

    getUser(user: {email: string, password: string}){

        return this.http
        .post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.API_KEY, {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        })
    }

    updateUser(user: { 
                email: string,
                password: string, 
                updatedEmail: string, 
                updatedPassword: string, 
                updatedNickname: string}){

        /*1: find the user to update in the Db;*/

        this.http
        .post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.API_KEY, {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        })
        /*Check if updatedEmail/Password/Nickname are not empty => send an http POST
         request*/ 
        .subscribe(res => {
            if(user.updatedEmail){
                this.http.post("https://identitytoolkit.googleapis.com/v1/accounts:update?key=" + this.API_KEY, {
                    //@ts-ignore
                    idToken: res.idToken,     //ignore this error, this property is perfectly known by this kind of object
                    email: user.updatedEmail,
                    returnSecureToken: false
                }).subscribe(res => {
                    alert("Your e-mail address has been succesfully changed. Log in again to see the changes!");
                    this.af.auth.signOut(); //is this actually doing something?
                    this.loggedIn.emit(false);
                    this.router.navigate(['/authentication']);
                });
            }

            if(user.updatedPassword){
                this.http.post("https://identitytoolkit.googleapis.com/v1/accounts:update?key=" + this.API_KEY, {
                    //@ts-ignore
                    idToken: res.idToken,     //ignore this error, this property is perfectly known by this kind of object
                    password: user.updatedPassword,
                    returnSecureToken: false     
                }).subscribe(res => {
                    alert("Your password has been succesfully changed. You need to log in again to confirm the changes.");
                    this.af.auth.signOut(); //is this actually doing something?
                    this.loggedIn.emit(false);
                    this.router.navigate(['/authentication']);
                });
            }

            if(user.updatedNickname){
                this.http.put("https://mytcgapp.firebaseio.com/users_details.json", {
                    //@ts-ignore
                    id: res.idToken,
                    email: user.updatedEmail ? user.updatedEmail : user.email,
                    nickname: user.updatedNickname
                })
            }
        })
    }

    updateEmail(userID: string){
       
    }
}