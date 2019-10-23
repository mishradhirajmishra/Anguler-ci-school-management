import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fee-type',
  templateUrl: './fee-type.component.html',
  styleUrls: ['./fee-type.component.css']
})
export class FeeTypeComponent implements OnInit {
  allFee: any;
  error: {};
  msg: string;
  allFeeType:{};
  id:number;
  flagEdit:boolean=false;
  feeType: any = { name: '', comment: '', type: '' };
  constructor(private as: AdminService, private router: Router) { }
  ngOnInit() {
    this.allFeeTypeFun();
    this.allFeeFun();
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
  edit(index:number){
    this.flagEdit=true;
    this.id=this.allFee[index].id;
    this.feeType.name=this.allFee[index].name;
    this.feeType.comment=this.allFee[index].comment;
    this.feeType.type=this.allFee[index].type;
    
  }
  addFeeType() {
    if(this.flagEdit){
      this.as.updateFee({'id':this.id, 'data': this.feeType }).subscribe(
        data => { this.msg = data; this.allFeeFun();    this.flagEdit=false; },
        error => this.error = error
      )
    }
    else
    {
      this.as.addFeeType({ 'data': this.feeType }).subscribe(
        data => { this.msg = data; this.allFeeFun(); },
        error => this.error = error
      )
    }

  }
  allFeeFun() {
    this.as.allFee().subscribe(
      data => this.allFee = data,
      error => this.error = error
    )
  }
  allFeeTypeFun() {
    this.as.feeType().subscribe(
      data => this.allFeeType = data,
      error => this.error = error
    )
  }

}
