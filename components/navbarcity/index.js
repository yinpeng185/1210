// components/navbar/index.js
const App = getApp();

Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    pageName: String,
    showNav: {
      type: Boolean,
      value: true
    },
    showHome: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes: {
    attached: function () {
      this.setData({
        navH: App.globalData.navHeight
      })
    }
  },
  /**
 * 组件的方法列表
 */
  methods: {
    //回退
    navBack: function () {
      console.log("上一页")
      wx.switchTab({
        url: '/pages/index/index',
      })
    },
    //回主页
    toIndex: function () {
      console.log("回主aaaaa页")
      wx.switchTab({
        url: '/pages/index/index',
      })
    },
  }
})