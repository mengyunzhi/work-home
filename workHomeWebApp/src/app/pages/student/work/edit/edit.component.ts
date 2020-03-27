import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { Work } from '../../../../common/work';
import { CommonService } from '../../../../service/common.service';
import { WorkService } from '../../../../service/work.service';
import { AttachmentService } from '../../../../service/attachment.service';
import { AppComponent } from '../../../../app.component';
import { Attachment } from '../../../../common/attachment';
import { ConfigService } from '../../../../service/config.service';
import { UserService } from '../../../../service/user.service';
import { User } from '../../../../common/user';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  work = new Work();
  host: string;
  protocol: string;  // 协议
  currentUser: User;

  constructor(private router: Router,
              private commonService: CommonService,
              private route: ActivatedRoute,
              private workService: WorkService,
              private attachmentService: AttachmentService,
              private appComponent: AppComponent,
              private configService: ConfigService,
              private userService: UserService,
              @Inject(Window) private _window: Window
  ) {
  }

  ngOnInit() {

    this.host = this._window.location.host;
    this.protocol = this._window.location.protocol;
    this.getCurrentUser();
    this.load();
  }

  public load() {
    this.route.params.subscribe(params => {
      const itemId = params.itemId as string;
      this.workService.getByItemIdOfCurrentStudent(+itemId).subscribe((data) => {
        if (data.content.length === 0) {
          data.content = '请将源代码、网页截图（支持拖拽）等按实验要求添加到此处。';
        }
        this.work = data;
      });
    });
  }

  public getCurrentUser() {
    this.currentUser = this.userService.getCurrentUser();
  }

  /**
   * 上传完一个附件以后
   * @param attachment 附件
   */
  attachmentUploaded(attachment: Attachment) {
    if (!this.containAttachment(attachment, this.work.attachments)) {
      this.work.attachments.push(attachment);
    }
  }

  /**
   * 更新数据
   */
  public update() {
    this.workService.updateOfCurrentStudent(this.work.id, this.work)
      .subscribe(() => {
        this.appComponent.success(() => {
          this.router.navigateByUrl('work');
        }, '', '保存成功!');
      });
  }

  submit() {
    // 上传的附件为空直接更新数据
    this.update();
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

  uploadRejected(rejectReason: string) {
    if (rejectReason) {
      this.appComponent.error(() => {
      }, rejectReason, '上传失败');
    }
  }

  getWorkDir(): string {
    if (this.work.item.dir) {
      return this.work.item.dir;
    }
    return '';
  }
}
