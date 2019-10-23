import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance-summery',
  templateUrl: './attendance-summery.component.html',
  styleUrls: ['./attendance-summery.component.css']
})
export class AttendanceSummeryComponent implements OnInit {
 
  allClass: {};
  error: {};
  msg:string;

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
    this.as.attendanceSummery().subscribe(
      data => { this.allClass = data; },
      error => this.error = error
    )
  }





}
