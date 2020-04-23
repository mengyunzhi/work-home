import {Component, OnInit} from '@angular/core';
import {StudentService} from '../../../../service/student.service';
import {Student} from '../../../../common/student';
import {AppComponent} from 'src/app/app.component';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserService} from '../../../../service/user.service';
import {User} from '../../../../common/user';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-student-index',
  templateUrl: './student-index.component.html',
  styleUrls: ['./student-index.component.sass']
})
export class StudentIndexComponent implements OnInit {

  /* 分页数据 */
  pageStudent = {
    totalPages: 0,
    content: new Array<Student>()
  };

  /* 查询参数 */
  params = {
    page: 0,
    size: 5,
    name: new FormControl(),
    no: new FormControl()
  };

  /* 分页数据 */
  pages: Array<number>;

  constructor(private studentService: StudentService,
              private userService: UserService,
              private appComponent: AppComponent,
              private router: Router) {
  }

  /**
   * 加载数据
   */
  loadData() {
    const queryParams = {
      page: this.params.page,
      size: this.params.size,
      name: this.params.name.value,
      no: this.params.no.value
    };

    this.studentService.page(queryParams)
      .subscribe((response: { totalPages: number, content: Array<Student> }) => {
        this.pageStudent = response;
        // this.pages = this.makePagesByTotalPages(this.params.page, response.totalPages);
      });
  }

  ngOnInit() {
    this.loadData();
  }

  delete(student: Student) {
    // 确认框
    console.log(student);
    this.appComponent.confirm(() => {
      this.studentService.delete(student.id).subscribe(() => {
        this.pageStudent.content = this.pageStudent.content.filter(ob => ob !== student);
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

  onQuery() {
    this.loadData();
  }

  onPageSelected(page: number) {
    this.params.page = page;
    this.loadData();
  }

  clear() {
    this.params.name = new FormControl();
    this.params.no = new FormControl();
    this.loadData();
  }
}
