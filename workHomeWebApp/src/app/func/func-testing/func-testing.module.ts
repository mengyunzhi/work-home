import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponentComponent } from './component/editor-component/editor-component.component';
import {FuncTestingController} from './func-testing-controller';
import { LoadingComponent } from './component/loading/loading.component';

@NgModule({
  declarations: [EditorComponentComponent, LoadingComponent],
  imports: [
    CommonModule
  ],
  exports: [
    EditorComponentComponent,
    LoadingComponent
  ],
  providers: [
    FuncTestingController
  ]
})
export class FuncTestingModule { }
