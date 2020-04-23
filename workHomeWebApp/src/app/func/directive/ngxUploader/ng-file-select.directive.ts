import {Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {UploaderOptions, UploadOutput} from './interfaces';
import {NgUploaderService} from './ngx-uploader.class';
import {Subscription} from 'rxjs';
import {CommonService} from '../../../service/common.service';

/**
 * 通过选择上传文件的指令
 */
@Directive({
  selector: '[appFileSelect]'
})
export class NgFileSelectDirective implements OnInit, OnDestroy {
  @Input() options: UploaderOptions;
  @Input() uploadInput: EventEmitter<any>;
  @Output() uploadOutput: EventEmitter<UploadOutput>;

  upload: NgUploaderService;
  el: HTMLInputElement;

  _sub: Subscription[];

  constructor(public elementRef: ElementRef,
              private commonService: CommonService) {
    this.uploadOutput = new EventEmitter<UploadOutput>();
  }

  ngOnInit() {
    this._sub = [];
    const concurrency = this.options && this.options.concurrency || Number.POSITIVE_INFINITY;
    const allowedContentTypes = this.options && this.options.allowedContentTypes || ['*'];
    const maxUploads = this.options && this.options.maxUploads || Number.POSITIVE_INFINITY;
    const maxFileSize = this.options && this.options.maxFileSize || Number.POSITIVE_INFINITY;
    this.upload = new NgUploaderService(concurrency, allowedContentTypes, maxUploads, maxFileSize, this.commonService);

    this.el = this.elementRef.nativeElement;
    this.el.addEventListener('change', this.fileListener, false);

    this._sub.push(
      this.upload.serviceEvents.subscribe((event: UploadOutput) => {
        this.uploadOutput.emit(event);
      })
    );

    if (this.uploadInput instanceof EventEmitter) {
      this._sub.push(this.upload.initInputEvents(this.uploadInput));
    }
  }

  ngOnDestroy() {
    if (this.el) {
      this.el.removeEventListener('change', this.fileListener, false);
      this._sub.forEach(sub => sub.unsubscribe());
    }
  }

  fileListener = () => {
    if (this.el.files) {
      this.upload.handleFiles(this.el.files);
    }
  }
}
