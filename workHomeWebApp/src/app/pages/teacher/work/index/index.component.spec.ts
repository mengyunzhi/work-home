import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponent } from './index.component';
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


describe('Page -> Teacher -> Work -> IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexComponent , ItemSelectComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        PartModule,
        FuncModule
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
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('是');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('100');

  });

  it('当前页、总页数、每页大小', () => {
    /* 获取分页信息 */
    const debugElement = fixture.debugElement.query(By.css('#pageInfo'));
    const pageInfoDiv: HTMLDivElement = debugElement.nativeElement;
    const text = pageInfoDiv.textContent;

    /* 断言绑定了C层的分页值 */
    expect(text).toContain(`第${component.params.page + 1}/${component.workPage.totalPages}页`);
    expect(text).toContain(`每页${component.params.size}条`);
  });

  it('分页 -> 首页样式测试', () => {
    /* 获取首页按钮 */
    const debugElement = fixture.debugElement.query(By.css('ul.pagination > li:first-child'));
    const htmlliElement: HTMLLIElement = debugElement.nativeElement;

    /* 当前页为首页，则添加禁用样式 */
    component.params.page = 0;
    fixture.detectChanges();
    expect(htmlliElement.classList.contains('disabled')).toBe(true);

    /* 当前页非首页，则移除禁用样式 */
    component.params.page = 1;
    fixture.detectChanges();
    expect(htmlliElement.classList.contains('disabled')).toBe(false);
  });

  it('分页 -> 点击首页测试', () => {
    spyOn(component, 'onPage');

    /* 获取首页按钮并点击 */
    const formTest = new FormTest(fixture);
    formTest.clickButton('ul.pagination > li:first-child');

    expect(component.onPage).toHaveBeenCalledWith(0);
  });

  it('onPage 功能测试', () => {
    spyOn(component, 'load');
    component.params.page = 4;
    component.onPage(3);
    expect(component.params.page).toEqual(3);
    expect(component.load).toHaveBeenCalled();
  });

  it('上一页 样式测试', () => {
    /* 获取首页按钮 */
    const debugElement = fixture.debugElement.query(By.css('ul.pagination > li:nth-child(2)'));
    const htmlliElement: HTMLLIElement = debugElement.nativeElement;

    /* 当前页为首页，则添加禁用样式 */
    component.params.page = 0;
    fixture.detectChanges();
    expect(htmlliElement.classList.contains('disabled')).toBe(true);

    /* 当前页非首页，则移除禁用样式 */
    component.params.page = 1;
    fixture.detectChanges();
    expect(htmlliElement.classList.contains('disabled')).toBe(false);
  });


  it('上一页 点击测试', () => {
    spyOn(component, 'onPage');

    component.params.page = 3;
    fixture.detectChanges();

    /* 获取上一页按钮并点击 */
    const formTest = new FormTest(fixture);
    formTest.clickButton('ul.pagination > li:nth-child(2)');

    expect(component.onPage).toHaveBeenCalledWith(2);
  });

  it('makePages', () => {
    /* 更好的做法是使用两个随机的数字进行测试 */
    const result = component.makePages(0, 4);
    expect(result.length).toEqual(5);

    /* 断言起始为0 */
    expect(result[0]).toEqual(0);

    /* 断言后一个元素比前一个元素大1 */
    for (let i = 0; i < 4; i++) {
      expect(result[i] + 1).toEqual(result[i + 1]);
    }
  });

  it('makePagesByTotalPages', () => {
    /* 总页数为0 */
    expect(component.makePagesByTotalPages(0, 0).length).toEqual(0);

    /* 总页数小于等于5 */
    expect(component.makePagesByTotalPages(2, 5).length).toEqual(5);
    expect(component.makePagesByTotalPages(2, 5)[0]).toEqual(0);

    /* 总页数大于5，首2页 */
    expect(component.makePagesByTotalPages(1, 10).length).toEqual(5);
    expect(component.makePagesByTotalPages(1, 10)[4]).toEqual(4);

    /* 总页数大于5，尾2页 */
    expect(component.makePagesByTotalPages(8, 10).length).toEqual(5);
    expect(component.makePagesByTotalPages(8, 10)[4]).toEqual(9);

    /* 总页数大于5， 中间页 */
    expect(component.makePagesByTotalPages(5, 10).length).toEqual(5);
    expect(component.makePagesByTotalPages(5, 10)[0]).toEqual(3);
  });

  it('load', () => {
    const mockResult = new Array<number>();
    spyOn(component, 'makePagesByTotalPages').and.returnValue(mockResult);
    component.load();
    expect(component.makePagesByTotalPages).toHaveBeenCalled();
    expect(component.pages).toBe(mockResult);
  });

  /**
   * V层分页测试BEFORE
   */
  const viewPageBefore = (): HTMLUListElement => {
    component.pages = new Array<number>(3, 4, 5, 6, 7);
    fixture.detectChanges();

    /* 获取分页 */
    const debugElement = fixture.debugElement.query(By.css('ul.pagination'));
    return HTMLUListElement = debugElement.nativeElement;
  };

  it('页码渲染个数', () => {
    const ulElement: HTMLUListElement = viewPageBefore();

    /* 断言分页个数 */
    expect(ulElement.getElementsByTagName('li').length).toEqual(9);
  });

  it('测试页码号', () => {
    const ulElement: HTMLUListElement = viewPageBefore();
    const liElements: HTMLCollection = ulElement.getElementsByTagName('li');

    /* 依次获取第3 4 5 6 7页，断言对应的页码为4，5，6，7，8 */
    for (let i = 2; i < 7; i++) {
      expect(liElements[i].textContent).toContain((i + 2).toString());
    }
  });

  it('页码点击测试', () => {
    const ulElement: HTMLUListElement = viewPageBefore();
    const liElements: HTMLCollection = ulElement.getElementsByTagName('li');

    spyOn(component, 'onPage');

    for (let i = 2; i < 7; i++) {
      const htmlLiElement = liElements[i] as HTMLLIElement;
      htmlLiElement.click();
      expect(component.onPage).toHaveBeenCalledWith(i + 1);
    }
  });

  it('选中当前页测试', () => {
    component.params.page = 4;
    const ulElement: HTMLUListElement = viewPageBefore();
    const liElements: HTMLCollection = ulElement.getElementsByTagName('li');

    /* 断言只有ul元素下只有一个active子元素，且该子元素的位置符合预期 */
    expect(ulElement.getElementsByClassName('active').length).toBe(1);
    const htmlLiElement = liElements[3] as HTMLLIElement;
    expect(htmlLiElement.classList.contains('active')).toBe(true);

    /* 断言该li元素中存在class为sr-only的元素 */
    const elements = htmlLiElement.getElementsByClassName('sr-only');
    expect(elements.length).toEqual(1);
    expect(elements[0].textContent).toContain('(current)');
  });

  it('点击下一页', () => {
    /* 获取分页元素 */
    const debugElement = fixture.debugElement.query(By.css('ul.pagination>li:nth-last-child(2)'));
    const liElement: HTMLLIElement = debugElement.nativeElement;
    expect(liElement.textContent).toContain('下一页');

    spyOn(component, 'onPage');
    const currentPage = component.params.page;
    liElement.click();
    expect(component.onPage).toHaveBeenCalledWith(currentPage + 1);
  });

  it('下一页(尾页）样式', () => {
    /* 定义两个选择器后缀 */
    const cssSelector = new Array<string>('nth-last-child(2)', 'last-of-type');

    /* 循环测试下一页及尾页 */
    cssSelector.forEach((value) => {
      /* 当前第3页，总共4页 */
      component.params.page = 2;
      component.workPage.totalPages = 4;
      fixture.detectChanges();
      /* 下一页（尾页）可点击 */
      const debugElement = fixture.debugElement.query(By.css(`ul.pagination>li:${value}`));
      const liElement: HTMLLIElement = debugElement.nativeElement;
      expect(liElement.classList.contains('disabled')).toBe(false);
      /* 总页数为3页，下一页（尾页)不可点击 */
      component.workPage.totalPages = 3;
      fixture.detectChanges();
      expect(liElement.classList.contains('disabled')).toBe(true);
    });
  });

  it('点击尾页', () => {
    /* 获取分页元素 */
    const debugElement = fixture.debugElement.query(By.css('ul.pagination>li:last-of-type'));
    const liElement: HTMLLIElement = debugElement.nativeElement;
    expect(liElement.textContent).toContain('尾页');

    spyOn(component, 'onPage');
    liElement.click();
    expect(component.onPage).toHaveBeenCalledWith(component.workPage.totalPages - 1);
  });

  fit('选择项目组件', () => {
    /* 获取请求 */
    const httpTestingController = TestBed.get(HttpTestingController);
    const req: TestRequest = httpTestingController.expectOne('/item/active');
    expect(req.request.method).toEqual('GET');

    /* 模拟返回值 */
    const mockResult = new Array<Item>(
      new Item({ id: 0 }),
      new Item({ id: 1 })
    );
    req.flush(mockResult);
    fixture.detectChanges();

    /* 获取select元素 */
    const debugElement = fixture.debugElement.query(By.css('select'));
    const select: HTMLSelectElement = debugElement.nativeElement;

    /* 选中首个选项 */
    select.value = select.options[0].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    /* 断言选中的值传给了C层 */
    expect(component.params.item).toEqual(mockResult[0]);
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
    component.onCheckBoxChange(event, 2);
    fixture.detectChanges();
    /* 获取table元素 */
    const tableElement = fixture.debugElement.query(By.css('table'));
    const table: HTMLTableElement = tableElement.nativeElement;

    /* 断言总行数及第一行的内容绑定符合预期 */
    const row = 1;
    let col = 0;
    expect(table.rows.length).toBe(2);
    expect(table.rows.item(row).cells.length).toBe(7);
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('1');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('Student');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('123');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('Item');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('是');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('100');
  });
  it('测试未评阅', () => {
    component.onCheckBoxChange(event, 3);
    fixture.detectChanges();
    /* 获取table元素 */
    const tableElement = fixture.debugElement.query(By.css('table'));
    const table: HTMLTableElement = tableElement.nativeElement;

    /* 断言总行数及第一行的内容绑定符合预期 */
    const row = 1;
    let col = 0;
    expect(table.rows.length).toBe(2);
    expect(table.rows.item(row).cells.length).toBe(7);
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('1');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('Student');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('456');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('Item');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('-');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('100');
  });
});

