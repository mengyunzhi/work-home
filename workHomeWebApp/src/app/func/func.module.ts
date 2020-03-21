import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponentComponent } from './component/editor-component/editor-component.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditorComponentComponent, MenuShowPipe],
  exports: [
    EditorComponentComponent
  ],
  imports: [
    CommonModule,
    EditorModule,
    FormsModule
  ]
})
export class FuncModule { }
