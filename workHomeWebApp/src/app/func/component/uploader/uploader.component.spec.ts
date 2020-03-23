import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploaderComponent } from './uploader.component';
import { FuncTestingModule } from '../../func-testing/func-testing.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UploaderComponent', () => {
  let component: UploaderComponent;
  let fixture: ComponentFixture<UploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploaderComponent],
      imports: [FuncTestingModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
