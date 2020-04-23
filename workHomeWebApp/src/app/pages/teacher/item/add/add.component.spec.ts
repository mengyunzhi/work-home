import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddComponent} from './add.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ServiceTestingModule} from '../../../../service/service-tesing/service-testing.module';
import {RouterTestingModule} from '@angular/router/testing';
import {AppTestingModule} from '../../../../app-testing/app-testing.module';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddComponent ],
      imports: [
        ReactiveFormsModule,
        ServiceTestingModule,
        RouterTestingModule,
        AppTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
