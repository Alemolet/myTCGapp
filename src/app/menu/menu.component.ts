import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  @Output() collectionClicked = new EventEmitter<boolean>();
  isBtnCollectionClicked = false;
  nickname: string = '';

  constructor(private authService: AuthenticationService, private utilsService: UtilitiesService) { 
    this.nickname = this.authService.nickGenerator();
  }

  ngOnInit() {
  }

  onCollection(){
    this.isBtnCollectionClicked = !this.isBtnCollectionClicked
    this.collectionClicked.emit(this.isBtnCollectionClicked);
    this.utilsService.collectionClicked.emit(true);
  }
}
