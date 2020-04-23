import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditorComponentComponent} from './component/editor-component/editor-component.component';
import {FuncTestingController} from './func-testing-controller';
import {LoadingComponent} from './component/loading/loading.component';
import {UploaderComponent} from './component/uploader/uploader.component';
import {FileDropDirective} from './directive/file-drop.directive';
import {FileSelectDirective} from './directive/file-select.directive';
import {SafeUrlPipe} from './pipe/safeUrl.pipe';

@NgModule({
  declarations: [
    EditorComponentComponent,
    LoadingComponent,
    UploaderComponent,
    FileDropDirective,
    FileSelectDirective,
    SafeUrlPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EditorComponentComponent,
    LoadingComponent,
    UploaderComponent,
    FileDropDirective,
    FileSelectDirective,
    SafeUrlPipe
  ],
  providers: [
    FuncTestingController,
  ]
})
export class FuncTestingModule {
}
