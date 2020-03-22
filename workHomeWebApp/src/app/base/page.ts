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
}
