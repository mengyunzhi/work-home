import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentIndexComponent } from './student-index.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {AppTestingModule} from '../../../../app-testing/app-testing.module';
import {UserService} from '../../../../service/user.service';
import {UserStubService} from '../../../../service/service-tesing/user-stub.service';
import {User} from '../../../../common/user';
import {Student} from '../../../../common/student';
import {FormTest} from '../../../../testing/formTest';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StudentStubService} from '../../../../service/service-tesing/student-stub.service';
import {StudentService} from '../../../../service/student.service';
import {By} from '@angular/platform-browser';
import {AppComponent} from '../../../../app.component';
import {PartModule} from '../../../../part/part.module';

describe('StudentIndexComponent', () => {
  let component: StudentIndexComponent;
  let fixture: ComponentFixture<StudentIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentIndexComponent],
      providers: [
        {provide: UserService, useClass: UserStubService},
        {provide: StudentService, useClass: StudentStubService}
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        AppTestingModule,
        ReactiveFormsModule,
        FormsModule,
        PartModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentIndexComponent);
    component = fixture.componentInstance;
    const student = new Student();
    student.id = Math.floor(Math.random() * 100);
    student.name = Math.random().toString(36).slice(-10);
    student.no = Math.floor(Math.random() * 100).toString();
    student.user = new User();
    student.user.id = Math.floor(Math.random() * 100);
    student.user.username = student.no;
    component.pageStudent.content = [
      student
    ];
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('测试依赖注入', () => {
    const service = TestBed.get(UserService);
  });
  it('点击重置密码按钮', () => {
   spyOn(component, 'resetPassword');
   FormTest.clickButton(fixture, '#resetPassword');
   expect(component.resetPassword).toHaveBeenCalled();
  });
  it('pages -> teacher -> student -> resetPassword', () => {
     const service  = TestBed.get(UserService) as UserService;
     spyOn(service, 'resetPassword').and.returnValue(of());
     const id = 1;
     component.resetPassword(id);
     expect(service.resetPassword).toHaveBeenCalled();
   });

  it('组件初始化发起请求测试', () => {
    /* 获取请求参数 */
    const studentService: StudentStubService = TestBed.get(StudentService);
    const queryParam = studentService.pageParamsCache;

    /* 断言传入的参数值与组件中的参数值相同 */
    expect(queryParam.name).toEqual(component.params.name.value);
    expect(queryParam.no).toEqual(component.params.no.value);
    expect(queryParam.page).toEqual(component.params.page);
    expect(queryParam.size).toEqual(component.params.size);
  });

  it('组件初始化V层渲染', () => {
    /* 获取table元素 */
    const tableElement = fixture.debugElement.query(By.css('table'));
    const table: HTMLTableElement = tableElement.nativeElement;

    /* 断言总行数及第一行的内容绑定符合预期 */
    const row = 1;
    let col = 0;
    expect(table.rows.length).toBe(3);
    expect(table.rows.item(row).cells.length).toBe(4);
    // expect(table.rows.item(row).cells.item(col++).innerText).toBe('');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('1');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('testStudentNo');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('testStudent');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('编辑删除重置密码');
  });

  it('姓名、学号input输入测试', () => {
    /* 利用前期抽向出的表单测试类，对表单进行测试 */
    const formTest = new FormTest(fixture);
    expect(formTest.setInputValue('input[name="name"]', 'studentName')).toBe(true);
    expect(formTest.setInputValue('input[name="no"]', 'studentNo')).toBe(true);
    fixture.detectChanges();

    /* 断言选中的值传给了C层 */
    expect(component.params.name.value).toEqual('studentName');
    expect(component.params.no.value).toEqual('studentNo');
  });

  it('查询按钮点击测试', () => {
    spyOn(component, 'onQuery');

    /* 点击按钮 */
    const formTest = new FormTest(fixture);
    formTest.clickButton('button');
    expect(component.onQuery).toHaveBeenCalled();
    // expect(component.loadData).toHaveBeenCalled();
  });

});
