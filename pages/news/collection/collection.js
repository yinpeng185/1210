// pages/news/collection/collection.js.
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page_height: 0,
    nvabarData: {
      showCapsule: 1,
      //是否显示左上角图标
      title: '收藏',
      //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离 
    height: app.globalData.height * 2 + 20,
    collection_box:[],  // 收藏的数据(接口返回)
    current_page:1,  // 当前分页
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_client_height();
    this.get_message_list();
    // console.log(app.globalData.userInfo)
    // var that = this;
    // wx.request({
    //   url: app.globalData.url + '/Look/shouCang',
    //   data: {
    //     user_id: app.globalData.userInfo.id,
    //   },
    //   header: {},
    //   method: 'GET',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: function (res) {
    //     console.log(res.data)
    //     that.setData({
    //       shoucang: res.data
    //     })
    //   },
    //   fail: function (res) { },
    //   complete: function (res) { },
    // })
  },

  goto:function(id){  // 页面跳转
    id = id.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/index/details/index?id='+id,
    });
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
  load_more:function(){ // 加载更多
  this.get_message_list('more');
    console.log('load more');
  },

  // 获取api接口数据
  get_message_list:function(state=''){
    let that = this;
    let current_page = that.data.current_page;
    wx.showLoading({
      title: '正在加载...',
    });
    wx.request({
      method:'GET',
      url: app.globalData.url+'Zilook/shouCang',
      header: {
        'Content-Type': 'application/json'
      },
      data:{
        user_id:app.globalData.userInfo.id,
        page:current_page
      },
      success:function(data){
        console.log(data)
        wx.stopPullDownRefresh();
        // 如果为加载更多
        if(state==='more'){
          let old_data = that.data.collection_box;
          for(let i = 0;i< data.data.length;i++){
            old_data.push(data.data[i]);
          }
          current_page++;
          that.setData({
            current_page:current_page,
            collection_box:old_data
          });
          wx.hideLoading();
          return 0;
        }
        current_page++;
        that.setData({
          current_page:current_page,
          collection_box:data.data
        });
        wx.hideLoading();
      },
      fail:function(data){
        wx.stopPullDownRefresh();
        wx.hideLoading();
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
    this.setData({
      current_page:1
    });
    this.get_message_list();
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