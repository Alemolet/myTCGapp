import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

constructor() { }

loginErrorHandler(errorCode: string){
  let errorMessage = '';

  switch(errorCode){
    case 'EMAIL_NOT_FOUND': errorMessage = "Wrong e-mail and/or password. Try logging in again.";
                            break;
    case 'INVALID_PASSWORD': errorMessage = "Wrong e-mail and/or password. Try logging in again.";
                            break;
    case 'USER_DISABLED': errorMessage = "You've been banned by an admin. You should've received more info via e-mail; " + 
                                         "check your in-box. Do not hesitate contacting us for further info."
                                          break;
    default: errorMessage = "A random error occurred. Please, try again in a few minutes. If you keep facing this error, contact us."
  }

  return errorMessage;
}

}
