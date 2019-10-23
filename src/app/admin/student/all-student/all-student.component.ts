import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-all-student',
  templateUrl: './all-student.component.html',
  styleUrls: ['./all-student.component.css']
})
export class AllStudentComponent implements OnInit {
  allStudent:any;
  error:{};
  classlist:{};
  sectionlist:{};
  guardianList:{};
  msg:string;
  showFormVar:boolean=false;
  nameFilter: any = { class_id: '',student_name:'' };
  // ----------------------------
  sr_no: string;
  admission_no: string;
  student_name: string;
  class_id: string;
  section_id: string;
  guardian_key:string;
  constructor(private as:AdminService,private router:Router) { }

  ngOnInit() {
    this.allStdent();
    this.allActiveClass();
    this.allGuardian();
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
  onSubmit(){
    this.as.addStudent({'data':{'sr_no':this.sr_no,'admission_no':this.admission_no,'student_name':this.student_name,
  'class_id':this.class_id,'section_id':this.section_id,'guardian_key':this.guardian_key}}).subscribe(
      data=>{this.msg=data.msg;this.allStdent();
        this.sr_no='';
        this.admission_no='';
        this.student_name='';
        this.class_id='';
        this.section_id='';
        this.guardian_key='';
      },
      error=>this.error=error      
    )
  }
  allActiveClass(){
    this.as.allActiveClass().subscribe(
      data=>{ this.classlist=data;},
      error=>this.error=error      
    )
  }
  getSectionFrm(e){
    
    this.as.allSectionOfClass({'class_id':e.target.value}).subscribe(
      data=>{ this.sectionlist=data;},
      error=>this.error=error      
    )
    
  }
  showForm(){
   
 if(this.showFormVar){this.showFormVar=false}else{this.showFormVar=true}
  }
  getSection(e:any,index:number){    
    this.as.allSectionOfClass({'class_id':e.target.value}).subscribe(
      data=>{ this.allStudent[index].section_list=data;this.allStudent[index].section_id='0'},
      error=>this.error=error      
    )
    
  }
  allGuardian(){
    this.as.allGuardian().subscribe(
      data=>{ this.guardianList=data;},
      error=>this.error=error      
    )
  }
   allStdent(){
    this.as.allStudent().subscribe(
      data=>this.allStudent=data,
      error=>this.error=error      
    )
   }
   update(student_key:string,guardian_key:string,class_id:string,section_id:number){
    this.as.updateStudent({'student_key':student_key,'data':{'guardian_key':guardian_key,'class_id':class_id,'section_id':section_id}}).subscribe(
      data=>{this.msg=data.msg;},
      error=>this.error=error      
    )
   }
   edit(key:string){
     this.router.navigate(['/admin/student/edit-student/'+key])
   }
   detail(key:string){
    this.router.navigate(['/admin/student/student-detail/'+key])
  }

}
