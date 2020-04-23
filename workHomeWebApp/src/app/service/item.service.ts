import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Item} from '../common/item';
import {HttpClient} from '@angular/common/http';
import {Page} from '../base/page';
import {AbstractControl, ValidatorFn} from '@angular/forms';
import {checkDir} from '../utils';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private url = 'item';

  constructor(private httpClient: HttpClient) {
  }

  findAllActiveItems(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(`${this.url}/active`);
  }

  /**
   * 删除实验项目
   */
  public deleteById(itemId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${itemId}`);
  }

  /**
   * 通过Id获取实验项目
   */
  public findById(itemId: number): Observable<Item> {
    return this.httpClient.get<Item>(`${this.url}/${itemId}`);
  }

  /**
   * 新增实验项目
   */
  public save(item: Item): Observable<Item> {
    return this.httpClient.post<Item>(`${this.url}`, item);
  }

  /**
   * 分页
   * @param page 第几页
   * @param size 每页条数
   * @param name 实验项目名称
   */
  public page(page: number, size: number, name: string)
    : Observable<Page<Item>> {
    const params: { [key: string]: any } = {
      page: String(page),
      size: String(size)
    };

    if (name !== null) {
      params.name = name;
    }

    return this.httpClient.get<Page<Item>>(`${this.url}/page`, {params});
  }

  /**
   * 更新实验项目
   */
  public update(itemId: number, item: Item): Observable<Item> {
    return this.httpClient.put<Item>(`${this.url}/${itemId}`, item);
  }

  /**
   * 目录是否合法的验证器
   */
  dirValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const dir = '/' + control.value;
      if (dir === '/') {
        return null;
      }
      return checkDir(dir) ? null : {dirFormatError: true};
    };
  }
}
