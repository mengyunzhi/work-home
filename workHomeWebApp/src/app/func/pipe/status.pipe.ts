import {Pipe, PipeTransform} from '@angular/core';

/*
 * status管道 张文达
 * 使用 | status
 * 作用 展示status表示的状态
*/
@Pipe({name: 'status'})
export class StatusPipe implements PipeTransform {
  transform(value: number): string {
    if (value === null || value === undefined) {
      return '-';
    }
    if (value === 0) {
      return '未评阅';
    }
    if (value === 1) {
      return '评阅中';
    }
    if (value === 2) {
      return '已评阅';
    }
  }
}
