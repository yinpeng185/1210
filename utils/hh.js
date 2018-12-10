import QQMapWX from './qqmap-wx-jssdk.min.js'; // 引入SDK核心类
import _ from './underscore.js';
export default class util {
  /**
   * 随机安全获取qqmapsdk
   */
  static qqMapKeys = [
    'YX2BZ-KIACS-NZRO4-6CXHO-EHZ3Z-OCB6U',
    'AGIBZ-ZVRK4-RFIUB-XLQ3X-UIXPF-K5FS7',
    'V7BBZ-WXT6J-PQMF4-FFQZB-NVDCH-LKFUY',
    'EWUBZ-BTZ33-GMW3I-3FYII-XIKM2-DXBAM',
    'YDUBZ-ZHGC5-D65I6-QKTDH-PBM6E-SGF2M',
  ];

  /**
   * 安全获取MapSdk
   */
  static getMapSdk() {
    let primaryKey = 'L2MBZ-BQGKF-HOQJU-NSFR2-EZN5V-L4BA7',
      key = '';
    if (Math.floor(Math.random() * 3) === 2) {
      if (Math.floor(Math.random() * 3) === 2) { //打乱数组
        util.qqMapKeys = _.shuffle(util.qqMapKeys);
      }
      const index = Math.floor(Math.random() * (util.qqMapKeys.length - 1));
      key = util.qqMapKeys[index];
    } else {
      key = primaryKey;
    }

    return new QQMapWX({
      key: key
    }); // 实例化API核心类
  }
};

if (typeof(module) !== 'undefined') module.exports = util;