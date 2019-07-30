import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';
import { AuthenticationService } from '../services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.css']
})
export class GameScreenComponent implements OnInit {
  private displayLogo: boolean;
  private isLoading: boolean = false;
  private isLoadingSub = new Subscription();

  constructor(private utilsService: UtilitiesService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.utilsService.showLogo.subscribe(res => this.displayLogo = res);
    this.isLoadingSub = this.authService.loaded.subscribe(res => this.isLoading = !res);
  }

}
