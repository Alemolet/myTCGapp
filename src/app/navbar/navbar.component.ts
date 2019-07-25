import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private isLoggedInSub = new Subscription();
  private userData: string[] = [];
  private isLoggedIn: boolean = false;

  constructor(private authService: AuthenticationService, private dbService: DbService) { }

  ngOnInit() {
    this.isLoggedInSub = this.dbService.loggedIn.subscribe(res => {
      this.isLoggedIn = res;
      this.dbService.getNickname(this.authService.cuEmail).then(result => {    
        for(const key in result){
           if(result[key].email === this.authService.cuEmail){
              this.userData.push(result[key].email);
              this.userData.push(result[key].password);
              this.userData.push(result[key].nickname);
            }
          }
        }
      );
    });
  }

  onLogOut(){
    this.authService.logOut();
  }

  ngOnDestroy(){
    this.isLoggedInSub.unsubscribe();
  }
}
