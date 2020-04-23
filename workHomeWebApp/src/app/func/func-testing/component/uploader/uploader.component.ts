import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Attachment} from '../../../../common/attachment';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
})
export class UploaderComponent implements OnInit {

  @Input()
  url = '/api/attachment'; // 上传的url
  @Input()
  maxFileSize = 20 * 1024 * 1024; // 上传的文件大小
  @Input()
  maxUploads = 999; // 一次上传的文件数量
  @Input()
  buttonText = '文件上传'; // 按钮显示文字
  @Input()
  title = '文件上传';     // 上传框的标题
  @Input()
  description = '拖动文件到此处或点击浏览'; // 上传的描述
  @Input()
  styleClasses: string;            // 样式
  @Output()
  uploadedFile: EventEmitter<Attachment>; // 上传的单个文件
  @Output()
  closeUploader: EventEmitter<boolean>;  // 关闭上传器
  constructor() {
    this.uploadedFile = new EventEmitter<Attachment>();
    this.closeUploader = new EventEmitter<boolean>();
    this.styleClasses = 'btn btn-sm btn-outline-primary';
  }

  ngOnInit() {
  }

}
