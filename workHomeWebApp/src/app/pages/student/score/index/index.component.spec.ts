import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IndexComponent} from './index.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {By} from '@angular/platform-browser';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexComponent ],
      imports: [
        HttpClientTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    httpTestingController = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('组件初始化V层渲染', () => {
    /* 获取table元素 */
    const totalWorksElement = fixture.debugElement.query(By.css('#totalWorks'));
    const reviewedWorksElement = fixture.debugElement.query(By.css('#reviewedWorks'));
    const totalScoreElement = fixture.debugElement.query(By.css('#totalScore'));
    const averageScoreElement = fixture.debugElement.query(By.css('#averageScore'));
    const totalWorks: HTMLTableElement = totalWorksElement.nativeElement;
    const reviewedWorks: HTMLTableElement = reviewedWorksElement.nativeElement;
    const totalScore: HTMLTableElement = totalScoreElement.nativeElement;
    const averageScore: HTMLTableElement = averageScoreElement.nativeElement;
    expect(totalWorks.innerText).toBe('0');
    expect(reviewedWorks.innerText).toBe('');
    expect(totalScore.innerText).toBe('');
    expect(averageScore.innerText).toBe('');
  });
});
