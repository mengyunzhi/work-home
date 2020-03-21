/**
 * 作业
 */
import {Item} from './item';
import {Student} from './student';

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
}
