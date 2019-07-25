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
  this.dbService.getNickname(this.authService.cuEmail).then(result => {    
      for(const key in result){
          result[key].email === this.authService.cuEmail ? this.nickname = result[key].nickname : null;
        }
      }
    );
  }

  ngOnInit() {
  }

  onCollection(){
    this.isBtnCollectionClicked = !this.isBtnCollectionClicked
    this.collectionClicked.emit(this.isBtnCollectionClicked);
    this.utilsService.collectionClicked.emit(true);
  }
}
