// pages/news/comment/comment.js
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
      title: '收到的评论',
      //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离 
    height: app.globalData.height * 2 + 20,
    comment_box: [],  // 评论的数据(接口返回)
    current_page:1,  // 当前分页
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_client_height(); // 获取窗口高度
    this.get_comment_list();  // 获取评论列表
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

  goto:function(e){
    let id = e.currentTarget.dataset.id;
    let user_id = e.currentTarget.dataset.user_id;
    let user_name = e.currentTarget.dataset.user_name;
    let comment_id = e.currentTarget.dataset.comment_id;
    wx.request({
      url: app.globalData.url+'Zilook/get_comment',
      method:'GET',
      header:{
        'Content-Type':'application/json'
      },
      data:{
        comment_id:id
      },
      success:function(data){
        if(data.data.id){
          wx.navigateTo({
            url: "/pages/comment/comment?id=" + data.data.id + '&shu=' + data.data.user_comment + '&userhid=' + data.data.user_id + '&comment_id=' + comment_id +'&user_id='+user_id+'&user_name='+user_name,
          })
        }
      },
      fail:function(data){
        console.log(data);
      }
    });
    // return;
    // wx.navigateTo({
    //   url: '/pages/index/details/index?id='+id,
    // })
  },

  get_comment_list:function(state=''){
    wx.showLoading({
      title: '正在加载...',
    });
    let that = this;
    let current_page = that.data.current_page;
    wx.request({
      method:'GET',
      url: app.globalData.url+'Zilook/receive_comment',
      data:{
        user_id: app.globalData.userInfo.id,
        page:current_page
      },
      header:{
        'Content-Type':'application/json'
      },
      success:function(data){
        console.log("收到的评论",data)
        wx.stopPullDownRefresh();
        // 如果为加载更多调用
        if(state==='more'){
          let old_data = that.data.comment_box;
          for(let i =0; i<data.data.length;++i){
            if(data.data[i].reply_msg.length>30){
              data.data[i].reply_msg = data.data[i].reply_msg.substr(0,30)+'...';
            }
            old_data.push(data.data[i]);
          }
          current_page++;
          that.setData({
            current_page:current_page,
            comment_box:old_data
          });
          wx.hideLoading();
          return 0;
        }
        current_page++;
        for(let i=0;i<data.data.length;++i){
          if (data.data[i].reply_msg.length > 30) {
            data.data[i].reply_msg = data.data[i].reply_msg.substr(0, 30) + '...';
          }
        }
        that.setData({
          comment_box:data.data,
          current_page:current_page
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
  load_more: function () { // 加载更多
  this.get_comment_list('more');
    console.log('load more');
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
    this.get_comment_list();
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