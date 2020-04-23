import {Component, Pipe, PipeTransform} from '@angular/core';
import {FuncTestingController} from '../func-testing-controller';
@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {
  constructor(private controller: FuncTestingController) {
    this.controller.addUnit(this);
  }
  transform(url: string): any {
  }
}
