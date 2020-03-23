import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponentComponent } from './component/editor-component/editor-component.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './component/loading/loading.component';
import { UploaderComponent } from './component/uploader/uploader.component';
import { NgxUploaderModule } from './directive/ngxUploader/ngx-uploader.module';

@NgModule({
  declarations: [EditorComponentComponent, LoadingComponent, UploaderComponent],
  exports: [
    EditorComponentComponent,
    LoadingComponent,
    UploaderComponent
  ],
  imports: [
    CommonModule,
    EditorModule,
    FormsModule,
    NgxUploaderModule
  ]
})
export class FuncModule {
}
