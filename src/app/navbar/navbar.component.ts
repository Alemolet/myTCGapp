import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private isLoggedInSub = new Subscription();
  private dataSub = new Subscription();
  private isLoggedIn: boolean = false;
  private accountData: string[] = [];

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.isLoggedInSub = this.authService.loggedIn.subscribe(res => this.isLoggedIn = res);
    this.dataSub = this.authService.data.subscribe(res => this.accountData = res);
  }

  onLogOut(){
    this.authService.logOut();
    console.log("data emitted and catched in navbar component were: " + this.accountData);
  }

  ngOnDestroy(){
    this.isLoggedInSub.unsubscribe();
    this.dataSub.unsubscribe();
  }
}
