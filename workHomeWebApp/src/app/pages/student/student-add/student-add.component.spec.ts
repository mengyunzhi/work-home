import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAddComponent } from './student-add.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ServiceTestingModule} from '../../../service/service-tesing/service-testing.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('StudentAddComponent', () => {
  let component: StudentAddComponent;
  let fixture: ComponentFixture<StudentAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAddComponent ],
      imports: [
        ReactiveFormsModule,
        ServiceTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
