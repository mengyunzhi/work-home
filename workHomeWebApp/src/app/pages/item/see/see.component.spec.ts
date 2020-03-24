import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeComponent } from './see.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AppTestingModule} from '../../../app-testing/app-testing.module';

describe('SeeComponent', () => {
  let component: SeeComponent;
  let fixture: ComponentFixture<SeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeComponent ],
      imports: [RouterTestingModule,
        HttpClientTestingModule,
        AppTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
