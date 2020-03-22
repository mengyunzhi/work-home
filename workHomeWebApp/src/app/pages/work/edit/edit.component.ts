import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../service/common.service';
import { WorkService } from '../../../service/work.service';
import { Work } from '../../../common/work';
import { Attachment } from '../../../common/attachment';
import { AttachmentService } from '../../../service/attachment.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  work: Work;
  selectFiles: File[];

  constructor(private router: Router,
              private commonService: CommonService,
              private route: ActivatedRoute,
              private workService: WorkService,
              private attachmentService: AttachmentService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const itemId = params.itemId as string;
      this.workService.getByItemIdOfCurrentStudent(+itemId).subscribe((data) => {
        this.work = data;
      });
    });
  }

  /**
   * 更新
   */
  public update() {
    // 先上传每个附件
    for (let i = 0; i < this.selectFiles.length; i++) {
      this.attachmentService.upload(this.selectFiles[i])
        .subscribe((attachment) => {
          this.work.attachments.push(attachment);
          // 最后一个附件上传以后更新作业信息
          if (i === this.selectFiles.length - 1) {
            this.workService.updateOfCurrentStudent(this.work.id, this.work);
          }
        });
    }
  }

  submit() {
    this.update();
  }

  /**
   * 下载附件
   * @param attachment 附件
   */
  downloadAttachment(attachment: Attachment) {
    this.attachmentService.download(attachment).subscribe((data) => {
      saveAs(data, `${attachment.originName}`);
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

  }
}
