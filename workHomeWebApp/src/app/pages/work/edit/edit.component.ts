import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../service/common.service';
import { WorkService } from '../../../service/work.service';
import { Work } from '../../../common/work';
import { Attachment } from '../../../common/attachment';
import { AttachmentService } from '../../../service/attachment.service';
import { saveAs } from 'file-saver';
import { AppComponent } from '../../../app.component';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  work: Work;
  selectFiles = new Array<File>();

  constructor(private router: Router,
              private commonService: CommonService,
              private route: ActivatedRoute,
              private workService: WorkService,
              private attachmentService: AttachmentService,
              private appComponent: AppComponent) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const itemId = params.itemId as string;
      this.workService.getByItemIdOfCurrentStudent(+itemId).subscribe((data) => {
        this.work = data;
        console.log(data);
      });
    });
  }

  /**
   * 更新数据
   */
  public update() {
    this.workService.updateOfCurrentStudent(this.work.id, this.work)
      .subscribe(() => {
        this.appComponent.success(() => {
        }, '', '保存成功!');
      });
  }

  submit() {
    // 上传的附件为空直接更新数据
    if (this.selectFiles.length === 0) {
      this.update();
    }

    // 先上传每个附件
    let fileUploadCount = 0;
    for (const file of this.selectFiles) {
      this.attachmentService.upload(file)
        .subscribe((attachment) => {
          fileUploadCount++;

          if (!this.containAttachment(attachment, this.work.attachments)) {
            this.work.attachments.push(attachment);
          }
          // 最后一个附件上传以后更新作业信息
          if (fileUploadCount === this.selectFiles.length - 1) {
            this.update();
          }
        }, () => {
          this.appComponent.error(() => {
          }, '', '保存失败!');
        });
    }
  }


  /**
   * 下载附件
   * @param attachment 附件
   */
  downloadAttachment(attachment: Attachment) {
    this.attachmentService.download(attachment).subscribe((data) => {
      saveAs(data, `${attachment.originName}`);
    }, () => {
      console.log('请确定是否修改了nginx配置');
      this.appComponent.error(() => {
      }, '', '下载发生错误');
    });
  }

  contentChange($event) {
    this.work.content = $event;
  }

  fileChange(files: File[]) {
    this.selectFiles = files;
  }


  /**
   * 删除附件
   * @param workId 作业id
   * @param attachmentId 附件id
   */
  deleteAttachment(workId: number, attachmentId: number) {

    this.appComponent.confirm(() => {
      this.workService.deleteAttachment(workId, attachmentId)
        .subscribe(() => {
          this.work.attachments = this.work.attachments.filter(attachment => attachment.id !== attachmentId);

          this.appComponent.success(() => {
          }, '', '删除成功!');
        }, () => {
          this.appComponent.error(() => {
          }, '', '删除失败!');
        });

    }, '', '确定删除吗?');
  }

  /**
   * 判断附件是否添加到附件数组中
   * @param testAttachment 测试的附件
   * @param attachments 附件数组
   */
  containAttachment(testAttachment: Attachment, attachments: Array<Attachment>) {
    for (const attachment of attachments) {
      if (attachment.id === testAttachment.id) {
        return true;
      }
    }

    return false;
  }
}
