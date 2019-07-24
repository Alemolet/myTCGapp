import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DbService } from '../services/db.service';
import { NgForm } from '@angular/forms';
import { UtilitiesService } from '../services/utilities.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  private email: string;
  private password: string;
  private idToken: string;
  private userID: string;
  private isLoading = false;
  private isLoadingSub = new Subscription();
  private logInSub = new Subscription();
  private getNicknameSub = new Subscription();
  private isRegistered = true;
  private data: string[] = [];

  constructor(private authService: AuthenticationService, private dbService: DbService, private utilsService: UtilitiesService, private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit() {
   this.isLoadingSub = this.authService.loaded.subscribe(res => this.isLoading = !res);
  }

  onLogIn(form: NgForm){
    let email = form.value.email;
    let password = form.value.password;
    let nickname: string;

    this.getNicknameSub = this.dbService.getNickname(email).subscribe(users => {
      for(let user of users){
        if(user.email === email){
            this.userID = user.id;
            nickname = user.nickname;
            console.log("value found in db: " + user.nickname);
        }
      }
  });
  
    this.isLoading = true;

    setTimeout(() => {
    
      this.logInSub = this.authService.logIn(email, password, nickname).subscribe(res => {
          
        //@ts-ignore
        this.ID = res.idToken;      //check if this operation is still needed/used
        
        /*These data'll be catched by the AccountSettingsComponent*/
        this.data.push(email);
        this.data.push(password);
        this.data.push(nickname); 

        this.authService.data.emit(this.data);
        this.dbService.loggedIn.emit(true);
        this.utilsService.idEmitter.emit(this.idToken);                         
        this.router.navigate(['/home']);
        this.authService.loaded.emit(true); 
      }, err => {
        console.log(err.message);
        this.authService.loaded.emit(true);
      });
  }, 4000);
    
    }
                                                                            

  onSignUp(form: NgForm){
    this.authService.signUp(form.value.email, form.value.password)
    .subscribe(res => {},
    err => {
      console.log(err);
      alert(err.message);
    });
  }

  onLinkClick(form: NgForm){
    this.isRegistered = !this.isRegistered;
    form.reset();
  }

  ngOnDestroy(){
    this.isLoadingSub.unsubscribe();
    this.logInSub.unsubscribe();
    this.getNicknameSub.unsubscribe();
  }
}