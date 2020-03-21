import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {StudentService} from '../../../service/student.service';
import {Student} from '../../../common/student';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.sass']
})
export class StudentEditComponent implements OnInit {

  studentForm: FormGroup;  // 学生表单组
  id: number;
  student: Student = new Student();

  constructor(private builder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private studentService: StudentService) {
  }

  ngOnInit() {
    this.creatForm();
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.studentService.getById(this.id)
        .subscribe((student: Student) => {
          this.student = student;
          this.studentForm.patchValue(this.student);
        });
    });
  }

  /**
   * 创建表单
   */
  creatForm() {
    this.studentForm = this.builder.group({
      name: ['', [Validators.required]]
    });
  }

  /**
   * 更新学生信息
   */
  submit() {
    this.studentService.update(this.id, this.studentForm.value)
      .subscribe(() => {
        this.router.navigateByUrl('/student');
      });
  }

  get name(): AbstractControl {
    return this.studentForm.get('name');
  }
}
