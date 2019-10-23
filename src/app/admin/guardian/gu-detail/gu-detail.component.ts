import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AdminService } from '../../admin.service';
@Component({
  selector: 'app-gu-detail',
  templateUrl: './gu-detail.component.html',
  styleUrls: ['./gu-detail.component.css']
})
export class GuDetailComponent implements OnInit {
  guardian_key:string;
  error:{};
  msg:string;
  guardian:any;
  imgfile:any;
  url:any;
  edit:boolean;
  showUpdateBtn:boolean=false;
  constructor(public router:Router,private as:AdminService,private actroute: ActivatedRoute,) { }
  ngOnInit() {
    this.getidFromUrl();
    this. guardianByKey();
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
      this.guardian_key = params.get('id');
    })
  }  
  guardianByKey(){
    this.as.guardianByKey({'guardian_key':this.guardian_key}).subscribe(
      data=>{ this.guardian=data; this.url=this.guardian.guardian_image;},
      error=>this.error=error      
    )
  }
// ===============================
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
  formData.append('guardian_key',this.guardian_key); 
  formData.append('data',this.imgfile,this.imgfile.name); 
  return this.as.updateGuardianImage(formData).subscribe(
    data => {this.msg = data;},
    error => this.error = error
  );         
}
editFun(){
this.router.navigate(['/admin/guardian/edit-guardian/'+this.guardian_key])
}
}
