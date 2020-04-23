/**
 * 实验项目
 */
import {Attachment} from './attachment';

export class Item {
  id: number;
  name: string;
  beginTime: number;
  endTime: number;
  description: string;
  attachments = new Array<Attachment>();
  active: boolean;
  dir: string;

  constructor(params?: {
    id?: number;
    name?: string;
    beginTime?: number;
    endTime?: number;
    description?: string;
    attachments?: Array<Attachment>;
    active?: boolean}) {
    if (!params) {
      return;
    }
    this.id = params.id ? params.id : null;
    this.name = params.name ? params.name : null;
    this.beginTime = params.beginTime ? params.beginTime : null;
    this.endTime = params.endTime ? params.endTime : null;
    this.description = params.description ? params.description : null;
    this.attachments = params.attachments ? params.attachments : null;
    this.active = params.active ? params.active : null;
  }

}
