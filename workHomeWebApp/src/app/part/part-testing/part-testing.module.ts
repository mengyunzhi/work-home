import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './layout/layout.component';
import {PartTestingController} from './part-testing-controller';
import {SizeSelectComponent} from './size-select/size-select.component';
import {PageComponent} from './page/page.component';


@NgModule({
  declarations: [LayoutComponent, SizeSelectComponent, PageComponent],
  imports: [
    CommonModule
  ],
  exports: [
    LayoutComponent,
    SizeSelectComponent,
    PageComponent
  ],
  providers: [
    PartTestingController
  ]
})
export class PartTestingModule {
}
