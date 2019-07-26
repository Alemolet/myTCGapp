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
  private isLoading = false;
  private isLoadingSub = new Subscription();
  private logInSub = new Subscription();
  private isRegistered = true;
  private data: string[] = [];

  constructor(private authService: AuthenticationService, private dbService: DbService, private utilsService: UtilitiesService, private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit() {
   this.isLoadingSub = this.authService.loaded.subscribe(res => this.isLoading = !res);
  }

  onLogIn(form: NgForm){
    this.email = form.value.email;
    this.password = form.value.password;
    this.isLoading = true;

    this.dbService.generateUserID(this.email);
    this.logInSub = this.authService.logIn(this.email, this.password)
        .subscribe(res => {       
          this.dbService.loggedIn.emit(true);                      
          setTimeout(() => {
            this.router.navigate(['/home']);
            this.authService.loaded.emit(true);
          }, 5000); 
        }, err => {
          console.log(err.message);
          this.authService.loaded.emit(true);
      });
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
  }
}