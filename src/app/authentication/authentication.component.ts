import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { DbService } from '../services/db.service';
import { NgForm } from '@angular/forms';
import { UtilitiesService } from '../services/utilities.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { ErrorHandlerService } from '../services/error-handler.service';
import { SuccessHandlerService } from '../services/success-handler.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  private email: string;
  private password: string;
  private isLoading = false;
  private isLoadingSub = new Subscription();
  private logInSub = new Subscription();
  private isRegistered = true;
  private userFound = false;
  private timer: number = 0;
  private error: string = '';
  private success: {status: string, body: string};
  private dots: string = '';
  private dotTimer: number = 1;
  private dot$ = new BehaviorSubject<string>('.');

  constructor( private authService: AuthenticationService, 
               private dbService: DbService, private utilsService: UtilitiesService, 
               private router: Router, private afAuth: AngularFireAuth, 
               private errorHandler: ErrorHandlerService,
               private successHandler: SuccessHandlerService,
               private storageService: StorageService) { }

  ngOnInit() {
   this.isLoadingSub = this.authService.loaded.subscribe(res => this.isLoading = !res);
   this.dot$.subscribe(res => this.dots = res);
  }

  onLogIn(form: NgForm){
    this.email = form.value.email;
    this.password = form.value.password;
    this.isLoading = true;

    /* Loading dots animation */
    let intervalId = setInterval(() => {
      this.dots === '...' ? this.dotTimer = 1 : this.dotTimer++;
      this.timer === 3 ? this.dotTimer = 1 : null;
      this.dot$.next('.'.repeat(this.dotTimer));
      this.userFound ? clearInterval(intervalId) : null;
    },850);

    this.loadHomePage();

    /*Actual HTTP Log in request*/
    this.dbService.generateUserID(this.email);
    this.logInSub = this.authService.logIn(this.email, this.password)
        .subscribe(res => {
          this.dbService.loggedIn.next(true);
          setTimeout(()=>{
            this.userFound = true;
            this.storageService.populateStorage(this.email, this.password);
          }
          ,5000)       
        }, err => {
          this.error = this.errorHandler.loginErrorHandler(err.error.error.message); //saving the error msg to display in the alert
          this.authService.loaded.emit(true);
      });

      this.error = ''; //resetting the error text msg
    }                                                                      

  onSignUp(form: NgForm){
    this.authService.signUp(form.value.email, form.value.password)
    .subscribe(res => {
      this.success = { status: null, body: this.successHandler.signUpSuccessHandler() };
    },
    err => {
      console.log(err);
      alert(err.message);
    });
  }

  onLinkClick(form: NgForm){
    this.isRegistered = !this.isRegistered;
    form.reset();
  }

  loadHomePage(){
    /*Trying to navigate to '/home' every sec (max 5sec) until user succesfully logged in*/
    let intervalId = setInterval(() => {
      this.timer++;

      if(this.userFound){
        this.timer = 0; 
        this.authService.loaded.emit(true);
        this.userFound = false;
        this.router.navigate(['/home']);
        clearInterval(intervalId);
      } 
      /*Handling the case in which no user has been found in db and setInterval needs to be stopped*/
      if(this.timer>5 && !this.userFound){
        this.timer = 0;
        clearInterval(intervalId);
      }
    }, 1000);
  } 
  
  ngOnDestroy(){
    this.isLoadingSub.unsubscribe();
    this.logInSub.unsubscribe();
  }
}