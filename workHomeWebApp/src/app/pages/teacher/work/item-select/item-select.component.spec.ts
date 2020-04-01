import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {By} from '@angular/platform-browser';
import {ItemSelectComponent} from './item-select.component';
import {PartModule} from '../../../../part/part.module';
import {Item} from '../../../../common/item';

fdescribe('student ItemSelectComponent', () => {
  let component: ItemSelectComponent;
  let fixture: ComponentFixture<ItemSelectComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemSelectComponent],
      imports: [PartModule, HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * 1. 断言发请了请求
   * 2. 模拟返回数据
   * 3. 订阅弹出的班级
   * 4. 改变select的值
   * 5. 断言订阅的语句被成功的执行过了
   */
  it('should create', () => {
    expect(component).toBeTruthy();
    httpTestingController = TestBed.get(HttpTestingController);
    const req = httpTestingController.expectOne(component.url);
    req.flush(new Array(
      new Item({id: 1}),
      new Item({id: 2})));
    fixture.detectChanges();

    let called = false;
    component.selected.subscribe((item: Item) => {
      expect(item.id).toBe(1);
      called = true;
    });

    const htmlSelectElement: HTMLSelectElement = fixture.debugElement.query(By.css('select')).nativeElement;
    htmlSelectElement.value = htmlSelectElement.options[0].value;
    htmlSelectElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(called).toBe(true);


  });
});
