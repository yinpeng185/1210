const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1,
      //是否显示左上角图标
      title: '个性签名',
      //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离 
    navH: app.globalData.navHeight,
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
    })
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
    var that = this;
    wx.request({
      url: app.globalData.url + '/Look/getInfo',
      data: {
        user_id: app.globalData.userInfo.id
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        app.globalData.userInfo = res.data[0]
        console.log(res)
        that.onLoad();
      }
    })
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

  },
  tijiao: function (e) {
    console.log(e)
    var that = this;
    wx.request({
      url: app.globalData.url + '/Look/setingUserInfo',
      data: {
        autograph_name: e.detail.value['autograph_name'],
        user_id: app.globalData.userInfo.id
      },
      header: {
        'Content-Type': 'application/json'
      },

      success: function (res) {
        that.setData({
        })
        wx.navigateBack({ changed: true });


      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }

})