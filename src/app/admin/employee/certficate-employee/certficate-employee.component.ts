import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder,Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-certficate-employee',
  templateUrl: './certficate-employee.component.html',
  styleUrls: ['./certficate-employee.component.css']
})
export class CertficateEmployeeComponent implements OnInit {
  employee_key:string;
  error:{};
  msg:string;
  employee:any;
  student:any;
  headText="Add";
  allQualification:{};
  hideForm:boolean=true;
 constructor(public router:Router,private fb: FormBuilder,private as:AdminService,private actroute: ActivatedRoute,) { }
 guprofileForm = this.fb.group({  
  qualification_id: [''],
  course: ['abc',Validators.required],
  board:['xyz',Validators.required],
  course_duration: [''],
  year: [''],
  subjects: [''],
  marks_achieved: [''],
 
  specialisation: ['']
  });
  ngOnInit() {
    this.getidFromUrl();

    this.allQualificationByEmployeeKey();
    this.employeeByKey();this.chkLogedIn();
  }
  token:string;
  chkLogedIn() {
 this.token = localStorage.getItem('sch');
 this.as.chkLogedIn({ 'token': this.token }).subscribe(
   data => { if (data == false) { localStorage.clear(); this.router.navigate(['/login']) } },
   error => { this.error = error; localStorage.clear(); window.location.replace(window.location.origin + '/login');; }
 )
}
  showForm(){
    if(this.hideForm){this.hideForm=false;}else{this.hideForm=true;}
    
  }
  closemsg(){
    this.msg='';
  
  }
  employeeByKey(){
    this.as.employeeByKey({'employee_key':this.employee_key}).subscribe(
      data=>{this.employee=data;
      },
      error=>this.error=error      
    )
  }
  getidFromUrl(){
    this.actroute.paramMap.subscribe(params => {
      this.employee_key = params.get('id');
    })
  }
  allQualificationByEmployeeKey(){
    this.as.allQualificationByEmployeeKey({'employee_key':this.employee_key}).subscribe(
      data=>{this.allQualification=data;
      },
      error=>this.error=error      
    )
  }
  edit(i:number){
    this.hideForm=false;
    this.headText="Update";
     this.guprofileForm.patchValue(this.allQualification[i]);
  
  }
  delete(id:number){

    this.as.deleteQualification({'qualification_id':id}).subscribe(
      data=>{this.msg=data.msg; this.allQualificationByEmployeeKey(); },
      error=>this.error=error      
    )  
  }

  onSubmit(){
    this.as.addQualification({'employee_key':this.employee_key,'data':this.guprofileForm.value}).subscribe(
      data=>{this.msg=data.msg;  this.allQualificationByEmployeeKey(); },
      error=>this.error=error      
    )
  }

}
