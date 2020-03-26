import { Directive, ElementRef, EventEmitter, Input, Output, OnInit, OnDestroy, HostListener } from '@angular/core';
import { UploadOutput, UploadInput, UploaderOptions } from './interfaces';
import { NgUploaderService } from './ngx-uploader.class';
import { Subscription } from 'rxjs';
import { CommonService } from '../../../service/common.service';

/**
 * 通过拖动上传文件的指令
 */
@Directive({
  selector: '[appFileDrop]'
})
export class NgFileDropDirective implements OnInit, OnDestroy {
  @Input() options: UploaderOptions;
  @Input() uploadInput: EventEmitter<UploadInput>;
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

    this._sub.push(
      this.upload.serviceEvents.subscribe((event: UploadOutput) => {
        this.uploadOutput.emit(event);
      })
    );

    if (this.uploadInput instanceof EventEmitter) {
      this._sub.push(this.upload.initInputEvents(this.uploadInput));
    }

    this.el.addEventListener('drop', this.stopEvent, false);
    this.el.addEventListener('dragenter', this.stopEvent, false);
    this.el.addEventListener('dragover', this.stopEvent, false);
  }

  ngOnDestroy() {
    this._sub.forEach(sub => sub.unsubscribe());
  }

  stopEvent = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();
  }

  /**
   * 在一个拖动过程中，释放鼠标键时触发此事件
   */
  @HostListener('drop', ['$event'])
  public onDrop(e: any) {
    e.stopPropagation();
    e.preventDefault();

    const event: UploadOutput = {type: 'drop'};
    this.uploadOutput.emit(event);
    this.upload.handleFiles(e.dataTransfer.files);
  }

  /**
   * 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
   */
  @HostListener('dragover', ['$event'])
  public onDragOver(e: Event) {
    if (!e) {
      return;
    }

    const event: UploadOutput = {type: 'dragOver'};
    this.uploadOutput.emit(event);
  }

  /**
   *  当被鼠标拖动的对象离开其容器范围内时触发此事件
   */
  @HostListener('dragleave', ['$event'])
  public onDragLeave(e: Event) {
    if (!e) {
      return;
    }

    const event: UploadOutput = {type: 'dragOut'};
    this.uploadOutput.emit(event);
  }
}
