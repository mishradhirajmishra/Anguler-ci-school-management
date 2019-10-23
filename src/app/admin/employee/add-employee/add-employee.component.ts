import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employee_key: string;
  error: {};
  msg: string;
  student: any;
  headText = "Add";
  desiglist: {};
  guardianList: {};
  sectionlist: {};
  token: string;
  constructor(public router: Router, private fb: FormBuilder, private as: AdminService, private actroute: ActivatedRoute, ) { }
  guprofileForm = this.fb.group({
    emp_no: ['1000'],
    employee_type: ['Permanent', Validators.required],
    name: ['krishna', Validators.required],
    father_name: ['krishna', Validators.required],
    gender: ['male', Validators.required],
    aadhar_no: [''],
    dob: [''],
    joining_date: [''],
    contact_no: [''],
    pan_no: [''],
    designation: ['Teacher', Validators.required],
    email: [''],
    blood_group: [''],
    nationality: ['indian', Validators.required],
    correspondence_address: [''],
    residential_address: [''],
    password: [''],
    login_id: ['']
  });
  ngOnInit() {
    this.getidFromUrl();
    this.employeeByKey();
    this.allEmpDesignationList();
    if (this.employee_key) { this.headText = "Update" }
    this.chkLogedIn();
  }

  chkLogedIn() {
    this.token = localStorage.getItem('sch');
    this.as.chkLogedIn({ 'token': this.token }).subscribe(
      data => { if (data == false) { localStorage.clear(); this.router.navigate(['/login']) } },
      error => { this.error = error; localStorage.clear(); window.location.replace(window.location.origin + '/login');; }
    )
  }
  getidFromUrl() {
    this.actroute.paramMap.subscribe(params => {
      this.employee_key = params.get('id');
    })
  }

  allEmpDesignationList() {
    this.as.allEmpDesignationList().subscribe(
      data => { this.desiglist = data; },
      error => this.error = error
    )
  }

  employeeByKey() {
    this.as.employeeByKey({ 'employee_key': this.employee_key }).subscribe(
      data => { this.guprofileForm.patchValue(data); },
      error => this.error = error
    )
  }
  onSubmit() {
    if (!!this.employee_key) {

      this.as.updateEmployee({ 'employee_key': this.employee_key, 'data': this.guprofileForm.value }).subscribe(
        data => { this.msg = data.msg; this.router.navigate(['/admin/employee/employee-detail/' + this.employee_key]) },
        error => this.error = error
      )
    } else {
      this.as.addEmployee({ 'data': this.guprofileForm.value }).subscribe(
        data => {
        this.msg = data.msg;
          this.router.navigate(['/admin/employee/employee-detail/' + this.employee_key])
        },
        error => this.error = error
      )
    }
  }
  getSection(e) {

    this.as.allSectionOfClass({ 'class_id': e.target.value }).subscribe(
      data => { this.sectionlist = data; },
      error => this.error = error
    )

  }

}
