/**
 * 实验项目
 */
import { Attachment } from './attachment';

export class Item {
  id: number;
  name: string;
  beginTime: number;
  endTime: number;
  description: string;
  attachments = new Array<Attachment>();
  active: boolean;
  finalExperiment: boolean;
}
