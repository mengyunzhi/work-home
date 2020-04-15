import { Pipe, PipeTransform } from '@angular/core';
/*
 * tf管道
 * 使用 | tf
 * 作用 把true false 变为是否
*/
@Pipe({name: 'tf'})
export class TrueFalsePipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? '是' : '否';
  }
}
