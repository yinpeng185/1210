const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标
      title: '设置', //导航栏 中间的标题
    },

    // 此页面 页面内容距最顶部的距离
    height: app.globalData.navHeight,
   
    pics: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  problemTop: function() {
    wx.navigateTo({
      url: './problem/problem',
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },
  /**
   * 图片方法
   */
  onChooseUploadImageTap: function() {
    let data = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#333333",
      success: function(res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            data.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            data.chooseWxImage('camera')
          }
        }
      }
    })
  },
  /**
   * 选择图片是从相册还是拍照选图片
   */


  chooseWxImage: function(type) {
    var data = this,
      pics = this.data.pics;

    wx.chooseImage({
      // count: 9 - pics.length,
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function(res) {
        var imgSrc = res.tempFilePaths;
        pics = pics.concat(imgSrc);
        data.setData({
          pics: pics
        })

      }
    })

  },
  // 图片预览
  previewImage: function(e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.pics,
    })
  },

  /**
   * 删除选择的图片
   */
  onDeleteImgTap: function(e) {
    const dataset = e.currentTarget.dataset,
      index = dataset.index;
    var data = this
    // if (res.cancel) return;
    const pics = data.data.pics;
    pics.splice(index, 1);
    data.setData({
      pics: pics
    });
  },


  onUpdata: function(i) {
    var _this = this;
    wx.uploadFile({
      url: app.globalData.url+'Opinion/userFeedbackImgCreate', //仅为示例，非真实的接口地址
      filePath: _this.data.pics[i],
      name: 'file',
      formData: {
        feedback_id: wx.getStorageSync('yijian'),
      },
      success(res) {
        console.log(res)
      }
    })
  },
  formSubmit: function(e) {
    var thisd = this;
    var formData = e.detail.value;
    formData.user_id = app.globalData.userInfo.id
    // console.log(formData);
    wx.request({
      url: app.globalData.url+'Opinion/userFeedbackCreate',
      data: formData,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res)
        //根据返回意见的user_Id存储图片
        wx.setStorageSync('yijian', res.data.id);
        for (var i = 0; i < thisd.data.pics.length; i++) {
          thisd.onUpdata(i)
        }
        wx.showToast({
          title: '反馈成功',
          icon:'success',
          duration:1500
        });
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          });
        },1500);
      }
    })

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
})