import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-employee',
  templateUrl: './all-employee.component.html',
  styleUrls: ['./all-employee.component.css']
})
export class AllEmployeeComponent implements OnInit {

  allStudent:any;
  error:{};
  employeeList:{};
  nameFilter: any = { designation:'',name:'' };
  desiglist:{};
  constructor(private as:AdminService,private router:Router) { }
 
  ngOnInit() {
    this.allEmployee();
    this.allEmpDesignationList();
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
  allEmpDesignationList(){
    this.as.allEmpDesignationList().subscribe(
      data=>{ this.desiglist=data;},
      error=>this.error=error      
    )
  }

  allEmployee(){
    this.as.allEmployee().subscribe(
      data=>{ this.employeeList=data;},
      error=>this.error=error      
    )
  }
   edit(key:string){
     this.router.navigate(['/admin/employee/edit-employee/'+key])
   }
   detail(key:string){
    this.router.navigate(['/admin/employee/employee-detail/'+key])
  }


}
