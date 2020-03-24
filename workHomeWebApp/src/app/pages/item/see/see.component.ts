import { Component, OnInit } from '@angular/core';
import {Student} from '../../../common/student';
import {StudentService} from '../../../service/student.service';
import {AppComponent} from '../../../app.component';

@Component({
  selector: 'app-see',
  templateUrl: './see.component.html',
  styleUrls: ['./see.component.sass']
})
export class SeeComponent implements OnInit {
  students: Student[];

  constructor(private studentService: StudentService,
              private appComponent: AppComponent) {
  }

  ngOnInit() {
    this.studentService.getAll()
      .subscribe((students: Student[]) => {
        this.students = students;
      });
  }

}
