import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fee-summery',
  templateUrl: './fee-summery.component.html',
  styleUrls: ['./fee-summery.component.css']
})
export class FeeSummeryComponent implements OnInit {
 
  allClass: {};
  error: {};


  edit: boolean = false;
  token:string;
   constructor(private as: AdminService,private router:Router) { }
  ngOnInit() { this.getAttendance() ; this.chkLogedIn(); }
  chkLogedIn() {
    this.token = localStorage.getItem('sch');
    this.as.chkLogedIn({ 'token': this.token }).subscribe(
      data => { if (data == false) { localStorage.clear(); this.router.navigate(['/login']) } },
      error => { this.error = error; localStorage.clear(); window.location.replace(window.location.origin + '/login');; }
    )
  } 

  getAttendance() {
    this.as.feeSummery().subscribe(
      data => { this.allClass = data; },
      error => this.error = error
    )
  }



}
