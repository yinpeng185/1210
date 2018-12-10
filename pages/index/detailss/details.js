// pages/home/details/details.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArray1: [{
      id: 1,
      home_uaer_name: "可儿",
      r_image: "/images/follow/gztp.png",
      image: ["/images/sss.png", "http://www.xcx.com/public/mmm_mmm/min_img/1542091273290-2018-11-13.jpg"],
      user_praise: 0,
      description: "明明可以靠颜值，非要靠才华，他日烈火成",
    }, {
      id: 2,
      home_uaer_name: "可儿",
      r_image: "/images/follow/gztp.png",
      image: ["/images/sss.png", "http://www.xcx.com/public/mmm_mmm/min_img/1542091273290-2018-11-13.jpg"],
      user_praise: 0,
      description: "明明可以靠颜值，非要靠才华，他日烈火成",
    }, {
      id: 1,
      home_uaer_name: "可儿",
      r_image: "/images/follow/gztp.png",
      image: ["/images/sss.png", "http://www.xcx.com/public/mmm_mmm/min_img/1542091273290-2018-11-13.jpg"],
      user_praise: 0,
      description: "明明可以靠颜值，非要靠才华，他日烈火成",
    },]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      navH: app.globalData.navHeight,
      dataArray: that.data.dataArray1
    })
  },

  // 分享
  showfx: function () {
    // console.log("hh");
    this.setData({ show_fenxiang: true })
  },

  showfxqx: function () {
    // console.log("hh");
    this.setData({ show_fenxiang: false })
  },
  reportTop: function () {
    wx.navigateTo({
      url: './report/report',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  listenSwiper: function (e) {
    console.log(e);
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