const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标
      title: '消息', //导航栏 中间的标题
    },

    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let that = this;
    // var contex = wx.createCanvasContext('firstCanvas')
    // contex.save(); // 先保存状态 已便于画完圆再用
    // contex.beginPath(); //开始绘制
    // //先画个圆
    // contex.arc(180, 180, 180, 0, Math.PI * 2, false);
    // contex.clip(); //画了圆 再剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内
    // contex.drawImage(that.data.image.src, 0, 0, that.data.image.width, that.data.image.heigth); // 推进去图片
    // contex.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 可以继续绘制
    // contex.draw();
   
    this.tish()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.tish()
  },

  fabTop: function () {
    //  console.log("hhh")
    wx.navigateTo({
      url: './fabulous/fabulous',
    })
    this.tish()
  },

  collTop: function () {
    //  console.log("hhh")
    wx.navigateTo({
      url: './collection/collection',
    })
  },

  plTop: function () {
    //  console.log("hhh")
    wx.navigateTo({
      url: './comment/comment',
    })
  },

  woaTop: function () {
    wx.navigateTo({
      url: './woa/woa',
    })
  },

  fansTop: function () {
    //  console.log("hhh")
    wx.navigateTo({
      url: './fans/fans',
    })
  },

  noTop: function () {
    wx.navigateTo({
      url: './notice/notice',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.tish()
  },

  // 通知
  tish: function () {
    // console.log(app.globalData.userInfo.id)
    var that = this
    if (app.globalData.userInfo) {
      wx.request({
        url: app.globalData.url + 'Zilook/status',
        data: {
          user_id: app.globalData.userInfo.id
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log("通知")
          console.log(res.data)
          that.setData({
            tz: res.data
          })

        }
      })
    }
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

  }
})