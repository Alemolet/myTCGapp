import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';
import { AuthenticationService } from '../services/authentication.service';
import { Subscription } from 'rxjs';
import { DbService } from '../services/db.service';
import { SuccessHandlerService } from '../services/success-handler.service';
import { RouterOutlet } from '@angular/router';
import { slider } from '../shared/animations';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.css'],
  animations:[ 
    slider
  ]
})

export class GameScreenComponent implements OnInit {
  private displayLogo: boolean;
  private isLoading: boolean = false;
  private isLoadingSub = new Subscription();
  private msg: { status: string, body: string };
  private user: string = '';

  constructor(  private utilsService: UtilitiesService, 
                private authService: AuthenticationService, 
                private dbService: DbService,
                private succService: SuccessHandlerService) { }

  ngOnInit() {
    this.utilsService.showLogo.subscribe(res => this.displayLogo = res);
    this.isLoadingSub = this.authService.loaded.subscribe(res => this.isLoading = !res);
    this.dbService.successMsg$.subscribe(successCode => {
      this.msg = {status: successCode, body: this.succService.updateUserSuccessHandler(successCode)};
    });
    this.dbService.getNickname(this.authService.cuEmail).subscribe(res => this.user = res);
    this.dbService.nicknameChange$.subscribe(res => this.user = res);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData['animation'];
  }

}
