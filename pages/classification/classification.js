// pages/classification/classification.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数
    nvabarData: {
    showCapsule: 0, //是否显示左上角图标
      title: '全部分类', //导航栏 中间的标题
  },

  // 此页面 页面内容距最顶部的距离
  height: app.globalData.navHeight,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      navH: app.globalData.navHeight
    })

    wx.request({
      url: app.globalData.url + '/Home/getClassInfo',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          category: res.data
        })
      }
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

  },

  bqOn:function(e){
    // console.log(e)
    var fl = e.currentTarget.dataset, id=fl.id,name=fl.name
    // console.log(id+name)
    let pages = getCurrentPages();//当前页面
    let prevPage = pages[pages.length - 2];//上一页面
    prevPage.setData({
      name: name,
      id:id
    });
    wx.navigateBack({//返回
      delta: 1
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

  }
})