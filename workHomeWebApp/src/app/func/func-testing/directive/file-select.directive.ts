import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { UploaderOptions, UploadOutput } from '../../directive/ngxUploader/interfaces';

@Directive({
  selector: '[appFileSelect]'
})
export class FileSelectDirective {
  @Input() options: UploaderOptions;
  @Input() uploadInput: EventEmitter<any>;
  @Output() uploadOutput: EventEmitter<UploadOutput>;
  constructor() {
    this.uploadOutput = new EventEmitter<UploadOutput>();
  }

}
