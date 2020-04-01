import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {WorkService} from '../../../../service/work.service';
import {WorkStubService} from '../../../../service/service-tesing/work-stub.service';
import {Item} from '../../../../common/item';
import {Work} from '../../../../common/work';
import {FormTest} from '../../../../testing/formTest';
import {Student} from '../../../../common/student';
import {ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ActivatedRouteStub} from '../../../../service/service-tesing/activated-route-stub';

describe('Page -> Teacher -> EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        {provide: WorkService, useClass: WorkStubService},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('组件初始化发起请求测试', () => {
    /* 获取请求参数 */
    const workService: WorkStubService = TestBed.get(WorkService);
    const queryParam = workService.workIdCache;

    /* 断言传入的参数值与组件中的参数值相同 */
    expect(queryParam).toEqual(component.params.workId);
  });

  it('组件初始化V层渲染', () => {
    /* 断言总行数及第一行的内容绑定符合预期 */

    expect(component.work.id).toBe(1);
    expect(component.work.content).toBe('<p>content</p>');
    expect(component.work.item).toEqual(new Item({name: 'Item', description: 'TestItem'}));
    expect(component.work.score).toBe(100);
    expect(component.work.student).toEqual(new Student({name: 'Student'}));
    expect(component.work.reviewed).toBe(true);

  });

  /**
   * 点击"优"测试
   */
  it('BestButtonTest', () => {
    FormTest.clickButton(fixture, 'button.btn.btn-info.btn-sm');
    expect(component.work.score).toBe(95);
  });

  it('GoodButtonTest', () => {
    FormTest.clickButton(fixture, 'button.btn.btn-warning.btn-sm');
    expect(component.work.score).toBe(90);
  });

  it('MiddleButtonTest', () => {
    FormTest.clickButton(fixture, 'button.btn.btn-danger.btn-sm');
    expect(component.work.score).toBe(80);
  });

  it('BadButtonTest', () => {
    FormTest.clickButton(fixture, 'button.btn.btn-dark.btn-sm');
    expect(component.work.score).toBe(60);
  });

  it('向M层传入更新的学生ID及更新的学生信息', () => {
    // 在M层对应的方法上建立间谍 （见foreach)
    // 为间谍准备返回值
    const workService: WorkStubService = TestBed.get(WorkService);

    // 方法调用
    const work1 = new Work();
    work1.id = Math.floor(Math.random() * 100);
    component.submit({id: work1.id, work: work1});

    // 断言间谍调用成功，间谍接收参数符合预期
    expect(workService.updateScoreCache).toEqual({id: work1.id, work: work1});

    // 断言接收返回值符合预期
    expect(component.work).toEqual(work1);
  });

});

