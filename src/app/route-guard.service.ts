import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';

@Injectable()
export class RouteGuardService implements CanActivate {
  constructor(private router : Router){}
  canActivate(route : ActivatedRouteSnapshot) : boolean {
    if(Cookie.get("authToken") === undefined || Cookie.get("authToken") === "" || Cookie.get("authToken") === null) {
      this.router.navigate(["/"])
      return false
    } else {
      return true
    }
  }

}
