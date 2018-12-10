const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标
      title: '我的钱包', //导航栏 中间的标题
    },

    // 此页面 页面内容距最顶部的距离
    height: app.globalData.navHeight,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: app.globalData.url + 'User/getMoneyApi',
      data: {
        id: app.globalData.userInfo.id
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log('查看')
        console.log(res.data.data);
        that.setData({
          money: res.data.data.money
        })
      }
    })
    wx.request({
      url: app.globalData.url + 'LooK/pingtaiSetting',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log('查看2')
        console.log(res.data.data);
        that.setData({
          setting: res.data.data
        })
      }
    })

  },
  tixian: function(e) {
    console.log('体现')
    var that = this;
    console.log(this.data.setting)
    if (this.data.money < this.data.setting.tx_money) {
      wx.showModal({
        title: '金额不足',
        content: '金额不足' + this.data.setting.tx_money + '无法提现',
        success: function(res) {
          if (res.confirm) { //这里是点击了确定以后
            console.log('用户点击确定')
          } else { //这里是点击了取消以后
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.request({
        url: app.globalData.url + 'Tixian/putForward',
        data: {
          id: app.globalData.userInfo.id,
          money: that.data.money
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function(res) {
          console.log('查看3')
          console.log(res);
          wx.showModal({
            title: '体现审核中',
            content: '请稍等..',
            success: function(res) {
              if (res.confirm) { //这里是点击了确定以后
                console.log('用户点击确定')
                that.onShow()
              } else { //这里是点击了取消以后
                console.log('用户点击取消')
              }
            }
          })
        }
      })
    }
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
    this.onLoad()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  recordTop: function() {
    wx.navigateTo({
      url: './record/record',
    })
  },
  ongz: function() {
    wx.navigateTo({
      url: './gz/gz',
    })
  },

  onsy: function() {
    wx.navigateTo({
      url: './sy/sy',
    })
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

  }
})