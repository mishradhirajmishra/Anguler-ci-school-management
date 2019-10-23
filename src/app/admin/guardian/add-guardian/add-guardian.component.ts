import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder,Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';


@Component({
  selector: 'app-add-guardian',
  templateUrl: './add-guardian.component.html',
  styleUrls: ['./add-guardian.component.css']
})
export class AddGuardianComponent implements OnInit {
  guardian_key:string;
  error:{};
  msg:string;
  guardian:any;
  headText="Add";
  constructor(public router:Router,private fb: FormBuilder,private as:AdminService,private actroute: ActivatedRoute,) { }
 guprofileForm = this.fb.group({
  guardian_name: ['ramesh', Validators.required],
  guardian_age: ['28',Validators.required],
  nationality: ['indian',Validators.required],
  guardian_qualifications: [''],
  guardian_instituion: [''],
  guardian_occupation: [''],
  guardian_designation: [''],
  guardian_annual_income: [''], 
  guardian_mobile: [''], 
  aadhaar_no: [''], 
  guardian_office_address: [''], 
  guardian_home_address: [''], 
  email: [''], 
  password: [''], 
  });
  ngOnInit() {
    this.getidFromUrl();
      this. guardianByKey();
   if(this.guardian_key){this.headText="Update"}
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
      data=>{ this.guprofileForm.patchValue(data);},
      error=>this.error=error      
    )
  }
  onSubmit(){
    if(!!this.guardian_key){
      this.as.updateGuardian({'guardian_key':this.guardian_key,'data':this.guprofileForm.value}).subscribe(
        data=>{this.msg=data.msg;this.router.navigate(['/admin/guardian/guardian-detail/'+data.guardian_key])},
        error=>this.error=error      
      )
    }else{
      this.as.addGuardian({'data':this.guprofileForm.value}).subscribe(
        data=>{this.msg=data.msg;this.router.navigate(['/admin/guardian/guardian-detail/'+data.guardian_key])},
        error=>this.error=error      
      )
    }

  }
  reset(){
    this.guprofileForm.reset();
  }
}
