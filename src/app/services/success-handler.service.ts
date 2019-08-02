import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SuccessHandlerService {

constructor() { }

updateUserSuccessHandler(successCode: string){
  let successMessage = '';

  switch(successCode){
    case 'EMAIL_CHANGED': successMessage = "Your e-mail address has been succesfully changed. Log in again to see the changes!";
                            break;
    case 'PASSW_CHANGED': successMessage = "Your password has been succesfully changed. You need to log in again to confirm the changes.";
                            break;
    case 'NICK_CHANGED': successMessage = "Your nickname has been correctly updated. Amazing!"
                            break;
  }

  return successMessage;
  }

  signUpSuccessHandler(){
    return "Welcome! We've been waiting for you for such a long time! Hurry up and sign in!";
  }
}
