import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder,Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-exp-employee',
  templateUrl: './exp-employee.component.html',
  styleUrls: ['./exp-employee.component.css']
})
export class ExpEmployeeComponent implements OnInit {
  employee_key:string;
  error:{};
  msg:string;
  employee:any;
  student:any;
  headText="Add";
  allexperience:{};
  hideForm:boolean=true;
 constructor(public router:Router,private fb: FormBuilder,private as:AdminService,private actroute: ActivatedRoute,) { }
 guprofileForm = this.fb.group({  
  experience_id: [''],
  institution: ['abc',Validators.required],
  from_year:['',Validators.required],
  to_year: ['',Validators.required],
  position: ['']
  });
  ngOnInit() {
    this.getidFromUrl();

    this.allexperienceByEmployeeKey();
    this.employeeByKey();
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
  showForm(){
    if(this.hideForm){this.hideForm=false;}else{this.hideForm=true;}
    
  }
  closemsg(){
    this.msg='';
  
  }
  invalidDateMsg:string="";
  checkDate(){
    var x=  this.guprofileForm.controls.from_year.value-this.guprofileForm.controls.to_year.value ;
    if(x<0){
    this.invalidDateMsg="Invalid Range ";
    }
    else{this.invalidDateMsg="";this.guprofileForm.patchValue({'total_duration':x})}
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
  allexperienceByEmployeeKey(){
    this.as.allExperienceByEmployeeKey({'employee_key':this.employee_key}).subscribe(
      data=>{this.allexperience=data;
      },
      error=>this.error=error      
    )
  }
  edit(i:number){
    this.hideForm=false;
    this.headText="Update";
     this.guprofileForm.patchValue(this.allexperience[i]);
  
  }
  delete(id:number){
 
    this.as.deleteExperience({'experience_id':id}).subscribe(
      data=>{this.msg=data.msg; this.allexperienceByEmployeeKey(); },
      error=>this.error=error      
    )  
  }

  onSubmit(){
    this.as.addExperience({'employee_key':this.employee_key,'data':this.guprofileForm.value}).subscribe(
      data=>{this.msg=data.msg;  this.allexperienceByEmployeeKey(); },
      error=>this.error=error      
    )
  }
}
