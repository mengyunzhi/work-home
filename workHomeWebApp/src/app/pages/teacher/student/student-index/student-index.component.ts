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
    size: 2,
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
   * 生成分页数据
   * @param currentPage 当前页
   * @param totalPages 总页数
   */
  makePagesByTotalPages(currentPage: number, totalPages: number): Array<number> {
    if (totalPages > 0) {
      /* 总页数小于5 */
      if (totalPages <= 5) {
        return this.makePages(0, totalPages - 1);
      }

      /* 首2页 */
      if (currentPage < 2) {
        return this.makePages(0, 4);
      }

      /* 尾2页 */
      if (currentPage > totalPages - 3) {
        return this.makePages(totalPages - 5, totalPages - 1);
      }

      /* 总页数大于5，且为中间页码*/
      return this.makePages(currentPage - 2, currentPage + 2);
    }

    return new Array();
  }

  /**
   * 生成页码
   * @param begin 开始页码
   * @param end 结束页码
   */
  makePages(begin: number, end: number): Array<number> {
    const result = new Array<number>();
    for (; begin <= end; begin++) {
      result.push(begin);
    }
    return result;
  }

  /**
   * 点击分页按钮
   * @param page 要请求的页码
   */
  onPage(page: number) {
    if (page < 0 || page >= this.pageStudent.totalPages) {
      return;
    }
    this.params.page = page;
    this.loadData();
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
        this.pages = this.makePagesByTotalPages(this.params.page, response.totalPages);
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

  }
}
