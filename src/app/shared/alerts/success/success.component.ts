import { Component, OnInit, Input } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
  animations: [
    trigger('fadeInAndOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('3s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('3s', style({ opacity: 0 })),
      ])
  ])
]
})
export class SuccessComponent implements OnInit {
  @Input() msg: string;
  
  constructor(private dbService: DbService, private router: Router) { }

  ngOnInit() {
  }

  onClose(){
      this.dbService.successMsg$.emit('');
       /* Forced logout and a new log in is requested after email or password update*/
      if(this.msg != "Your nickname has been correctly updated. Amazing!"){ //Gotta make a new control asap, just testing purpose
        this.dbService.loggedIn.next(false);
        this.router.navigate(['/authentication']);
      }
  }
}
