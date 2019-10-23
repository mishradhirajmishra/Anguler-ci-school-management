import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {
  allClass: {};
  error: {};
  msg: string;
  teacherList: {}
  section_id: number;
  edit: boolean = false;
  token:string;
   constructor(private as: AdminService,private router:Router) { }
  ngOnInit() { this.getAllclass(); this.getTeacherList();this.chkLogedIn(); }
  chkLogedIn() {
    this.token = localStorage.getItem('sch');
    this.as.chkLogedIn({ 'token': this.token }).subscribe(
      data => { if (data == false) { localStorage.clear(); this.router.navigate(['/login']) } },
      error => { this.error = error; localStorage.clear(); window.location.replace(window.location.origin + '/login');; }
    )
  }
  closemsg() { this.msg = ''; }

  getTeacherList() {
    this.as.teacherDropDownList().subscribe(
      data => { this.teacherList = data; },
      error => this.error = error
    )
  }
  getAllclass() {
    this.as.allClassWithSection().subscribe(
      data => { this.allClass = data; },
      error => this.error = error
    )
  }
  changeStatus(class_id: number, index: number, status: number) {
    this.allClass[index].status = status;
    this.as.updateClass({ 'class_id': class_id, 'status': status }).subscribe(
      data => { this.msg = data; },
      error => this.error = error
    )
  }
  showForm(index: number) {
    this.edit = false;
    if (this.allClass[index].add_section.show == false) {
      this.allClass[index].add_section.show = true;
    } else {
      this.allClass[index].add_section.show = false;
    }
  }
  editClass(index: number, subinndex: number) {
    this.edit = true;
    this.allClass[index].add_section.show = true;
    this.section_id = this.allClass[index].section[subinndex].section_id;
    this.allClass[index].add_section.section_name = this.allClass[index].section[subinndex].name;
    this.allClass[index].add_section.teacher_id = this.allClass[index].section[subinndex].teacher_id;
    this.allClass[index].add_section.medium = this.allClass[index].section[subinndex].medium;

  }
  updateSection(index: number, subinndex: number) {

    this.as.updateSection({ 'name': this.allClass[index].add_section.section_name, 'section_id': this.section_id, 'teacher_id': this.allClass[index].add_section.teacher_id, 'medium': this.allClass[index].add_section.medium, }).subscribe(
      data => { this.msg = data; this.getAllclass(); },
      error => this.error = error
    )
  }
  addSection(index: number) {
    // console.log(this.allClass[index].add_section.teacher_id);
    this.as.addSection({ 'name': this.allClass[index].add_section.section_name, 'class_id': this.allClass[index].add_section.class_id, 'teacher_id': this.allClass[index].add_section.teacher_id, 'medium': this.allClass[index].add_section.medium, }).subscribe(
      data => { this.msg = data; this.getAllclass(); },
      error => this.error = error
    )
  }

}
