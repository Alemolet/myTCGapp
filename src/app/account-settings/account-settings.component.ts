import { Component, OnInit, Input, OnDestroy, AfterViewInit, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DbService } from '../services/db.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit, OnDestroy, OnChanges {

  @Input('userData') userInfo: {
    _email: string,
    _password: string,
    _nickname: string
  };

  private profilePicSource: string = "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png";
  private editEmail: boolean = false;
  private editPassw: boolean = false;
  private editNick: boolean = false;
  private email: string = '';
  private password: string = '';
  private nickname: string = '';
  private msg: string = '';

  constructor(private dbService: DbService, private authService: AuthenticationService) {  
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if(this.userInfo){
      this.email = this.userInfo._email;
      this.password = this.userInfo._password;
      this.nickname = this.userInfo._nickname;

      this.dbService.nicknameChange$.subscribe(newNick => {
        this.nickname = newNick.toString();
      });
    }
  }

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
    
    this.closeEdit();
    form.reset();
  }

  //check -- onClose() not finished
  onClose(form: NgForm){
    if(form.value.email || form.value.passw || form.value.nick){
       alert("Are you sure you want to close? All the changes will be discarded.");
    }

    this.closeEdit();
    form.reset();
  }

  closeEdit(){
    //closing all the input blocks eventually opened
    this.editEmail = false; 
    this.editPassw = false;
    this.editNick = false;
  }

  ngOnDestroy(){
  }

}
