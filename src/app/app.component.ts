import { Component, OnInit } from '@angular/core';
import { TemporaryDB } from './models/temporary-db.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { DbService } from './services/db.service';
import { slider } from './shared/animations';
import { RouterOutlet } from '@angular/router';

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

  constructor(private dbService: DbService){
  }

  ngOnInit(): void {
    TemporaryDB.generateCollection();
    this.isLoggedInSub = this.dbService.loggedIn.subscribe(res =>{
      this.isLoggedIn = res;
    } );
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData['animation'];
  }

  ngOnDestroy(){
  }
}
