import { User } from './user';
import { Random } from '../utils';

export class Attachment {
  /** id */
  id: number;

  /** 附件原始名称 */
  originName: string;

  /** 附件存储路径 */
  path: string;

  /** 附件扩展名 */
  ext: string;

  sha1: string;

  md5: string;
  /**
   * 保存的名字
   */
  saveName: string;
  savePath: string;

  /** 创建用户 */
  createUser: User;

  constructor(data?: {
    id?: number,
    originName?: string,
    path?: string,
    name?: string,
    ext?: string,
    sha1?: string,
    md5?: string,
    createUser?: User
    saveName: string
  }) {
    if (data) {
      this.id = data.id;
      this.originName = data.originName;
      this.path = data.path;
      this.ext = data.ext;
      this.sha1 = data.sha1;
      this.md5 = data.md5;
      this.createUser = data.createUser;
    }
  }

  static getOneAttachment() {
    return new Attachment({
      id: Random.nextNumber(),
      originName: 'originName' + Random.nextString(),
      path: 'path' + Random.nextString(),
      ext: 'ext' + Random.nextString(),
      sha1: 'sha1' + Random.nextString(),
      md5: 'md5' + Random.nextString(),
      saveName: 'saveName' + Random.nextString()
    });
  }
}
