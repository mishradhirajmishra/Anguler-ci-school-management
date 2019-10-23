import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(public router:Router) { }
 
  ngOnInit() {
    this.router.navigate(['/admin/student/all-student']);
  }


}
