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
  private ID: string;
  private isLoading = false;
  private isLoadingSub = new Subscription();
  private logInSub = new Subscription();
  private isRegistered = true;

  constructor(private authService: AuthenticationService, private dbService: DbService, private utilsService: UtilitiesService, private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit() {
   this.isLoadingSub = this.authService.loaded.subscribe(res => this.isLoading = !res);
  }

  onLogIn(form: NgForm){
    let email = form.value.email;
    let password = form.value.password;

    this.isLoading = true;

    this.logInSub = this.authService.logIn(email, password).subscribe(res => {
        //@ts-ignore
        this.ID = res.idToken;      //check if this operation is still needed/used
        this.dbService.loggedIn.emit(true); 
        this.utilsService.idEmitter.emit(this.ID);                            
        this.router.navigate(['/home']);
        this.authService.loaded.emit(true);
      }, err => {
        console.log(err.message);
        this.authService.loaded.emit(true);
      });

      form.reset(); 
    }
                                                                            

  onSignUp(form: NgForm){
    this.authService.signUp(form.value.email, form.value.password)
    .subscribe(res => console.log(res),
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