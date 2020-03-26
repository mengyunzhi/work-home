import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import { FuncModule } from '../../../../func/func.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ServiceTestingModule } from '../../../../service/service-tesing/service-testing.module';
import { AppTestingModule } from '../../../../app-testing/app-testing.module';

describe('Page -> Student -> EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditComponent ],
      imports: [
        FuncModule,
        RouterTestingModule,
        ServiceTestingModule,
        AppTestingModule
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
});
