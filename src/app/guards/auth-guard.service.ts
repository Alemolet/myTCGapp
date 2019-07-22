import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  private loggedIn: boolean = false;
 
  constructor(private authService: AuthenticationService, private router: Router) { 
    this.authService.loggedIn.subscribe(res => this.loggedIn = res)
  }
  
  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    
    if(this.loggedIn){
      return true;
    }

    this.router.navigate(['/authentication']);
    return false;
  }

}
