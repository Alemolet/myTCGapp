import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  @Output() collectionClicked = new EventEmitter<boolean>();
  isBtnCollectionClicked = false;

  constructor() { }

  ngOnInit() {
  }

  onCollection(){
    this.isBtnCollectionClicked = !this.isBtnCollectionClicked
    this.collectionClicked.emit(this.isBtnCollectionClicked);
  }

}
