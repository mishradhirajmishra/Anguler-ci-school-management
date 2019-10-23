
import { Injectable } from '@angular/core';
import {  HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() {}
  authToken = localStorage.getItem('sch');
  intercept(req, next) {
   let   tokenreq = req.clone({
          setHeaders:
               { Authorization: `Bearer ${this.authToken}` }
           }
       );
      return next.handle(tokenreq);
  }
}