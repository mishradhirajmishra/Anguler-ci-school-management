import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-su-detail',
  templateUrl: './su-detail.component.html',
  styleUrls: ['./su-detail.component.css']
})
export class SuDetailComponent implements OnInit {

  student_key:string;
  error:{};
  msg:string;
  student:any;
  imgfile:any;
  url:any;
  edit:boolean;
  showUpdateBtn:boolean=false;
  constructor(public router:Router,private as:AdminService,private actroute: ActivatedRoute,) { }
  ngOnInit() {
    this.getidFromUrl();
    this. studentByKey();
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
      this.student_key = params.get('id');
    })
  }  
  studentByKey(){
    this.as.studentByKey({'student_key':this.student_key}).subscribe(
      data=>{this.student=data;this.url=this.student.student_image;
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
  formData.append('type','student_image');
  formData.append('student_key',this.student_key); 
  formData.append('data',this.imgfile,this.imgfile.name); 
  return this.as.updateStudentImage(formData).subscribe(
    data => {this.msg = data;},
    error => this.error = error
  );         
}
editFun(){
this.router.navigate(['/admin/student/edit-student/'+this.student_key])
}

}
