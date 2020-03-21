import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponentComponent } from './component/editor-component/editor-component.component';
import {FuncTestingController} from './func-testing-controller';

@NgModule({
  declarations: [EditorComponentComponent],
  imports: [
    CommonModule
  ],
  exports: [
    EditorComponentComponent
  ],
  providers: [
    FuncTestingController
  ]
})
export class FuncTestingModule { }
