//student.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  section:number;
  constructor() {
    this.section=1;
   }

  ngOnInit(): void {
  }
  toggleSection() {
    this.section=this.section==1?2:1;
  }

}
