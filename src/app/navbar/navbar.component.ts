import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { DbService } from '../services/db.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private isLoggedInSub = new Subscription();
  private userData: User;
  private userDataSub = new Subscription();
  private isLoggedIn: boolean = false;

  constructor(  private authService: AuthenticationService, 
                private dbService: DbService, 
                private storageService: StorageService,
                private router: Router){}

  ngOnInit() {
    this.isLoggedInSub = this.dbService.loggedIn.subscribe(res => {
      this.isLoggedIn = res;
      //@ts-ignore
     this.userDataSub = this.authService.userInfoInit().subscribe(user => this.userData = { ...user });
    });
  }

  onLogOut(){
    this.authService.loaded.emit(false);
    this.authService.logOut();
    this.storageService.clearStorage();
    setTimeout(() => {
      this.authService.loaded.emit(true);
      this.router.navigate(['/authentication']);
    }, 4000);
  }

  ngOnDestroy(){
    this.isLoggedInSub.unsubscribe();
    this.userDataSub.unsubscribe();
  }
}
