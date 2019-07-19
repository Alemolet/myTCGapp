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
  private isLoggedIn: boolean = false;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.isLoggedInSub = this.authService.loggedIn.subscribe(res => this.isLoggedIn = res);
  }

  onLogOut(){
    this.authService.logOut();
  }

  ngOnDestroy(){
    this.isLoggedInSub.unsubscribe();
  }
}
