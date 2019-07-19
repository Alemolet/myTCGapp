import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Card } from '../models/card.model';
import { Type } from '../models/Type.enum';
import { DbService } from '../services/db.service';
import { Subscriber, Subscription } from 'rxjs';
import { TemporaryDB } from '../models/temporary-db.model';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit, OnDestroy {

  @Input() card: Card;

  private id: number = 0;
  private name: string = '';
  private description: string = '';
  private imgPath: string = '';
  private type: Type;
  private isSelected: boolean = false; 
  private isRemovedSub = new Subscription(); 

  constructor(private dbService : DbService) { }

  ngOnInit() {
    this.name = this.card.name;
    this.description = this.card.description;
    this.imgPath = this.card.imgPath;
    this.type = this.card.type;
    this.id = this.card.id;
    this.isRemovedSub = this.dbService.cardRemoved
    .subscribe(res => {
      if(res.id == this.id){
        this.isSelected = false;
      } 
    });
  }

  onCardClick(){
    let selectedCard = new Card(this.id, this.name, this.description, this.type, this.imgPath);
    this.isSelected = !this.isSelected;

    //Check if the card selected is already contained in the deck;
    //if it is not, add and highlight it.

    if(!this.dbService.doesDeckContain(selectedCard)){
    
    this.dbService.addCard(selectedCard);
    } 

    //otherwise, remove the highlight from it.
    else{
      let index = 0;

      for(let i = 0; i<TemporaryDB.deck.length; i++){
        if(TemporaryDB.deck[i].name == selectedCard.name){
          index = i;
          i = TemporaryDB.deck.length;
        }
      }
      this.dbService.removeCard(index, selectedCard);
    }
  }

  ngOnDestroy(){
    this.isRemovedSub.unsubscribe();
  }
}
