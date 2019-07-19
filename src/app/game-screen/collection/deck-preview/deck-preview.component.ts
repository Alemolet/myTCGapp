import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { TemporaryDB } from 'src/app/models/temporary-db.model';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-deck-preview',
  templateUrl: './deck-preview.component.html',
  styleUrls: ['./deck-preview.component.css']
})
export class DeckPreviewComponent implements OnInit {

  updatedDeck: Array<Card> = TemporaryDB.deck;
  tot: number = 0;

  constructor(private dbService: DbService) { }

  ngOnInit() {
  }

  onRemove(index: number, card: Card){
    this.dbService.removeCard(index, card);
  }

  checkTot(){
    return this.tot = this.updatedDeck.length;
  }

}
