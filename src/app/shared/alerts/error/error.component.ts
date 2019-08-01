import { Component, OnInit, Input } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  animations: [
    trigger('fadeInAndOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('2.5s', style({ opacity: 0 })),
      ])
  ])
]
})
export class ErrorComponent implements OnInit {
  @Input('error') msg: string;

  constructor() { }

  ngOnInit() {
     /*Visualize the alert for max 5 secs if the user doesn't press the button closing it themselves*/
     setTimeout(()=>{
       this.msg = null;
     },5000);
  }

}
