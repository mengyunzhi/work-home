import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthTestingController} from './auth-testing-controller';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    AuthTestingController
  ]
})
export class AuthTestingModule { }
