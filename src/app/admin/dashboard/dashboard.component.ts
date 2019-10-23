import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  token: string;
  dashboardItems:any;
  helper = new JwtHelperService();
  error: {};

  constructor(private as: AdminService, private router: Router) { }

  ngOnInit() {
    this.token = localStorage.getItem('sch'); this.chkLogedIn();
    this.getDashboardItems() ;
  }

  chkLogedIn() {
    this.token = localStorage.getItem('sch');
    this.as.chkLogedIn({ 'token': this.token }).subscribe(
      data => { if (data == false) { localStorage.clear(); this.router.navigate(['/login']) } },
      error => { this.error = error; localStorage.clear(); window.location.replace(window.location.origin + '/login');; }
    )
  }
  getDashboardItems() {
    this.as.desktopIcon().subscribe(
      data => { this.dashboardItems=data},
      error => { this.error = error; }
    )
  }
  // dashboard() {
  //   this.router.navigate(['admin/dashboard']);
  // }
  // employee() {
  //   this.router.navigate(['admin/employee']);
  // }
}
