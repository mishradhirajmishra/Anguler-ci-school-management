import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.css']
})
export class FeeComponent implements OnInit {
constructor(private router:Router){}
ngOnInit(){
 this.router.navigate(['/admin/fee/student-fee-pay'])
}
}
