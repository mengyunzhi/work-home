import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UploaderOptions, UploadFile, UploadInput, UploadOutput, UploadStatus } from '../../directive/ngxUploader/interfaces';
import { Attachment } from '../../../common/attachment';
import { ConfigService } from '../../../service/config.service';
import { checkDir, stringToNumber } from '../../../utils';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.sass']
})
export class UploaderComponent implements OnInit {

  @Input()
  url = '/api/attachment'; // 上传的url
  @Input()
  option1Value: string;   // 发送到后台的可选项1值
  @Input()
  uploadDirSet = false;   // 上传目录设置
  maxFileSize: number; // 上传的文件大小
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
  @Output()
  uploadRejected: EventEmitter<string>; // 上传文件失败

  files: UploadFile[];  // 上传的文件
  uploadInput: EventEmitter<UploadInput>;
  dragOver: boolean;
  options: UploaderOptions;
  uploadDir = '';

  constructor(private configService: ConfigService) {
    this.maxFileSize = stringToNumber(this.configService.config.maxFileSize);
    this.options = {concurrency: 1, maxUploads: this.maxUploads, maxFileSize: this.maxFileSize};
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.uploadedFile = new EventEmitter<Attachment>();
    this.closeUploader = new EventEmitter<boolean>();
    this.uploadRejected = new EventEmitter<string>();
    this.styleClasses = 'btn btn-sm btn-outline-primary';
  }

  ngOnInit(): void {
  }

  // 上传过程,根据文件上传的不同状态调整
  onUploadOutput(output: UploadOutput): void {
    console.log(output.file);
    // 是否设置目录,目录是否符合要求
    if (this.uploadDir && !checkDir(this.uploadDir)) {
      this.uploadRejected.emit('上传目录格式错误');
      output.type = 'cancelled';
      return;
    }
    if (output.type === 'allAddedToQueue') {
      const event: UploadInput = {
        type: 'uploadAll',
        url: this.url,
        method: 'POST',
        data: {uploadDir: this.uploadDir, option1: this.option1Value},
      };

      this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
      this.files.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'cancelled' || output.type === 'removed') {
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    } else if (output.type === 'rejected' && typeof output.file !== 'undefined') {
      this.uploadRejected.emit('文件上传失败,可能是上传的文件过大或上传的文件数量过多');
    } else if (output.type === 'error' && typeof output.file !== 'undefined') {
      this.uploadRejected.emit('文件上传失败,请检查操作是否规范');
    } else if (output.type === 'done') {
      this.uploadedFile.emit(output.file.response);
    }

    this.files = this.files.filter(file => file.progress.status !== UploadStatus.Done);
  }

  // 撤销上传
  cancelUpload(id: string): void {
    this.uploadInput.emit({type: 'cancel', id});
  }

  // 关闭上传窗口
  close() {
    this.closeUploader.emit(true);
  }

}
