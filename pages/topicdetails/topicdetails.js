// pages/topicdetails/topicdetails.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    childCid: 0, //选项卡默认选中
    dataArray: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      navH: app.globalData.navHeight
    })
    this.loadData(0)
  },
  lower: function(e) {
    console.log(e)
    var id = e.currentTarget.dataset['lastid']
    this.loadData(id)
  },
  loadData: function(lastid) {
    var limit = 6
    var that = this
    wx.request({
      url: app.globalData.url+'/Home/getPageContentInfo',
      data: {
        lastid: lastid,
        limit: limit
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        // console.log(res)
        console.log(res.data.data.data)
        if (res.data.data.data.length == 0) {
          return false;
        }
        var len = res.data.data.data.length
        var dataArr = that.data.dataArray
        var newData = dataArr.concat(res.data.data.data);
        // console.log(newData)
        that.setData({
          dataArray: newData,
          lastid: res.data.data.data[len - 1].id
        })
      }
    })
  },
  getUserInfo: function(e) {},

  onPostTap: function(e) {
    var hhArr = this.data.dataArray;
    var item_id = e.currentTarget.dataset.dzid;
    var item_indexx = e.currentTarget.dataset.indexx;

    var cookie_mid = wx.getStorageSync('zan') || []; //获取全部点赞的mid       
    if (hhArr[item_indexx]) {
      var hasChange = hhArr[item_indexx].hasChange;
      if (hasChange !== undefined) {
        var onum = hhArr[item_indexx].user_praise;
        if (!hasChange) {
          hhArr[item_indexx].user_praise = (onum - 1);
          hhArr[item_indexx].hasChange = true;
        } else {
          hhArr[item_indexx].user_praise = (onum + 1);
          hhArr[item_indexx].hasChange = false;
        }
        for (var i = 0; i < hhArr.length; i++) {
          if (hhArr[i].id == item_id) { //遍历找到对应的id
            if (cookie_mid.includes(item_id)) { //说明已经点过赞,取消赞   
              for (var j = 0; j < cookie_mid.length; j++) {
                console.log(cookie_mid[j])
                if (cookie_mid[j] == item_id) {
                  cookie_mid.splice(j, 1); //删除取消赞的mid 
                }
              }
              // console.log(cookie_mid)
              wx.setStorageSync('zan', cookie_mid);
            } else {
              cookie_mid.unshift(item_id); //新增赞的mid
              wx.setStorageSync('zan', cookie_mid);
            }
          }
        }
        this.setData({
          dataArray: hhArr
        })
      }
    }
  },
  /**
   * 详情
   */
  onXq: function(e) {
    var id = e.currentTarget.dataset.id;
    console.log("HH")
    console.log(id)
    wx.navigateTo({
      url: "/pages/home/details/details?id=" + id
    })
  },

  /**首页 */
  onHome: function() {
    wx.navigateTo({
      url: "/pages/home/home"
    })
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