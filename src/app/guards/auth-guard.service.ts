import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { DbService } from '../services/db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  private loggedIn: boolean = false;
 
  constructor(private dbService: DbService, private router: Router) { 
    this.dbService.loggedIn.subscribe(res => this.loggedIn = res)
  }
  
  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    
    if(this.loggedIn){
      return true;
    }

    this.router.navigate(['/authentication']);
    return false;
  }

}
