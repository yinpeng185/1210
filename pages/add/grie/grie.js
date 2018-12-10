// pages/add/label/label.js
const app = getApp();
let pages; // 当前页
let prevPage; // 上一页
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    fla: 0,
    search_state:'历史记录',
    article_list:[], // 话题历史记录列表
    hot_article_list:[], // 热门话题列表
    jg:'init',
    is_select_topic:false
  },

  clear_record:function(){  // 清除历史记录
    wx.setStorageSync('old_topic_search','');
    this.setData({
      article_list:[]
    })
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
    pages = getCurrentPages(); // 当前页
    prevPage = pages[pages.length - 2]; // 上一页
    let old_search_record = wx.getStorageSync('old_topic_search');
    (typeof old_search_record!=='string') && that.setData({
      article_list:old_search_record
    });
    this.get_hotTopic();
  },
  get_hotTopic:function(){
    let that = this;
    wx.request({
      url: app.globalData.url + 'Search/hotTopic',
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success(data) {
        that.setData({
          hot_article_list:data.data
        });
      },
      fail(data) {
        console.log(data);
      }
    })
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
    let pages = getCurrentPages();//当前页面
    let prevPage = pages[pages.length - 2];//上一页面
    prevPage.setData({
      username: username
    });
    wx.navigateBack({//返回
      delta: 1
    })
   
  },

  add_topic_to_list:function(e){  // 添加话题到列表
  console.log(e);
    let topic_id = e.currentTarget.dataset.article_id;
    let topic_title = e.currentTarget.dataset.article_title;
    let old_topic_list = prevPage.data.topic_info;
    let user_name = prevPage.data.username;
    user_name+=' #'+topic_title+'# ';
    let user_exits = false;
    for (let i = 0; i < old_topic_list.length; ++i) {  // 判断话题是否已在列表，防止重复点击
      if (old_topic_list[i].topic_id === topic_id) {
        user_exits = true;
      }
    }
    if (!user_exits) {  // 不存在则添加进去
      old_topic_list.push({ topic_id: topic_id, topic_title: topic_title });
    }
    prevPage.setData({
      username:user_name,
      topic_info:old_topic_list
    });
    this.setData({
      is_select_topic:true
    });
    let old_record = wx.getStorageSync('old_topic_search');
    if(typeof old_record === 'string'){
      wx.setStorageSync('old_topic_search',[{id:topic_id,topic_title:topic_title}]);
    }else{
      let topic_exits = false;
      for(let i=0;i<old_record.length;++i){
        if(old_record[i].id ==topic_id){
          topic_exits = true;
        }
      }
      if(topic_exits===false){
        old_record.push({ id: topic_id, topic_title: topic_title });
        wx.setStorageSync('old_topic_search', old_record);
      }
    }
    wx.navigateBack({
      delta:1
    }); 
  },

  create_topic:function(){  // 添加新的话题
    let topic_title = this.data.value;
    let that = this;
    wx.request({
      url: app.globalData.url+'Add/addTopic',
      method:'GET',
      data:{
        topic_title:topic_title,
        topic_content:topic_title
      },
      header:{
        'Content-Type':'application/json'
      },
      success(data){
        if(!data.data.id){
          wx.showModal({
            title: '错误',
            content: '创建新话题失败了',
          });
          return;
        }
        if(data.data.id){
          wx.showToast({
            title: '添加成功',
          });
          let topic_id = data.data.id;
          let topic_title = data.data.topic_title;
          let old_topic_list = prevPage.data.topic_info;
          let user_name = prevPage.data.username;
          user_name += ' #' + topic_title + '# ';
          let user_exits = false;
          for (let i = 0; i < old_topic_list.length; ++i) {  // 判断话题是否已在列表，防止重复点击
            if (old_topic_list[i].topic_id === topic_id) {
              user_exits = true;
            }
          }
          if (!user_exits) {  // 不存在则添加进去
            old_topic_list.push({ topic_id: topic_id, topic_title: topic_title });
          }
          prevPage.setData({
            username: user_name,
            topic_info: old_topic_list
          });
          that.setData({
            is_select_topic: true
          });
          wx.navigateBack({
            delta: 1
          });
        }
        
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
    if (e.detail.cursor !== 0) {
      var username = e.detail.value;
      wx.request({
        url: app.globalData.url +'Search/topicList',
        data: {
          keyword:username
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log(res);
          let res_num;
          
          if(res.data.length == 0){
            res_num = 'true';
          }else{
            res_num = 'false';
          }
          that.setData({
            article_list:res.data,
            search_state:'搜索结果',
            jg:res_num,
            value:username
          });
          console.log(res_num);
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