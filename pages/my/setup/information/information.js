// pages/my/information/information.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标
      title: '个人信息', //导航栏 中间的标题
    },

    array: ['未设置','男', '女'],
    gender: 0,

    // 此页面 页面内容距最顶部的距离
    height: app.globalData.navHeight,
    date: '2016-09-01',
    navH: app.globalData.navHeight,
    imgfd:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.userInfo != null) {
      this.setData({
        userInfo: app.globalData.userInfo,
        avatarUrl: app.globalData.userInfo.avatarUrl,
        gender:app.globalData.userInfo.gender
      })
    }
  },

  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  nchTop: function() {
    wx.navigateTo({
      url: './nickname/nickname',
    })
  },


  zhutiTop: function() {
    wx.navigateTo({
      url: './location/location',
    })
  },
  gxqmTop: function() {
    wx.navigateTo({
      url: './autograph/autograph',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 图片方法
   */
  onChooseUploadImageTap: function() {
    let data = this;
    wx.showActionSheet({
      itemList: ['选择图片', '相机拍照'],
      itemColor: "#333333",
      success: function(res) {
        // console.log(res)
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            data.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            data.chooseWxImage('camera')
          }
        }
      }
    })
  },
  /**
   * 选择图片是从相册还是拍照选图片
   */

  chooseWxImage: function(type) {
    var data = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function(res) {
        var imgSrc = res.tempFilePaths;
        data.setData({
          avatarUrl: imgSrc
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    wx.request({
      url: app.globalData.url + '/User/getUseris',
      data: {
        openid: wx.getStorageSync('openid')
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        app.globalData.userInfo = res.data
        that.onLoad();
      }
    })

    this.data.imgfd.push(app.globalData.userInfo.avatarUrl)
    console.log("TTYYG")
    console.log(this.data.imgfd)
    console.log(app.globalData.userInfo.avatarUrl)

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

  },

   previewImage: function (e) {
    var current = e.currentTarget.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imgfd,
    })
  },

})