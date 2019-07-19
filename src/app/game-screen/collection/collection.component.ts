import { Component, OnInit } from '@angular/core';
import { TemporaryDB } from 'src/app/models/temporary-db.model';
import { Card } from 'src/app/models/card.model';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  private cardCollection: Array<Card> = [];
  private deck: Array<Card> = [];

  constructor(private dbService: DbService) {}

  ngOnInit() {
    this.cardCollection = TemporaryDB.CardCollection;
    this.deck = TemporaryDB.deck;
  }

  isDeckEmpty(){
    return this.dbService.hasCards() ? false : true;
  }

  
}
