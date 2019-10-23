import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-emp-detail',
  templateUrl: './emp-detail.component.html',
  styleUrls: ['./emp-detail.component.css']
})
export class EmpDetailComponent implements OnInit {

  employee_key:string;
  error:{};
  msg:string;
  employee:any;
  imgfile:any;
  url:any;
  edit:boolean;
  showUpdateBtn:boolean=false;
  constructor(public router:Router,private as:AdminService,private actroute: ActivatedRoute,) { }
  ngOnInit() {
    this.getidFromUrl();
    this. employeeByKey();
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
  getidFromUrl(){
    this.actroute.paramMap.subscribe(params => {
      this.employee_key = params.get('id');
    })
  }  
  employeeByKey(){
    this.as.employeeByKey({'employee_key':this.employee_key}).subscribe(
      data=>{this.employee=data;this.url=this.employee.employee_image;
   
      },
      error=>this.error=error      
    )
  }
// ===============================
closemsg(){
  this.msg='';
}
editfun(){
  this.edit=false
}
onSelectChange(event:any){
  this.imgfile = <File>event.target.files[0]; 
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onload = (event) => { // called once readAsDataURL is completed    
     this.url= (<FileReader>event.target).result;
     this.showUpdateBtn=true;
    }
  }
} 

updateProfileImage(){ 
  const formData = new FormData();
  formData.append('type','employee_image');
  formData.append('employee_key',this.employee_key); 
  formData.append('data',this.imgfile,this.imgfile.name); 
  return this.as.updateEmployeeImage(formData).subscribe(
    data => {this.msg = data;    this. employeeByKey();},
    error => this.error = error
  );         
}
editFun(){
this.router.navigate(['/admin/employee/edit-employee/'+this.employee_key])
}

}
