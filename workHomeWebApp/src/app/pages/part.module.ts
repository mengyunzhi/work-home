import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [MenuComponent, HeaderComponent, LayoutComponent, NavComponent],
  exports: [
    MenuComponent,
    HeaderComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class PartModule {
}
