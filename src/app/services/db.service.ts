import { Card } from '../models/card.model';
import { TemporaryDB } from '../models/temporary-db.model';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable()
export class DbService{

    cardRemoved = new EventEmitter<{flag: boolean, id: number}>();
    private url: string = 'https://mytcgapp.firebaseio.com/';

    constructor(private http: HttpClient){}

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

    postUser(user: User){
        return this.http.post(this.url + 'users.json', {
            id: user.id,
            email: user.email,
            password: user.password
        });
    }

    getUser(user: {email: string, password: string}){
        let parameters = new HttpParams();

        parameters.append('email', user.email);
        parameters.append('password', user.password);

        return this.http.get(this.url + 'users.json', {
            params: parameters
        })
    }
}