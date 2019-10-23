import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder,Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  student_key:string;
  error:{};
  msg:string;
  student:any;
  headText="Add";
  classlist:{};
  guardianList:{};
  sectionlist:{};
  constructor(public router:Router,private fb: FormBuilder,private as:AdminService,private actroute: ActivatedRoute,) { }
 guprofileForm = this.fb.group({
  
  sr_no: ['200'],
  admission_no: ['1000'],
  student_name: ['krishna', Validators.required],
  aadhaar_no: [''], 
  gender: ['male',Validators.required],
  email: [''],
  birthday: [''],
  class_id: ['', Validators.required],
  section_id: ['', Validators.required],
  guardian_key:['', Validators.required],
  nationality: ['indian',Validators.required],
  religion: ['Hinduism'],
  relation_to_guardian : ['father',Validators.required],
  father: [''],
  mother: [''], 
  residential_address: [''], 
  correspondence_address: [''],
  category: ['general']

  });
  ngOnInit() {
    this.getidFromUrl();
    this. studentByKey();
    this.allActiveClass();
    this.allGuardian();
    if(this.student_key){this.headText="Update"}
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
  reset(){
    this.guprofileForm.reset();
  }
  allActiveClass(){
    this.as.allActiveClass().subscribe(
      data=>{ this.classlist=data;},
      error=>this.error=error      
    )
  }
  allGuardian(){
    this.as.allGuardian().subscribe(
      data=>{ this.guardianList=data;},
      error=>this.error=error      
    )
  }
  studentByKey(){
    this.as.studentByKey({'student_key':this.student_key}).subscribe(
      data=>{ this.guprofileForm.patchValue(data);},
      error=>this.error=error      
    )
  }
  onSubmit(){
    if(!!this.student_key){
  
       this.as.updateStudent({'student_key':this.student_key,'data':this.guprofileForm.value}).subscribe(
         data=>{this.msg=data.msg;this.router.navigate(['/admin/student/student-detail/'+data.student_key])},
         error=>this.error=error      
       )
    }else{
      this.as.addStudent({'data':this.guprofileForm.value}).subscribe(
        data=>{this.msg=data.msg;this.router.navigate(['/admin/student/student-detail/'+data.student_key])},
        error=>this.error=error      
      )
    }
  }
  getSection(e){
    
    this.as.allSectionOfClass({'class_id':e.target.value}).subscribe(
      data=>{ this.sectionlist=data;},
      error=>this.error=error      
    )
    
  }

}
