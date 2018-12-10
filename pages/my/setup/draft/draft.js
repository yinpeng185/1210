// pages/my/setup/draft/draft.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标
      title: '我的草稿', //导航栏 中间的标题
    },

    // 此页面 页面内容距最顶部的距离
    height: app.globalData.navHeight,
    dataArray:[]
  },

  del_caogao:function(e){
    let del_id = e.currentTarget.dataset.id;
    let that = this;
    wx.request({
      url: app.globalData.url +'Caogao/deleteCaogao',
      method:'GET',
      header:{
        'Content-Type':'application/json'
      },
      data:{
        id:del_id
      },
      success:function(res){
          wx.showToast({
            title: '删除成功',
            duration:2000
          });
          that.data_load();
      },
      fail:function(){

      }
    })
  },

  data_load:function(){

    var that = this;
    wx.request({
      url: app.globalData.url + 'Home/caogaoInfo',
      data: {
        user_id: app.globalData.userInfo.id
      },
      header: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('我的草稿');
        console.log(res.data);
        that.setData({
          dataArray: res.data
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data_load();

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

  onXq:function(e){   // 跳转到发布页
    let caogao_id = e.currentTarget.dataset.id;
    wx.setStorageSync('caogao_id',caogao_id);  // 存储草稿id
    wx.switchTab({
      url: '/pages/add/add',
    });
  },

  /**详情 */

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