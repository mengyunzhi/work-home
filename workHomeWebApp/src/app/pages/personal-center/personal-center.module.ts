import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MainComponent} from './main/main.component';
import {ModifyPasswordComponent} from './modify-password/modify-password.component';
import {PersonalCenterRoutingModule} from './personal-center-routing.module';

@NgModule({
  declarations: [MainComponent, ModifyPasswordComponent],
  imports: [
    CommonModule,
    PersonalCenterRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    ModifyPasswordComponent
  ],
})
export class PersonalCenterModule {
}
