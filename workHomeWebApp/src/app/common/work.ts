/**
 * 作业
 */
import {Item} from './item';
import {Student} from './student';
import { Attachment } from './attachment';

/**
 * 作业
 */
export class Work {
  id: number;
  content: string;
  createTime: Date;
  item = new Item();
  score: number;
  student = new Student();
  updateTime: Date;
  reviewed: boolean;
  attachments = new Array<Attachment>();

  constructor(params?: {
    id?: number,
    content?: string;
    createTime?: Date;
    item?: Item;
    score?: number;
    student?: Student;
    updateTime?: Date;
    reviewed: boolean;
    attachments?: Array<Attachment>}) {
    if (!params) {
      return;
    }
    this.id = params.id ? params.id : null;
    this.content = params.content ? params.content : '';
    this.createTime = params.createTime ? params.createTime : null;
    this.item = params.item ? params.item : null;
    this.score = params.score ? params.score : null;
    this.student = params.student ? params.student : null;
    this.updateTime = params.updateTime ? params.updateTime : null;
    this.reviewed = params.reviewed ? params.reviewed : null;
    this.attachments = params.attachments ? params.attachments : null;
  }
}
