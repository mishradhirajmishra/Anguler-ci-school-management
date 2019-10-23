import { Component, OnInit } from '@angular/core';
import {MainSericeService  } from "../main.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string;
  password:string;
  error:any;
  msg:string;
  show:boolean=false;
  constructor(private ms:MainSericeService,private router:Router) { }
  ngOnInit() {
  }
  viewLogin(){
    this.show=true;
  }
  login(){
     this.ms.login({'username':this.username,'password':this.password}).subscribe(
      data =>{ this.msg = data.msg ;
        if(data.status==true){
         localStorage.clear();
         localStorage.setItem('sch',data.data);
         this.router.navigate(['/admin/dashboard']);
        }
        else{
          localStorage.clear();
          this.router.navigate(['/login'])
        }

       },
      error => this.error = error
    )
  }
}
