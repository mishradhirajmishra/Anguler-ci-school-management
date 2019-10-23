import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-attendance-analysis',
  templateUrl: './attendance-analysis.component.html',
  styleUrls: ['./attendance-analysis.component.css']
})
export class AttendanceAnalysisComponent implements OnInit {

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
    this.as.studentAttendanceAnalysis({'class_id':this.class_id,'section_id':this.section_id,'month':this.month}).subscribe(
     data=>{  this.attendanceReport=data;},
     error=>this.error=error      
   ) 
 }
  updateAttendance(id:number,attribute:string,value:any,class_id:number,name:string){
    this.as.updateStudentAttendance({'id':id,'attribute':attribute,'value':value,'class_id':class_id,'name':name,}).subscribe(
      data=>{ this.msg=data; },
      error=>this.error=error      
    ) 
  }


}
