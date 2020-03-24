import { Component, OnInit } from '@angular/core';
import {Attachment} from '../../../common/attachment';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.sass']
})
export class WorkComponent implements OnInit {
  work: any;

  constructor() { }

  ngOnInit() {
  }

  contentChange($event) {

  }

  downloadAttachment(attachment: any) {

  }

  deleteAttachment(id: any, id2: any) {

  }

  submit() {

  }

  uploadRejected($event: boolean) {

  }

  attachmentUploaded($event: Attachment) {

  }
}
