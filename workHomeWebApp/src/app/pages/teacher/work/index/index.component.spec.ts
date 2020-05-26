import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IndexComponent} from './index.component';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {WorkStubService} from '../../../../service/service-tesing/work-stub.service';
import {By} from '@angular/platform-browser';
import {FormTest} from '../../../../testing/formTest';
import {WorkService} from '../../../../service/work.service';
import {RouterTestingModule} from '@angular/router/testing';
import {Item} from '../../../../common/item';
import {PartModule} from '../../../../part/part.module';
import {ItemSelectComponent} from '../item-select/item-select.component';
import {FuncModule} from '../../../../func/func.module';
import {WorkTestingModule} from '../../../pages-testing/teacher-testing/work-testing/work-testing.module';
import {WorkTestingController} from '../../../pages-testing/teacher-testing/work-testing/work-testing-controller';


describe('Page -> Teacher -> Work -> IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        PartModule,
        FuncModule,
        WorkTestingModule
      ],
      providers: [
        {provide: WorkService, useClass: WorkStubService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('组件初始化发起请求测试,未选中是否评阅', () => {
    /* 获取请求参数 */
    const workService: WorkStubService = TestBed.get(WorkService);
    const queryParam = workService.pageParamsCache;

    /* 断言传入的参数值与组件中的参数值相同 */
    expect(queryParam.page).toEqual(component.params.page);
    expect(queryParam.size).toEqual(component.params.size);
  });

  it('组件初始化V层渲染', () => {
    /* 获取table元素 */
    const tableElement = fixture.debugElement.query(By.css('table'));
    const table: HTMLTableElement = tableElement.nativeElement;

    /* 断言总行数及第一行的内容绑定符合预期 */
    const row = 1;
    let col = 0;
    expect(table.rows.length).toBe(3);
    expect(table.rows.item(row).cells.length).toBe(7);
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('1');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('Student');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('123');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('Item');
    // expect(table.rows.item(row).cells.item(col++).innerText).toBe('是');
    // expect(table.rows.item(row).cells.item(col++).innerText).toBe('100');

  });

  it('选择项目组件', () => {
    const controller = TestBed.get(WorkTestingController) as WorkTestingController;
    const itemSelectComponent = controller.get(ItemSelectComponent) as ItemSelectComponent;
    expect(itemSelectComponent.item).toBe(component.params.item);

    spyOn(component, 'onSelectKlass');
    const emitItem = new Item();
    itemSelectComponent.selected.emit(emitItem);
    expect(component.onSelectKlass).toHaveBeenCalledWith(emitItem);
  });

  it('姓名、学号input输入测试', () => {
    /* 利用前期抽向出的表单测试类，对表单进行测试 */
    const formTest = new FormTest(fixture);
    expect(formTest.setInputValue('input[name="name"]', 'studentName')).toBe(true);
    expect(formTest.setInputValue('input[name="sno"]', 'studentSno')).toBe(true);
    fixture.detectChanges();

    /* 断言选中的值传给了C层 */
    expect(component.params.studentName.value).toEqual('studentName');
    expect(component.params.studentSno.value).toEqual('studentSno');
  });

  it('查询按钮点击测试', () => {
    spyOn(component, 'onQuery');

    /* 点击按钮 */
    const formTest = new FormTest(fixture);
    formTest.clickButton('button');
    expect(component.onQuery).toHaveBeenCalled();
    // expect(component.loadData).toHaveBeenCalled();
  });

  it('onQuery', () => {
    spyOn(component, 'load');

    component.onQuery();
    expect(component.load).toHaveBeenCalled();
  });

  it('测试已评阅', () => {
    // component.onCheckBoxChange(event, 2);
    fixture.detectChanges();
    /* 获取table元素 */
    const tableElement = fixture.debugElement.query(By.css('table'));
    const table: HTMLTableElement = tableElement.nativeElement;

    /* 断言总行数及第一行的内容绑定符合预期 */
    const row = 1;
    let col = 0;
    expect(table.rows.length).toBe(3);
    expect(table.rows.item(row).cells.length).toBe(7);
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('1');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('Student');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('123');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('Item');
    // expect(table.rows.item(row).cells.item(col++).innerText).toBe('是');
    // expect(table.rows.item(row).cells.item(col++).innerText).toBe('100');
  });
  it('测试未评阅', () => {
    // component.onCheckBoxChange(event, 3);
    fixture.detectChanges();
    /* 获取table元素 */
    const tableElement = fixture.debugElement.query(By.css('table'));
    const table: HTMLTableElement = tableElement.nativeElement;

    /* 断言总行数及第一行的内容绑定符合预期 */
    const row = 1;
    let col = 0;
    expect(table.rows.length).toBe(3);
    expect(table.rows.item(row).cells.length).toBe(7);
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('1');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('Student');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('123');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('Item');
    // expect(table.rows.item(row).cells.item(col++).innerText).toBe('-');
    // expect(table.rows.item(row).cells.item(col++).innerText).toBe('100');
  });
});

