const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1,
      //是否显示左上角图标
      title: '消息设置',
      //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离 
    height: app.globalData.navHeight,
    ondata: ''
  },

  switch1Change: function (e) {
    console.log(e)
    var that = this;
    if (e.detail.value == false) {
      wx.request({
        url: app.globalData.url + '/Look/newsSetting', //仅为示例，并非真实的接口地址
        data: {
          user_id: app.globalData.userInfo.id,
          kg: e.target.id,
          val: 1
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res.data)
        }
      })
    } else {
      wx.request({
        url: app.globalData.url + '/Look/newsSetting', //仅为示例，并非真实的接口地址
        data: {
          user_id: app.globalData.userInfo.id,
          kg: e.target.id,
          val: 2
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res.data)
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(app.globalData.userInfo.id)
    wx.request({
      url: app.globalData.url + '/Look/newsSet', //仅为示例，并非真实的接口地址
      data: {
        user_id: app.globalData.userInfo.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          ondata: res.data
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  // switch1Change: function(e) {
  //   console.log('switch1 发生 change 事件，携带值为', e.detail.value)
  // },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.onLoad()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})