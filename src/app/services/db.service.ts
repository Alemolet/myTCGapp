import { Card } from '../models/card.model';
import { TemporaryDB } from '../models/temporary-db.model';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from 'angularfire2/auth'
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'
import { Observable, BehaviorSubject, Subject } from 'rxjs';


@Injectable()
export class DbService{
    
    cardRemoved = new EventEmitter<{flag: boolean, id: number}>();
    loggedIn = new BehaviorSubject<boolean>(false);
    nicknameChange$ = new Subject();

    private dbUrl: string = 'https://mytcgapp.firebaseio.com/';
    private API_KEY: string = 'AIzaSyBSu_yoiOQ2kkxh7gSCJG1O3uAOvr3jjcQ';
    private userID: string = '';

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
        return this.http.post(this.dbUrl + 'collection.json', {
            id: card.id,
            name: card.name,
            description: card.description,
            type: card.type,
            imgPath: card.imgPath
        });
    }

    postUser(user: {email: string, password: string, nickname: string}){
        this.http.post(this.dbUrl + 'accounts.json', {
            email: user.email,
            password: user.password,
            nickname: user.nickname
        }).subscribe();
        
        return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.API_KEY, {
            email: user.email,
            password: user.password,
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

    getAllUsers(){
        return this.http.get(this.dbUrl + 'accounts.json');
    }

    generateUserID(email: string){
        return this.getAllUsers().subscribe(res => {
            for(const key in res){
                res[key].email === email ? this.userID = key : null;
            }
        })
    }

    getNickname(email: string): Observable<string>{
        const result = this.getAllUsers();
        
        return result.pipe(map(res => {
            let users = [];

            for(let key in res){
                users.push({...res[key]});
            }
            
            users.filter(user => user.email === email);

            return users[0].nickname;
        }));
    }

    updateUser(user: { 
                email: string,
                password: string, 
                updatedEmail: string, 
                updatedPassword: string, 
                updatedNickname: string
            }){

        /*1: find the user to update in the Db;*/

        this.http
        .post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.API_KEY, {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        })
        /*Check if updatedEmail/Password/Nickname are not empty => send a proper http POST/PUT
         request*/ 
        .subscribe(res => {
            if(user.updatedEmail){
                this.updateEmail(res, user.updatedEmail);
            }

            if(user.updatedPassword){
                this.updatePassword(res, user.updatedPassword);
            }

            if(user.updatedNickname){
                this.updateNickname(user.email, user.password, user.updatedNickname);
            }
        })
    }

    updateEmail(res: Object, newEmail: string){
        this.http.post("https://identitytoolkit.googleapis.com/v1/accounts:update?key=" + this.API_KEY, {
            //@ts-ignore
            idToken: res.idToken,  
            email: newEmail,
            returnSecureToken: false
        }).subscribe(res => {
            alert("Your e-mail address has been succesfully changed. Log in again to see the changes!");
            this.af.auth.signOut(); //is this actually doing something?
            this.loggedIn.next(false);
            this.router.navigate(['/authentication']);
        });
    }

    updatePassword(res: Object, newPassword: string){
        this.http.post("https://identitytoolkit.googleapis.com/v1/accounts:update?key=" + this.API_KEY, {
            //@ts-ignore
            idToken: res.idToken,   
            password: newPassword,
            returnSecureToken: false     
        }).subscribe(res => {
            alert("Your password has been succesfully changed. You need to log in again to confirm the changes.");
            this.af.auth.signOut(); //is this actually doing something?
            this.loggedIn.next(false);
            this.router.navigate(['/authentication']);
        });
    }

    updateNickname(email: string, password: string, newNick: string){
        this.http.put(this.dbUrl + 'accounts/' + this.userID + '.json', {
            email: email,
            password: password,
            nickname: newNick
        }).subscribe(res => {
            this.nicknameChange$.next(newNick);
        }, err => console.log(err)) 
    }
}