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
  private accountData: string[] = [];

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.isLoggedInSub = this.authService.loggedIn.subscribe(res => this.isLoggedIn = res);

    this.accountData[0] = this.authService.cuEmail;
    this.accountData[1] = this.authService.cuPassword;
    this.accountData[2] = this.authService.nickGenerator();
  }

  onLogOut(){
    this.authService.logOut();
  }

  ngOnDestroy(){
    this.isLoggedInSub.unsubscribe();
  }
}
