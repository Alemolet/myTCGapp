import { Component, OnInit } from '@angular/core';
import { TemporaryDB } from './models/temporary-db.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { DbService } from './services/db.service';
import { slider } from './shared/animations';
import { RouterOutlet, Router } from '@angular/router';
import { StorageService } from './services/storage.service';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[ 
    slider
  ]
})
export class AppComponent implements OnInit {
  
  isLoggedInSub = new Subscription();
  isLoggedOutSub = new Subscription();
  isLoggedIn = false;

  constructor(private dbService: DbService,
              private storageService: StorageService,
              private authService: AuthenticationService,
              private router: Router){
  }

  ngOnInit(): void {
   TemporaryDB.generateCollection();
   this.isLoggedInSub = this.dbService.loggedIn.subscribe(res =>{
   this.isLoggedIn = res;});

   if(this.storageService.retrieveDataFromStorage().email){
     this.dbService.loggedIn.next(true);

     this.authService.logIn(this.storageService.retrieveDataFromStorage().email,this.storageService.retrieveDataFromStorage().password)
     .subscribe(res => {
       this.router.navigate(['/home']);
     });
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData['animation'];
  }

  ngOnDestroy(){
  }
}
