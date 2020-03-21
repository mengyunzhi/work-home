import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FuncModule } from '../../../func/func.module';
import { AppComponent } from '../../../app.component';
import { NgxEchartsModule } from 'ngx-echarts';

describe('page -> dashboard -> MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent ],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        SweetAlert2Module.forRoot(),
        FuncModule,
        NgxEchartsModule
      ],
      providers: [
        {provide: AppComponent, useClass: AppComponent},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
