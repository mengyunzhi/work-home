import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Attachment} from '../../../common/attachment';
import {HttpErrorResponse} from '@angular/common/http';
import {AttachmentService} from '../../../service/attachment.service';

@Component({
  selector: 'app-editor-component',
  templateUrl: './editor-component.component.html',
  styleUrls: ['./editor-component.component.sass']
})
export class EditorComponentComponent implements OnInit {
  constructor(private attachmentService: AttachmentService ) {
  }

  @Input()
  content: string;

  @Output()
  contentEmit: EventEmitter<string> = new EventEmitter<string>();

  /** 编辑器配置 */
  options: Record<string, any> = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image paste preview table charmap searchreplace fullscreen autoresize',
    menubar: false,
    relative_urls: false,
    language: 'zh_CN',
    toolbar: 'undo redo | bold italic underline strikethrough | subscript superscript' +
      ' | alignleft aligncenter alignright | table image fullscreen | charmap',
    images_upload_handler: (blobInfo, success, failure): void => {
      this.attachmentService.upload(blobInfo.blob())
        .subscribe((attachment: Attachment) => {
          success(`/${attachment.savePath}/${attachment.saveName}`);
        }, (response: HttpErrorResponse) => {
          failure('上传图片异常: ' + response.error);
        });
    },
    // 允许拖拽图片
    paste_data_images: true,
    height: '100'
  };

  ngOnInit(): void {
  }

  /**
   * 发送编辑器内容
   */
  contentChange() {
    this.contentEmit.emit(this.content);
  }
}
