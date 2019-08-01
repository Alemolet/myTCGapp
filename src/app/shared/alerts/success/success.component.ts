import { Component, OnInit, Input } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { Router } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
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
export class SuccessComponent implements OnInit {
  @Input() msg: string;

  private successCodes: string[] = ["EMAIL_CHANGED", "PASSW_CHANGED", "NICK_CHANGED"];
  
  constructor(  private dbService: DbService, 
                private router: Router ) { }

  ngOnInit() {
    
    /*Visualize the alert for max 3 secs if the user doesn't press the button closing it themselves*/
    setTimeout(()=>{
      if(this.msg != this.successCodes[0] && this.successCodes[1])
        this.msg = null;
    },3000);
  }

  onClose(){
      this.dbService.successMsg$.emit('');
       /* Forced logout and a new log in is requested after email or password update*/
      if(this.msg != this.successCodes[2]){ //Gotta make a new control asap, just testing purposes
        this.dbService.loggedIn.next(false);
        this.router.navigate(['/authentication']);
        this.msg = null;
      }
  }
}
