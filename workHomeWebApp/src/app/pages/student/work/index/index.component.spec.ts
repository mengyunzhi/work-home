import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IndexComponent} from './index.component';
import {CommonModule} from '@angular/common';
import {ServiceTestingModule} from '../../../../service/service-tesing/service-testing.module';
import {RouterTestingModule} from '@angular/router/testing';
import {FuncModule} from '../../../../func/func.module';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexComponent ],
      imports: [
        CommonModule,
        ServiceTestingModule,
        RouterTestingModule,
        FuncModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
