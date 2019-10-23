import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from './admin.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  openvar: boolean = true;
  btntext = 'Close';
  logo: string;
  error: {};
  status: boolean;
  constructor(public router: Router, private as: AdminService) { }

  ngOnInit() {
    this.getlogo();
   }

  close() {
    this.openvar = false; this.btntext = 'Open';
  }

  open() {
    if (this.openvar) { this.openvar = false; this.btntext = 'Open'; }
    else { this.openvar = true; this.btntext = 'Close'; }
  }

  getlogo() {
    this.as.logo().subscribe(
      data => { this.logo = data; },
      error => this.error = error
    )
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  

}
