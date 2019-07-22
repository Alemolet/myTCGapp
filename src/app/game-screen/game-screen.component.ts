import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.css']
})
export class GameScreenComponent implements OnInit {
  displayHome = true;

  constructor(private utilsService: UtilitiesService) { }

  ngOnInit() {
    this.utilsService.collectionClicked.subscribe(res => this.displayHome = !res)
  }

}
