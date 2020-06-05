import {Component, OnInit} from '@angular/core';
import {Work} from '../../../../common/work';
import {WorkService} from '../../../../service/work.service';
import {Student} from '../../../../common/student';
import {StudentService} from '../../../../service/student.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {
  works = new Array<Work>();
  /**
   * 当前登录用户
   */
  currentStudent: Student;
  /**
   * 已批阅作业数目
   */
  reviewedWork: number;
  id: number;
  constructor(private workService: WorkService,
              private studentService: StudentService) {}

  ngOnInit() {
    this.studentService.getCurrentStudent()
      .subscribe(data => {
        this.currentStudent  = data;
        if (this.currentStudent.totalScore == null) {
          this.currentStudent.totalScore = 0;
        }
        if (this.currentStudent.averageScore == null) {
          this.currentStudent.averageScore = 0;
        }
      });
    this.workService.getAllOfCurrentStudent()
      .subscribe(data => {
        this.works = data;
        this.reviewedWork = 0;
        data.forEach((work) => {
          if (work.status === 2) {
            this.reviewedWork++;
          }
        });
      });
  }

}
