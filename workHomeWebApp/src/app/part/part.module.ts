import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './menu/menu.component';
import {HeaderComponent} from './header/header.component';
import {LayoutComponent} from './layout/layout.component';
import {RouterModule} from '@angular/router';
import {NavComponent} from './nav/nav.component';
import {HttpClientModule} from '@angular/common/http';
import { SelectComponent } from './select/select.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [MenuComponent, HeaderComponent, LayoutComponent, NavComponent, SelectComponent],
  exports: [
    MenuComponent,
    HeaderComponent,
    LayoutComponent,
    SelectComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class PartModule {
}
