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
}
