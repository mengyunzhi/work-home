import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './layout/layout.component';
import {PartTestingController} from './part-testing-controller';


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule
  ],
  exports: [
    LayoutComponent
  ],
  providers: [
    PartTestingController
  ]
})
export class PartTestingModule {
}
