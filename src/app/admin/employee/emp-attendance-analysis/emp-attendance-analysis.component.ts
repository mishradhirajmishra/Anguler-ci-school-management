import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-attendance-analysis',
  templateUrl: './emp-attendance-analysis.component.html',
  styleUrls: ['./emp-attendance-analysis.component.css']
})
export class EmpAttendanceAnalysisComponent implements OnInit {
  attendanceReport:any;
  error:{};
  classlist:{};
  class_id:string='';
  sectionlist:{};
  allAttendance:{};
  section_id:string='';
  month:number;
  msg:string;
  tableHeader:{};
  constructor(private as:AdminService,private router:Router) { }
  ngOnInit() {

    this.chkLogedIn();
  }
  token:string;
  chkLogedIn() {
 this.token = localStorage.getItem('sch');
 this.as.chkLogedIn({ 'token': this.token }).subscribe(
   data => { if (data == false) { localStorage.clear(); this.router.navigate(['/login']) } },
   error => { this.error = error; localStorage.clear(); window.location.replace(window.location.origin + '/login');; }
 )
}
  onSubmit(){  }

  getAttendance(){
    this.as.employeeAttendanceAnalysis({'month':this.month}).subscribe(
     data=>{  this.attendanceReport=data;},
     error=>this.error=error      
   ) 
 }

}
