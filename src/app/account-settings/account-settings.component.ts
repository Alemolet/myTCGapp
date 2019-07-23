import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DbService } from '../services/db.service';
import { AuthenticationService } from '../services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit, OnDestroy {
  @Input() data: string[];   //You can access this array directly from the DOM

  idEmitterSub = new Subscription();
  userID: string = '';
  editEmail: boolean = false;
  editPassw: boolean = false;
  editNick: boolean = false;

  constructor(private dbService: DbService, private authService: AuthenticationService) {}

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

  onSaveChanges(form: NgForm){
    this.dbService.updateUser({ email: this.authService.cuEmail,
                                password: this.authService.cuPassword,
                                updatedEmail: form.value.email, 
                                updatedPassword: form.value.password, 
                                updatedNickname: form.value.nickname});

    form.reset();
  }

  //check -- onClose() not finished
  onClose(){
    if(this.editEmail || this.editPassw || this.editNick){
       alert("Are you sure you want to close? All the changes will be discarded.");
    }
  }

  ngOnDestroy(){
    this.idEmitterSub.unsubscribe();
  }

}
