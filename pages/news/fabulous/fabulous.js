// pages/news/fabulous/fabulous.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page_height:0,
    nvabarData: {
      showCapsule: 1,
      //是否显示左上角图标
      title: '收到的赞',
      //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离 
    height: app.globalData.height * 2 + 20,
    zan_box:[],  // 收到的赞数据(接口返回)
    current_page:1,  // 当前加载页
  },
  load_more: function () { // 加载更多
    this.get_message_list('more');
    console.log('load more');
  },

  goto:function(id){
    id = id.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/index/details/index?id='+id,
    })
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
    //   url: app.globalData.url +'/Look/userdianZanList',
    //   data: {
    //     user_id: app.globalData.userInfo.id,
    //   },
    //   header: {},
    //   method: 'GET',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: function(res) {
    //     console.log(res.data)
    //     that.setData({
    //       dianzan: res.data           
    //     })
    //   },
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })
  },

  get_message_list:function(state=''){  // 获取点赞列表
  let that = this;
  let current_page = this.data.current_page;
    wx.showLoading({
      title: '正在加载...',
    });
    wx.request({
      method:'GET',
      url: app.globalData.url+'Zilook/userdianZanList',
      data:{
        user_id: app.globalData.userInfo.id,
        page:current_page
      },
      header:{
        'Content-Type':'application/json',
      },
      success:function(data){
        console.log("收到的赞", data)
        wx.stopPullDownRefresh();
        if(state==='more'){  // 加载更多时的调用
          let old_data = that.data.zan_box;
          for(let i=0;i<data.data.length;++i){
            old_data.push(data.data[i]);
          }
          current_page++;
          that.setData({
            zan_box:old_data,
            current_page:current_page
          });
          wx.hideLoading();
          return 0;
        }
        current_page++;
        that.setData({
          zan_box:data.data,
          current_page:current_page
        })
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

  get_client_height:function(){
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          page_height: res.windowHeight - (res.windowWidth / 750) * 94
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