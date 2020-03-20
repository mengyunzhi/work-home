/**
 * 变量是否被定义
 * @param value 变量
 */
export function isDefined<T>(value: T | undefined | null): value is T {
  return value as T !== undefined && value as T !== null;
}

/**
 * 获取随机数
 * @param range 范围
 */
export function getRandomNumber(range = 100) {
  return Math.floor(Math.random() * range);
}

// 深度clone一个对象
export function cloneObject(obj) {
  if (obj === null || typeof (obj) !== 'object' || 'isActiveClone' in obj) {
    return obj;
  }

  let temp;
  if (obj instanceof Date) {
    temp = new Date(obj);
  } else {
    temp = obj.constructor();
  }
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      obj.isActiveClone = null;
      temp[key] = this.clone(obj[key]);
      delete obj.isActiveClone;
    }
  }
  return temp;
}

/**
 * clone数组
 */
export function cloneArray(array: Array<any>) {
  return array.map(obj => ({...obj}));
}

/**
 * 断言。用于对参数是否符合要求进行判断。不符合要求则抛出异常
 */
export class Assert {
  /**
   * 介于两个数之间（大于等于小的且小于等于大的）
   * @param value 要比较的数值
   * @param begin 小数
   * @param end 大数
   * @param message 消息
   */
  static isBetween(value: number, begin: number, end: number, message) {
    if (begin > end) {
      const temp = end;
      end = begin;
      begin = temp;
    }
    if (value < begin || value > end) {
      throw  new Error(message);
    }
  }

  static isDefined(value: any, message: string): void {
    if (!isDefined(value)) {
      throw new Error(message);
    }
  }

  /**
   * 比某个数大
   * @param value 数
   * @param target 目标数
   * @param message 消息
   */
  static greatThan(value: number, target: number, message: string) {
    if (value <= target) {
      throw new Error(message);
    }
  }

  /**
   * 参数类型是否为number
   * @param value 值
   * @param message 消息
   */
  static isNumber(value: any, message: string) {
    if (!isDefined(value) || !Number.isInteger(value)) {
      throw new Error(message);
    }
  }

  /**
   * 比某个数小
   * @param value 数
   * @param message 消息
   */
  static smallThan(value: number, target: number, message: string) {
    if (value >= target) {
      throw new Error(message);
    }
  }
}

/**
 * 定义class类型
 */
export type Class = new(...args: any[]) => any;
