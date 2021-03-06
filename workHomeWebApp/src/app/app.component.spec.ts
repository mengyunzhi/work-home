import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {FuncTestingModule} from './func/func-testing/func-testing.module';
import {PartTestingModule} from './part/part-testing/part-testing.module';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {AuthTestingModule} from './pages/pages-testing/auth-testing/auth-testing.module';
import {ServiceTestingModule} from './service/service-tesing/service-testing.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FuncTestingModule,
        PartTestingModule,
        SweetAlert2Module.forRoot(),
        AuthTestingModule,
        ServiceTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'workHomeWebApp'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('workHomeWebApp');
  });
});
