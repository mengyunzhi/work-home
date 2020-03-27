import {Component, OnInit} from '@angular/core';
import {StudentService} from '../../../../service/student.service';
import {Student} from '../../../../common/student';
import {AppComponent} from 'src/app/app.component';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserService} from '../../../../service/user.service';
import {User} from '../../../../common/user';


@Component({
  selector: 'app-student-index',
  templateUrl: './student-index.component.html',
  styleUrls: ['./student-index.component.sass']
})
export class StudentIndexComponent implements OnInit {

  students: Student[];
  constructor(private studentService: StudentService,
              private userService: UserService,
              private appComponent: AppComponent,
              private router: Router) {
  }

  ngOnInit() {
    this.studentService.getAll()
      .subscribe((students: Student[]) => {
        this.students = students;
      });
  }

  delete(student: Student) {
    // 确认框
    this.appComponent.confirm(() => {
      this.studentService.delete(student.id).subscribe(() => {
        this.students = this.students.filter(ob => ob !== student);
        // 操作成功提示
        this.appComponent.success(() => {
        }, '删除成功');
      }, (res: HttpErrorResponse) => {
        // 操作失败提示
        this.appComponent.error(() => {
        }, '删除失败:' + res.error.message);
      });
    }, '即将删除学生');
  }

  resetPassword(id: number) {
    console.log(id);
    this.userService.resetPassword(id)
      .subscribe(() => {
        this.appComponent.success(() => {
          this.router.navigateByUrl('/teacher/student');
        }, '密码重置成功');
      }, (res: HttpErrorResponse) => {
        this.appComponent.error(() => {
        }, `密码重置失败:${res.error.message}`);
      });
  }
}
