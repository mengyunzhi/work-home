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

export class Random {
  /**
   * 获取随机数据
   * @param width 位宽
   */
  static nextNumber(width = 32) {
    let range = 1;
    while (width > 0) {
      range = range * 2;
      width--;
    }

    return Math.floor(Math.random() * range);
  }

  /**
   * 获取随机字符串
   * @param prefix 返回字符串的前缀
   * @param length 字符串长度
   */
  static nextString(prefix = '', length = 4) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return prefix + result;
  }
}

/**
 * 计算一个算式的字符串
 * @param string
 * https://stackoverflow.com/questions/6479236/calculate-string-value-in-javascript-not-using-eval
 */
export function stringToNumber(string) {
  return new Function('return ' + string)();
}

/**
 * 检查目录格式是否符合 /test1/test2/..
 * 只能使用数字,字母和下划线
 * @param dir 目录
 *
 */
export function checkDir(dir: string): boolean {
  const reg = '^\\/(\\w+\\/?)+$';
  return dir.search(reg) === 0;
}
