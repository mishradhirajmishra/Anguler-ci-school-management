import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.css']
})
export class PeriodComponent implements OnInit {
  employee_key: string;
  error: {};
  msg: string;
  periodList: [];
  teacherList: [];
  classlist:[];
  classlistFilter:[];
  sectionlist:[];
  subjectList: [];
  subjectOptionList: [];
  periodAllotedList:{};
  showFormVar:boolean=false;
  nameFilter: any = { class_id: '',section_id:'' };
  constructor(public router: Router, private fb: FormBuilder, private as: AdminService) { }
  guprofileForm = this.fb.group({
    id: [''],
    period_id: ['', Validators.required],
    class_id: ['', Validators.required],
    section_id: ['', Validators.required],
    day: ['', Validators.required],
    start_time: ['', Validators.required],
    end_time: ['', Validators.required],
    teacher_id: ['', Validators.required],
    subject: ['', Validators.required],
    opt_sub: ['', Validators.required],
  });
  ngOnInit() {
    this.period();
    this.getTeacherList();
    this.allActiveClass();
    this.subjectOption();
    this.subject()
    this.getAllPeriodAllotment();
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
    if(this.showFormVar==false){this.showFormVar=true}else{this.showFormVar=false}
  }
  period() {
    this.as.periodDropDownList().subscribe(
      data => { this.periodList = data; },
      error => this.error = error
    );
  }
  subject() {
    this.as.subjectDropDownList().subscribe(
      data => { this.subjectList = data; },
      error => this.error = error
    );
  }
  subjectOption() {
    this.as.subjectOptionDropDownList().subscribe(
      data => { this.subjectOptionList = data;},
      error => this.error = error
    );
  }
  getTeacherList() {
    this.as.teacherDropDownList().subscribe(
      data => { this.teacherList = data; },
      error => this.error = error
    )
  }
  allActiveClass() {
    this.as.allActiveClass().subscribe(
      data => { this.classlist = data; },
      error => this.error = error
    )
  }
  getSectionForFilter(e) {

    this.as.allSectionOfClass({ 'class_id': e.target.value }).subscribe(
      data => { this.classlistFilter = data; this.classlistFilter.splice(0,1)},
      error => this.error = error
    )

  }
  getSectionFrm(e) {
     this.sectionDetail='';
    this.as.allSectionOfClass({ 'class_id': e.target.value }).subscribe(
      data => { this.sectionlist = data; this.sectionlist.splice(0,1) },
      error => this.error = error
    )

  }
  sectionDetail:any; 
  teacherDetail:any;
  getSectionPeriodDetail(e) {

    this.as.allPeriodOfSection({ 'section_id': e.target.value }).subscribe(
      data => { this.sectionDetail = data; console.log(this.sectionDetail) },
      error => this.error = error
    )

  }
  getTeacherPeriodDetail(e) {

    this.as.allPeriodOfTeacher({ 'teacher_id': e.target.value }).subscribe(
      data => { this.teacherDetail = data; console.log(this.teacherDetail) },
      error => this.error = error
    )

  }

  // ===============================
  closemsg() { this.msg = ''; }
  chk_time() {

  }
  detail(value) { }
  onSubmit() {
    this.as.addPeriod({ 'data': this.guprofileForm.value }).subscribe(
      data => { this.msg = data;  this.guprofileForm.reset(); this. getAllPeriodAllotment();},
      error => this.error = error
    )
  }
  reset(){
    this.guprofileForm.reset();
    this.sectionDetail='';
    this.teacherDetail='';
  }

  getAllPeriodAllotment(){
    this.as.allPeriodAllotment().subscribe(
      data => { this.periodAllotedList = data; },
      error => this.error = error
    )
  }
  getSectionOfClassOnEdit(class_id:number) {
    this.as.allSectionOfClass({ 'class_id': class_id }).subscribe(
      data => { this.sectionlist = data; this.sectionlist.splice(0,1) },
      error => this.error = error
    )
  }
  edit(index:number){
    this.sectionDetail='';
    this.teacherDetail='';
    this.showFormVar=true;
    this.getSectionOfClassOnEdit(this.periodAllotedList[index].class_id);
    this.guprofileForm.patchValue(this.periodAllotedList[index]);
    console.log(this.periodAllotedList[index]);   
  }
}
