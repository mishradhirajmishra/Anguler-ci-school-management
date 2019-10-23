import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section-fee',
  templateUrl: './section-fee.component.html',
  styleUrls: ['./section-fee.component.css']
})
export class SectionFeeComponent implements OnInit {
  allClass: {};
  error: {};
  msg: string;
  teacherList: {}
  className: string;
  sectionName: string;
  edit: boolean = false;
  sectionAllFeeVar: {};
  feeTypeDropDownVar: {};
  totalFee: number;
  allFeeDropDownVar: {};
  date: Date;
  logo: string;
  schoolName: string;
  arrayVar: any = { 'section_id': '', 'fee_id': '', 'amount': '' }
  constructor(private as: AdminService,private router:Router) { }

  ngOnInit() { this.getSchoolName(); this.getlogo(); this.date = new Date(); this.getAllclass(); this.allFeeDropDown(); 
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
  closemsg() { this.msg = ''; }

  editFee(index: number, subinndex: number) {

    this.arrayVar.section_id = this.allClass[index].section[subinndex].section_id;
    this.sectionName = this.allClass[index].section[subinndex].name;
    this.className = this.allClass[index].name;
    this.sectionAllFee(this.arrayVar.section_id);

  }

  allFeeDropDown() {
    this.as.allFee().subscribe(
      data => { this.allFeeDropDownVar = data; },
      error => this.error = error
    )
  }
  sectionAllFee(id: number) {
    this.as.sectionAllFee({ 'section_id': id }).subscribe(
      data => { this.sectionAllFeeVar = data.data; this.totalFee = data.grand_total },
      error => this.error = error
    )
  }
  delete(feeSectionId: number) {
    this.as.sectionFeeDelete({ 'fee_section_id': feeSectionId }).subscribe(
      data => { this.msg = data; this.sectionAllFee(this.arrayVar.section_id); },
      error => this.error = error
    )
  }
  getAllclass() {
    this.as.allActiveClassWithSection().subscribe(
      data => { this.allClass = data; },
      error => this.error = error
    )
  }
  addSectionFee() {
    this.as.addSectionFee({ 'data': this.arrayVar }).subscribe(
      data => { this.msg = data; this.sectionAllFee(this.arrayVar.section_id); },
      error => { this.error = error; }
    )
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
      data => { this.logo = data; console.log(this.logo) },
      error => this.error = error
    )
  }
  getSchoolName() {
    this.as.schoolName().subscribe(
      data => { this.schoolName = data; console.log(this.logo) },
      error => this.error = error
    )
  }
}
