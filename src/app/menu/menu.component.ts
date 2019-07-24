import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UtilitiesService } from '../services/utilities.service';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  @Output() collectionClicked = new EventEmitter<boolean>();
  private isBtnCollectionClicked = false;
  private nickname: string = '';

  constructor(private authService: AuthenticationService, private dbService: DbService, private utilsService: UtilitiesService) { 
  this.nickname = this.authService.cuNickname;
  }

  ngOnInit() {
  }

  onCollection(){
    this.isBtnCollectionClicked = !this.isBtnCollectionClicked
    this.collectionClicked.emit(this.isBtnCollectionClicked);
    this.utilsService.collectionClicked.emit(true);
  }
}
