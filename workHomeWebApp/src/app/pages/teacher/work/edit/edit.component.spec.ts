import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {WorkService} from '../../../../service/work.service';
import {WorkStubService} from '../../../../service/service-tesing/work-stub.service';
import {Item} from '../../../../common/item';
import {Student} from '../../../../common/student';
import {ActivatedRoute, Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {AppTestingModule} from '../../../../app-testing/app-testing.module';

fdescribe('Page -> Teacher -> EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditComponent ],
      imports: [
        RouterTestingModule,
        AppTestingModule
      ],
      providers: [
        {provide: WorkService, useClass: WorkStubService},
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
    const queryParam = workService.pageParamsCache;

    /* 断言传入的参数值与组件中的参数值相同 */
    expect(queryParam.workId).toEqual(component.params.workId);
  });

  it('组件初始化V层渲染', () => {
    /* 断言总行数及第一行的内容绑定符合预期 */

    expect(component.work.id).toBe(1);
    expect(component.work.content).toBe('<p>content</p>');
    expect(component.work.item).toBe(new Item({name: 'Item'}));
    expect(component.work.score).toBe(100);
    expect(component.work.student).toBe(new Student({name: 'Student'}));
    expect(component.work.reviewed).toBe(true);

  });
});

