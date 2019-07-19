import { Component, OnInit } from '@angular/core';
import { TemporaryDB } from './models/temporary-db.model';
import { AuthenticationService } from './services/authentication.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  isBtnCollectionClicked: boolean = false;
  isLoggedInSub = new Subscription();
  isLoggedOutSub = new Subscription();
  isLoggedIn = false;

  constructor(private authService: AuthenticationService){
  }
  ngOnInit(): void {
    TemporaryDB.generateCollection();
    this.isLoggedInSub = this.authService.loggedIn.subscribe(res =>{
      this.isLoggedIn = res;
    } );
  }

  onCollectionClicked(buttonClicked: boolean){
    this.isBtnCollectionClicked = buttonClicked;
  }

  ngOnDestroy(){
  }
}
