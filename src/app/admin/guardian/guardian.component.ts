import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-guardian',
  templateUrl: './guardian.component.html',
  styleUrls: ['./guardian.component.css']
})
export class GuardianComponent implements OnInit {

  constructor(public router:Router) { }
 
  ngOnInit() {
    this.router.navigate(['/admin/guardian/all-guardian']);
  }


}
