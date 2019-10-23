import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-guardian',
  templateUrl: './all-guardian.component.html',
  styleUrls: ['./all-guardian.component.css']
})
export class AllGuardianComponent implements OnInit {
  allGuardian:any;
  error:{};
  
  nameFilter: any = {guardian_name:'' ,guardian_home_address:''};
  constructor(private as:AdminService,private router:Router) { }

  ngOnInit() {
    this. allGuard();
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

   allGuard(){
    this.as.allGuardian().subscribe(
      data=>this.allGuardian=data,
      error=>this.error=error      
    )
   }
   edit(key:string){
     this.router.navigate(['/admin/guardian/edit-guardian/'+key])
   }
   detail(key:string){
    this.router.navigate(['/admin/guardian/guardian-detail/'+key])
  }

}
