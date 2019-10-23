import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notice-board',
  templateUrl: './notice-board.component.html',
  styleUrls: ['./notice-board.component.css']
})
export class NoticeBoardComponent implements OnInit {
  noticeboard:{};
  error:{};
  msg:string;
  showForm:boolean=false;
  noticeArray:any={'title':'','notice':''}
  constructor(private as: AdminService, private router: Router) { }

  ngOnInit() {this.allNoticeboard();
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
  allNoticeboard(){
    this.as.allNoticeboard().subscribe(
      data=>{ this.noticeboard=data;},
      error=>this.error=error      
    )
  }
  show(){
    this.showForm=true;
  }
  delete(id:number){
    this.as.deleteNotice({'id':id}).subscribe(
      data=>{ this.msg=data;this.allNoticeboard();},
      error=>this.error=error      
    )
  }
  addNotice(){
    this.as.addNotice({'data':this.noticeArray}).subscribe(
      data=>{ this.msg=data;this.allNoticeboard(); this.showForm=false;},
      error=>this.error=error      
    )
  }
}
