import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DbService } from '../services/db.service';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

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

  constructor(private authService: AuthenticationService, private dbService: DbService, private router: Router) { }

  ngOnInit() {
   this.isLoadingSub = this.authService.loaded.subscribe(res => this.isLoading = !res);
  }

  onLogIn(form: NgForm){
    let email = form.value.email;
    let password = form.value.password;

    this.isLoading = true;

    this.logInSub = this.authService.logIn(email, password).subscribe(users => {
      for(let user of users){
        if(user.email == email && user.password == password){
          this.authService.loggedIn.emit(true);                               
          this.router.navigate(['/home']);
         } 
        }
        this.authService.loaded.emit(true);
      });

      form.reset();  //the form input boxes return empty
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