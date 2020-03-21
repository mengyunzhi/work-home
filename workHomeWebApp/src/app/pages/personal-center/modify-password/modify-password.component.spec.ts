import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyPasswordComponent} from './modify-password.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {ServiceTestingModule} from '../../../service/service-tesing/service-testing.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ModifyPasswordComponent', () => {
  let component: ModifyPasswordComponent;
  let fixture: ComponentFixture<ModifyPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyPasswordComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
