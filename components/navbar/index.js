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

      /* 返回晒一晒添加页之前的处理 */

      let pages = getCurrentPages();//当前页面
      let prevPage = pages[pages.length - 2];//上一页面
      if (pages[pages.length - 1].data.is_select === false){  // 是否为晒一晒添加页,是否未选择用户
        let user_name = prevPage.data.username;  // 获取晒一晒添加页的输入数据
        user_name+='@';
        let is_button_nav = prevPage.data.is_button_nav;
        if(is_button_nav===false){
        prevPage.setData({
          username:user_name
        });
        }
      }
      if(pages[pages.length-1].data.is_select_topic === false){  // 是否为话题添加页
        let user_name = prevPage.data.username;
        user_name+='#';
        let is_button_nav = prevPage.data.is_button_nav;
        if (is_button_nav === false) {
          prevPage.setData({
            username: user_name
          });
      }
      }


      wx.navigateBack({
        delta: 1
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