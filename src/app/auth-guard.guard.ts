import { Injectable, OnInit } from '@angular/core';
import { CanActivate,Router, CanActivateChild } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements  CanActivate,CanActivateChild  {
  token:string 
  role:string;
  helper = new JwtHelperService();   
  constructor(private router:Router){ 
    this.token = localStorage.getItem('sch');
    this.token=this.helper.decodeToken(this.token);
    this.role=this.token['role'];
   }

  canActivate(){   
    if(this.role=='admin'){  return true; } else { this.router.navigate(['login']);
    }
  }
  canActivateChild(){   
    if(this.role=='admin'){  return true; } else { this.router.navigate(['login']);
    }
  }
}
