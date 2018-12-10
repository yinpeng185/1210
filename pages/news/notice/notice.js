// pages/news/notice/notice.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page_height: 0,
    height: app.globalData.height * 2 + 20,
    nvabarData: {
      showCapsule: 1,
      //是否显示左上角图标
      title: '通知',
      //导航栏 中间的标题
    },
    notice_box:[],
    current_page:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_client_height();
    this.get_notice_list();
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

  goto_detail:function(e){  // 跳转详情页
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/index/details/index?id='+id,
    });
  },

  get_notice_list:function(){
    let that = this;
    let current_page = this.data.current_page;
    wx.request({
      url: app.globalData.url+'Zilook/noticeList',
      method:'GET',
      data:{
        user_id: app.globalData.userInfo.id,
        page:current_page
      },
      header:{
        'Content-Type':'application/json'
      },
      success:function(data){
        that.setData({
          notice_box:data.data
        });
      },
      fail:function(data){
        wx.showModal({
          title: '错误',
          content: '网络开小差了',
        });
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