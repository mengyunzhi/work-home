import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { UploaderOptions, UploadInput, UploadOutput } from '../../directive/ngxUploader/interfaces';

@Directive({
  selector: '[appFileDrop]'
})
export class FileDropDirective {
  @Input() options: UploaderOptions;
  @Input() uploadInput: EventEmitter<UploadInput>;
  @Output() uploadOutput: EventEmitter<UploadOutput>;
  constructor() {
    this.uploadOutput = new EventEmitter<UploadOutput>();
  }

}
