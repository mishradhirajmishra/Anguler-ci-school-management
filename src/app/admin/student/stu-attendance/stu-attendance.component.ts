import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stu-attendance',
  templateUrl: './stu-attendance.component.html',
  styleUrls: ['./stu-attendance.component.css']
})
export class StuAttendanceComponent implements OnInit {

  allStudentAttendance:any;
  error:{};
  classlist:{};
  class_id:string='';
  sectionlist:{};
  allAttendance:{};
  section_id:string='';
  date:Date;
  msg:string;
  arrayIndex=[{count:'10'},{count:'09'},{count:'08'},{count:'07'},{count:'06'},{count:'05'},{count:'04'},{count:'03'},{count:'02'},{count:'01'},];
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
     this.as.studentAttendance({'class_id':this.class_id,'section_id':this.section_id,'date':this.date}).subscribe(
      data=>{ this.allStudentAttendance=data.attendance; this.msg=data.msg; },
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
