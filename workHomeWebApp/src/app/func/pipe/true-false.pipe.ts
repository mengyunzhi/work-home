import {Pipe, PipeTransform} from '@angular/core';

/*
 * tf管道 刘宇轩
 * 使用 | tf
 * 作用 把true false 变为是否
*/
@Pipe({name: 'trueFalse'})
export class TrueFalsePipe implements PipeTransform {
  transform(value: boolean): string {
    if (value === null || value === undefined) {
      return '-';
    }
    return value ? '是' : '否';
  }
}
