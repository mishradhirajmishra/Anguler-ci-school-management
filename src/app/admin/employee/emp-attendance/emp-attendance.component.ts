import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-attendance',
  templateUrl: './emp-attendance.component.html',
  styleUrls: ['./emp-attendance.component.css']
})
export class EmpAttendanceComponent implements OnInit {

  allEmployeeAttendance:any;
  error:{};
  classlist:{};
  class_id:string='';
  sectionlist:{};
  allAttendance:{};
  section_id:string='';
  date:Date;
  msg:string;
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
     this.as.employeeAttendance({'date':this.date}).subscribe(
      data=>{ this.allEmployeeAttendance=data.attendance; this.msg=data.msg; },
      error=>this.error=error      
    ) 
  }
  updateAttendance(id:number,value:any,name:string){
    this.as.updateEmployeeAttendance({'id':id,'value':value,'name':name}).subscribe(
      data=>{ this.msg=data;},
      error=>this.error=error      
    ) 
  }

}
