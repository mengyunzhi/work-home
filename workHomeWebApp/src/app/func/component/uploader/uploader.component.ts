import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UploaderOptions, UploadFile, UploadInput, UploadOutput, UploadStatus } from '../../directive/ngxUploader/interfaces';
import { Attachment } from '../../../common/attachment';
import { ConfigService } from '../../../service/config.service';
import { stringToNumber } from '../../../utils';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.sass']
})
export class UploaderComponent implements OnInit {

  @Input()
  url = '/api/attachment'; // 上传的url
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
  uploadRejected: EventEmitter<boolean>; // 上传文件失败

  files: UploadFile[];  // 上传的文件
  uploadInput: EventEmitter<UploadInput>;
  dragOver: boolean;
  options: UploaderOptions;

  constructor(private configService: ConfigService) {
    this.maxFileSize = stringToNumber(this.configService.config.maxFileSize);
    this.options = {concurrency: 1, maxUploads: this.maxUploads, maxFileSize: this.maxFileSize};
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.uploadedFile = new EventEmitter<Attachment>();
    this.closeUploader = new EventEmitter<boolean>();
    this.uploadRejected = new EventEmitter<boolean>();
    this.styleClasses = 'btn btn-sm btn-outline-primary';

  }

  ngOnInit(): void {
  }

  // 上传过程,根据文件上传的不同状态调整
  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
      const data: FormData = new FormData();
      data.append('attachment', output.nativeFile);

      const event: UploadInput = {
        type: 'uploadAll',
        url: this.url,
        method: 'POST',
        data: {attachment: output.nativeFile}
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
      console.log(output.file.name + ' rejected');
      this.uploadRejected.emit(true);
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
