// pages/add/label/label.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    fla: 0,
    xmm:'uu',
    hhu:true,
    user_list:[],
    is_select:false,  // 是否选择了用户
    user_fans:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      navH: app.globalData.navHeight
    })
    var a = 10,
      b = 20;
      this.get_user_fans();
  },
  bqOn: function (e) {
    var id = e.currentTarget.dataset.id
    var username = e.currentTarget.dataset.username
    // console.log(id)
    // console.log(username)
    // wx.switchTab({
    //   url: '../../add/add',
    // })
    // app.globalData.username = username 
    // console.log(username)
    // app.globalData.id = id 
    // wx.switchTab({ url: '/pages/add/add' });  
    console.log(this.data.is_select);
    wx.navigateBack({//返回
      delta: 1
    })
   
  },

  add_user_to_list:function(e){
    this.setData({
      user_fans:false
    });
    let user_id = e.currentTarget.dataset.user_id;  // 所选择的用户id
    let user_name = e.currentTarget.dataset.user_name; // 所选择的用户名
    let pages = getCurrentPages();//当前页面
    let prevPage = pages[pages.length - 2];//上一页面

    let user_info = prevPage.data.user_info;  // 添加晒一晒页已有的用户信息
    let username = prevPage.data.username;  // 添加晒一晒页已有的输入内容
    let user_exits = false;
    username += ' @' + user_name + ' ';
    for(let i=0;i<user_info.length;++i){  // 判断用户是否已在列表，防止重复点击
      if(user_info[i].user_id===user_id){
        user_exits = true;
      }
    }
    if(!user_exits){  // 不存在则添加进去
      user_info.push({ user_id: user_id, user_name: user_name });
    }

    prevPage.setData({
      user_info:user_info,
      username:username
    });

    wx.navigateBack({  // 选择好用户返回到之前的晒一晒添加页
      delta:1
    });
  },

  get_user_fans:function(){  // 获取用户关注的列表
  let that = this;
    wx.request({
      url: app.globalData.url +'Search/userFollow',
      method:'GET',
      data:{
        user_id:app.globalData.userInfo.id
      },
      header:{
        'Content-Type':'application/json'
      },
      success(data){
        console.log(data);
        that.setData({
          user_fans:data.data
        });
      },
      fail(data){
        console.log(data);
      }
    })
  },

  /**
   * 搜索输一个搜索一个
   */
  bindKeyInput: function (e) {
    var that = this;
    // console.log(e.detail.cursor)
    // console.log(e.detail.value)
    if(e.detail.value.length==0){
      this.setData({
        hhu:true
      });
    }
    if (e.detail.cursor !== 0) {
      var username = e.detail.value;
      wx.request({
        url: app.globalData.url +'Search/userSearch',
        data: {
          keyword: username,
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {  // 请求成功，搜索到的结果
          var data = res.data;
          console.log(data);
          that.setData({
            user_list:data
          });
        }
      })
    } else {
      that.setData({
        status: e.detail.cursor,
        fla: 0,
      })
    }
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