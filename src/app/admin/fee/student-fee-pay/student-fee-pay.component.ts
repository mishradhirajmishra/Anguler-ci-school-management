import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-fee-pay',
  templateUrl: './student-fee-pay.component.html',
  styleUrls: ['./student-fee-pay.component.css']
})
export class StudentFeePayComponent implements OnInit {
  allStudentAttendance:any;
  error:{};
  classlist:{};
  classId:string='';
  sectionId:string='';
  sectionlist:{};
  studentlist:{};
  studentId:string='';
  msg:string;
  allFeeList:{};
  payment:[];
  student:{};
  logo:string;
  schoolName:string;
  date:Date;
  showForm:boolean=false;
  feeArray:any={'amount':'0','discount':'0','penalty':'0','payable':'0','month':''}
  showDetail:any={'m1':false,'m2':false,'m3':false,'m4':false,'m5':false,'m6':false,'m7':false,'m8':false,'m9':false,'m10':false,'m11':false,'m12':false,}
  constructor(private as:AdminService,private router:Router) { }
  ngOnInit() {this.date = new Date();
    this.getlogo();this.getSchoolName();

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
  payFee(amount:number,month:number){
    this.showForm=true;
    this.feeArray.discount='0';
    this.feeArray.penalty='0';
   this.feeArray.amount=amount;
   this.feeArray.payable=amount;
   this.feeArray.month=month;
   

  }
  payStudentFee(){
    this.as.addStudentFee({'student_id':this.studentId,'section_id':this.sectionId,'data':this.feeArray}).subscribe(
      data=>{ this.msg=data;this.getFeeDetail(); this.showForm=false;},
      error=>this.error=error      
    ) 
  }

  claculate(){
    this.feeArray.payable=(<number>this.feeArray.penalty *1 )+ (<number>this.feeArray.amount *1)-(<number>this.feeArray.discount *1) ;
 }
  allActiveClass(){
    this.as.allActiveClass().subscribe(
      data=>{ this.classlist=data;},
      error=>this.error=error      
    )
  }
  getSection(){    
    this.as.allSectionOfClass({'class_id':this.classId}).subscribe(
      data=>{ this.sectionlist=data;},
      error=>this.error=error      
    )    
  }
  getStudent(){
   this.as.allStudentDropDown({'class_id':this.classId,'section_id':this.sectionId}).subscribe(
      data=>{ this.studentlist=data;},
      error=>this.error=error      
    ) 
  }
  getFeeDetail(){
    this.as.studentMonthlyFee({'section_id':this.sectionId,'student_id':this.studentId}).subscribe(
      data=>{this.payment=[]; this.allFeeList=data; this.getStudentDetail();this.paymentHistory();},
      error=>this.error=error      
    ) 
  }
  getStudentDetail(){   
    this.as.studentById({'student_id':this.studentId}).subscribe(
      data=>{ this.student=data;},
      error=>this.error=error      
    ) 
  }
  paymentHistory(){    
    this.as.studentAnualFeePayment({'student_id':this.studentId}).subscribe(
      data=>{ this.payment=data;},
      error=>this.error=error      
    ) 
  }
  remove(index){
    this.payment.splice(index, 1);
 
  }
  print() {
    var printContents = document.getElementById("printableArea").innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}
getlogo() {
  this.as.logo().subscribe(
    data => { this.logo = data; },
    error => this.error = error
  )
}
getSchoolName() {
  this.as.schoolName().subscribe(
    data => { this.schoolName = data;  },
    error => this.error = error
  )
}
}
