import { Component, OnInit, Input, OnDestroy, AfterViewInit, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DbService } from '../services/db.service';
import { AuthenticationService } from '../services/authentication.service';
import { BehaviorSubject, Subscription } from 'rxjs';

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

  //All the img sources underneath should be retrieved from db. This approach is due to prototyping purposes.

  private profilePicSource: string = "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png";
  private profilePics: string[] = ["https://oneneighborhoodbuilders.org/wp-content/uploads/2017/11/placeholder-profile-male-500x500.png",
                                   "https://www.shadyladiestours.com/wp-content/uploads/2017/07/profile-pic-placeholder.jpg",
                                   "https://www.turrinimobili.it/wp-content/uploads/2019/01/placeholder-profile-sq.0b9235c-300x300.jpg",
                                   "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"];
  private previewPicSource: string = this.profilePicSource; 
  private picChanged = new BehaviorSubject(false);
  private editEmail: boolean = false;
  private editPassw: boolean = false;
  private editNick: boolean = false;
  private editPic: boolean = false;
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

  onPicEdit(){
    this.editPic = true;
  }

  onPicSelection(index: number){
    this.previewPicSource = this.profilePics[index];
    this.profilePicSource != this.previewPicSource ? this.picChanged.next(true) : this.picChanged.next(false);
  }

  onBack(){
    this.editPic = false;
    this.picChanged.next(false);
  }

  onSavePic(){
    this.onBack();
    this.profilePicSource = this.previewPicSource;
    this.picChanged.next(false);
  }

  onSaveChanges(form: NgForm){
    this.dbService.updateUser({ email: this.authService.cuEmail,
                                password: this.authService.cuPassword,
                                updatedEmail: form.value.email, 
                                updatedPassword: form.value.password, 
                                updatedNickname: form.value.nickname});
    
    this.picChanged.value ? this.profilePicSource = this.previewPicSource : null;
    this.closeEdit();
    form.reset();
  }

  //check -- onClose() not finished
  onClose(form: NgForm){
    if(form.value.email || form.value.passw || form.value.nick){
       alert("Are you sure you want to close? All the changes will be discarded.");
    }

    this.previewPicSource = this.profilePicSource;
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
