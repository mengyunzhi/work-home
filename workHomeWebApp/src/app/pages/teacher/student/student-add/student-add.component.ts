import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {config} from '../../../../conf/app.config';
import {StudentService} from '../../../../service/student.service';
import {AppComponent} from '../../../../app.component';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.sass']
})
export class StudentAddComponent implements OnInit {

  studentForm: FormGroup;  // 学生表单组

  constructor(private builder: FormBuilder,
              private router: Router,
              private studentService: StudentService,
              private appComponent: AppComponent) {
  }

  ngOnInit() {
    this.studentForm = this.builder.group({
      name: ['', [Validators.required]],
      no: ['', [Validators.required]],
      user: this.builder.group({
        password: [config.defaultPassword, [Validators.required]]
      })
    });
  }

  /**
   * 保存学生
   */
  submit() {
    this.studentService.save(this.studentForm.value)
      .subscribe(() => {
        this.appComponent.success(() => {
          this.router.navigateByUrl('/teacher/student');
        }, '学生新增成功');
      }, (res: HttpErrorResponse) => {
        this.appComponent.error(() => {
        }, `学生新增失败:${res.error.message}`);
      });
  }


  get name(): AbstractControl {
    return this.studentForm.get('name');
  }

  get no(): AbstractControl {
    return this.studentForm.get('no');
  }

  get password(): AbstractControl {
    return this.studentForm.get('user').get('password');
  }
}
