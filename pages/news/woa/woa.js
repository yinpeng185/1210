// pages/news/woa/woa.js
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
      title: '收到的@',
      //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离 
    height: app.globalData.height * 2 + 20,
    woa_box: [],  // 评论的数据(接口返回)
    current_page:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.get_client_height();
  this.get_at_list();
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

  goto(e){  // 页面跳转
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/index/details/index?id='+id,
    });
  },

  load_more:function(){ //加载更多
    this.get_at_list('more');
    console.log('load more');
  },

  get_at_list:function(state=''){
    let that = this;
    let current_page=this.data.current_page;
    wx.showLoading({
      title: '正在加载...',
    });
    wx.request({
      url: app.globalData.url+'Zilook/atMine',
      method:'GET',
      data:{
        user_id:app.globalData.userInfo.id,
        page:current_page
      },
      header:{
        'Content-Type':'application/json'
      },
      success:function(data){
        wx.stopPullDownRefresh();
        if (state === 'more') {  // 当是加载更多调用的时候
          let old_data = that.data.woa_box;
          for(let i =0;i<data.data.length;++i){
            old_data.push(data.data[i]);
          }
          current_page++;
          that.setData({
            woa_box:old_data,
            current_page:current_page
          });
          wx.hideLoading();
          return 0;
        }
        current_page++;
        that.setData({
          woa_box:data.data,
          current_page:current_page
        });
        wx.hideLoading();
      },
      fail:function(data){
        wx.stopPullDownRefresh();
        wx.hideLoading();
        wx.showToast({
          title: '加载失败!',
          duration:2000
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
  this.setData({
    current_page:1,
  });
  this.get_at_list();
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