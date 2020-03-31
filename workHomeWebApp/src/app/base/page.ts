/**
 * 分页对象
 */
export class Page<T> {

  /**
   * 分页内容
   */
  content: Array<T>;

  /**
   * 是否首页
   */
  first: boolean;

  /**
   * 是否尾页
   */
  last: boolean;

  /**
   * 每页大小
   */
  size: number;

  /**
   * 第几页
   */
  number: number;

  /**
   * 总页数
   */
  totalPages: number;

  /**
   * 当前页数据条数
   */
  numberOfElements: number;

  /**
   * 总数据条数
   */
  totalElements: number;

  constructor(params?: { content?: Array<T>, number?: number, size?: number, totalPages?: number}) { // 增加构造函数，刘宇轩
    if (!params) {
      return;
    }
    this.content = params.content ? params.content : null;
    this.number = params.number ? params.number : null;
    this.size = params.size ? params.size : null;
    this.totalPages = params.totalPages ? params.totalPages : null;
  }
}
