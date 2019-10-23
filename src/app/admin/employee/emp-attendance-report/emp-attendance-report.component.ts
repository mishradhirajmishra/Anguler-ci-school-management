import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-attendance-report',
  templateUrl: './emp-attendance-report.component.html',
  styleUrls: ['./emp-attendance-report.component.css']
})
export class EmpAttendanceReportComponent implements OnInit {
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
    this.allActiveClass();
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
  allActiveClass(){
    this.as.allActiveClass().subscribe(
      data=>{ this.classlist=data;},
      error=>this.error=error      
    )
  }
  getSectionFrm(){    
    this.as.allSectionOfClassWithoutSelect({'class_id':this.class_id}).subscribe(
      data=>{ this.sectionlist=data;},
      error=>this.error=error      
    )    
  }
  getAttendance(){
    this.as.employeeAttendanceReport({'month':this.month}).subscribe(
     data=>{  this.attendanceReport=data;
      if(this.attendanceReport){this.tableHeader=this.attendanceReport[0].report}},
     error=>this.error=error      
   ) 
 }

}
