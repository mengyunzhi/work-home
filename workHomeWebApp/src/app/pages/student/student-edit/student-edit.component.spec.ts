import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEditComponent } from './student-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {ServiceTestingModule} from '../../../service/service-tesing/service-testing.module';

describe('StudentEditComponent', () => {
  let component: StudentEditComponent;
  let fixture: ComponentFixture<StudentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentEditComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        ServiceTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
