import {Component, OnInit} from '@angular/core';
import {StudentService} from '../../../service/student.service';
import {Student} from '../../../common/student';

@Component({
  selector: 'app-student-index',
  templateUrl: './student-index.component.html',
  styleUrls: ['./student-index.component.sass']
})
export class StudentIndexComponent implements OnInit {

  students: Student[];

  constructor(private studentService: StudentService) {
  }

  ngOnInit() {
    this.studentService.getAll()
      .subscribe((students: Student[]) => {
        this.students = students;
      });
  }

  delete(student: Student) {
    this.studentService.delete(student.id)
      .subscribe(() => {
        this.students = this.students.filter(ob => ob !== student);
      });
  }

}
