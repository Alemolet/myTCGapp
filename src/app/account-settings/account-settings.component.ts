import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  @Input() data: string[];   //You can access this array directly from the DOM

  editEmail: boolean = false;
  editPassw: boolean = false;
  editNick: boolean = false;

  constructor() {}

  ngOnInit() {
  }

  onEmailEdit(){
    this.editEmail = !this.editEmail;
  }

  onPasswEdit(){
    this.editPassw = !this.editPassw;
  }

  onNickEdit(){
    this.editNick = !this.editNick;
  }

  //check -- not finished
  onClose(form: NgForm){
    if(this.editEmail || this.editPassw || this.editNick){
       alert("Are you sure you want to close? All the changes will be discarded.");
    }
  }

}
