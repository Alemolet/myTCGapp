import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UtilitiesService } from '../services/utilities.service';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  private nickname: string = '';

  constructor( private authService: AuthenticationService, 
               private dbService: DbService, 
               private utilsService: UtilitiesService) { 
  }

  ngOnInit() {
    this.dbService.getNickname(this.authService.cuEmail)
     .subscribe(nickname => {
       //@ts-ignore
       this.nickname = nickname;
     });

     this.dbService.nicknameChange$.subscribe(newNick => {
       this.nickname = newNick.toString();
     });
  }

  onCollection(){
    this.utilsService.showLogo.next(false);
  }
}
