export class TestingUtils {
  /**
   * 获取随机数字
   * @param range 范围
   */
  static randomNumber(range = 100) {
    return Math.floor(Math.random() * range);
  }

  static randomString(prefix = '') {
    return prefix + Math.random().toString(36).slice(-10);
  }
}

