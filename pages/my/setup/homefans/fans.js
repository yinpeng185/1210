// pages/news/fans/fans.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page_height: 0,
    nvabarData: {
      showCapsule: 1,
      //是否显示左上角图标
      title: '我的粉丝',
      //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离 
    navH: app.globalData.navHeight,
    fans_box: [],  // 新增粉丝的数据(接口返回)
    current_page: 1,
    pdid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_client_height();
    this.get_fans_list();  // 获取粉丝列表

    
    if (options.gzid){
    this.setData({
      pdid: options.gzid
    })
   }
  },
  get_client_height: function () { //获取窗口最大高度
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          page_height: res.windowHeight - (res.windowWidth / 750) * 94
        })
      }
    })
  },

  goto_fans(e) {  // 关注用户开关
    let user_id = e.currentTarget.dataset.id;
    console.log("修改关注id", user_id)
    let that = this;
    console.log(app.globalData.url + 'Zilook/gotoFans')
    wx.request({
      url: app.globalData.url + 'Zilook/gotoFans',
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        user_id: app.globalData.userInfo.id,
        form_user_id: user_id
      },
      success: function (data) {
        console.log(data);
        let state = data.data.msg;
        let that_user = that.data.fans_box;
        for (let i = 0; i < that_user.length; ++i) {
          if (that_user[i].id == user_id) {
            if (state == '关注成功') {
              that_user[i].state = '已关注'
            } else {
              that_user[i].state = '关注'
            }
          }
        }
        that.setData({
          fans_box: that_user
        });
        console.log(data);
      },
      fail: function (data) {
        console.log(data);
      }
    })
  },

  goto_home: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/my/setup/homepage/homepage?id=' + id,
    });
  },

  get_fans_list: function (state = '') {
    let that = this;
    let current_page = that.data.current_page;
    wx.showLoading({
      title: '正在加载...',
    });
    wx.request({
      method: 'GET',
      url: app.globalData.url + 'Look/myFans',
      data: {
        user_id: app.globalData.userInfo.id,
        page: current_page
      },
      header: { 'Content-Type': 'application/json' },
      success: function (data) {
        console.log("关注和粉丝", data.data);
        console.log("关注", data.data.myGuanzhu)
        console.log("粉丝", data.data.myFans)
        console.log("判断", that.data.pdid)
        if (that.data.pdid==22) {
          var data = data.data.myGuanzhu
        } else {
          var data = data.data.myFans
        }
        console.log("成功判断", data)
        wx.stopPullDownRefresh();
        // 如果为加载更多
        if (state === 'more') {
          let old_data = that.data.fans_box;
          for (let i = 0; i < data.data.length; ++i) {
            old_data.push(data.data[i]);
          }
          current_page++;
          that.setData({
            current_page: current_page,
            fans_box: old_data,
            pdid: that.data.pdid
          });
          wx.hideLoading();
          return 0;
        }
        current_page++;
        that.setData({
          current_page: current_page,
          fans_box: data,
          pdid: that.data.pdid
        });
        wx.hideLoading();
      },
      fail: function (data) {
        wx.stopPullDownRefresh();
        wx.hideLoading();
        wx.showModal({
          title: '错误',
          content: '网络开小差了',
        });
      }
    })
  },
  load_more: function () { //加载更多
    this.get_fans_list('more');
    console.log('load more');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      current_page: 1,
    });
    this.get_fans_list();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})