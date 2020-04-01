

import { ViewComponent } from './view.component';
import {WorkStubService} from '../../../../service/service-tesing/work-stub.service';
import {WorkService} from '../../../../service/work.service';

import {Work} from '../../../../common/work';
import {Item} from '../../../../common/item';
import {Student} from '../../../../common/student';
import {of} from 'rxjs';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';


describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        {provide: WorkService, useClass: WorkStubService},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('pages -> student -> work -> view -> 组件渲染', () => {
    expect(component.work.id).toBe(1);
    expect(component.work.content).toBe('<p>content</p>');
    expect(component.work.item).toEqual(new Item({name: 'Item', description: 'TestItem'}));
    expect(component.work.score).toBe(100);
    expect(component.work.student).toEqual(new Student({name: 'Student'}));
    expect(component.work.reviewed).toBe(true);
  });
  it('pages -> student -> work -> view -> 组件初始化发起请求测试', () => {
    const service  = TestBed.get(WorkService) as WorkService;
    const mockResultWork = new  Work();
    // @ts-ignore
    spyOn(service, 'getById').and.returnValue(of(mockResultWork));
    const id = 1;
    component.load();
    expect(service.getById).toHaveBeenCalled();
  });

});
