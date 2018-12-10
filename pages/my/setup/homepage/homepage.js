const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMaltose: true,
    userInfo: '',
    nvabarData: {
      showCapsule: 1,
      //是否显示左上角图标
      title: 'Ta的主页',
      //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离 
    height: app.globalData.navHeight,
    hh: 0,
    guanzhu: false,
    that_id: 0,
    goods_info: [],
    imgfd: [],
    openid: ''
  },
  bindKg: function() {
    let show = !this.data.showMaltose
    this.setData({
      focus: true,
      showMaltose: show,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options);
    that.setData({
      zjid: app.globalData.userInfo.id
    })
    wx.request({

      url: app.globalData.url +'Look/get_user_info',
      method:'GET',
      header:{
        'Content-Type':'application/json'
      },
      data:{
        user_id:options.id,
        mine:app.globalData.userInfo.id
      },
      success:function(res){
        console.log(res.data);
        that.setData({
          userInfo:res.data,
          guanzhu:res.data.hasChange,
          that_id:options.id
        });
      },
      fail:function(res){
        console.log(data);
      }
    });
    // return;
    wx.request({
      url: app.globalData.url + 'Look/looking',
      data: {
        user_id: options.id
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log('查看晒晒加载')
        console.log(res);
        console.log(res.data.data)

        that.setData({
          shaishai: res.data.data,
        })
      },

      fail: function (res) { },
      complete: function (res) { },
    });
    wx.request({
      url: app.globalData.url + 'Look/shouCangInfo',
      method: 'GET',
      data: {
        user_id: options.id
      },
      header: {
        'Content-Type': 'application/json'
      },
      success(data) {
        console.log(data.data.data);
        console.log('加载收藏信息成功');
        that.setData({
          shoucang: data.data.data
        });
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  get_add_info:function(res){  // 获取用户推荐
    let show = !this.data.showMaltose
    this.setData({
      focus: true,
      showMaltose: show,
    });
    let user_id = app.globalData.userInfo.id;
    let that = this;
    wx.request({
      url: app.globalData.url + 'Add/userinfo',
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        user_id: user_id
      },
      success: function(res) {
        console.log(res);
        that.setData({
          goods_info: res.data
        });
      },
      fail: function(res) {

        console.log(res);
      }
    })
  },


  add_guanzhu:function(e){  // 添加用户关注
    let form_user_id = this.data.zjid;
    let user_id = this.data.that_id;
    let that = this;
    wx.request({

      url: app.globalData.url+'Look/guanZhu',
      method:'GET',
      header:{
        'Content-Type':'application/json'
      },
      data:{
        form_user_id:form_user_id,
        user_id:user_id
      },
      success:function(res){
          that.setData({
            guanzhu:res.data.hasChange
          });
      },
      fail:function(res){
        console.log(res);
      }
    })
  },


  navbarTap: function(e) {


    this.setData({
      hh: e.currentTarget.dataset.index
    })

  },

  get_user_info() { // 加载用户信息


  },

  /**
   * 生命周期函数--监听页面显示
   */

  onShow: function () {

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
  previewImage: function(e) {
    var current = e.currentTarget.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imgfd,
    })
  },

})