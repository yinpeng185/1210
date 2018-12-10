// pages/eehome/eehome.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标
      title: '同城', //导航栏 中间的标题
    },

    // 此页面 页面内容距最顶部的距离
    height: app.globalData.navHeight,
    childCid: 0, //选项卡默认选中
    dataArray: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      navH: app.globalData.navHeight,
      city: options.name,
    })
    that.setData({
      city: options.namec,
    })
    console.log(options.namec)

    var cityyy = this.data.nvabarData
    var city = cityyy.title
    console.log("YYYYY")
    console.log(city)
    console.log(cityyy)
    city.concat(options.namec)
    wx.request({
      url: app.globalData.url + '/Home/getClassInfo',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var data = res.data;
        that.setData({
          category: data
        })
      }
    })
    this.loadData(0)
  },
  lower: function (e) {
    var id = e.currentTarget.dataset['lastid']
    this.loadData(id)
  },


  // 选项卡
  onTab: function (e) {
    var caid = e.currentTarget.dataset.xzid
    this.data.dataArray = [];
    console.log(caid);
    this.setData({
      childCid: caid
    })

    this.loadData(0);

  },
  loadData: function (lastid) {
    var cat = this.data.childCid;
    var limit = 6
    var that = this
    wx.request({
      url: app.globalData.url + '/Home/getPageContentInfoxxggg',
      data: {
        lastid: lastid,
        limit: limit,
        cat: cat
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
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
  getUserInfo: function (e) { },

  onPostTap: function (e) {
    var hhArr = this.data.dataArray;
    var item_id = e.currentTarget.dataset.dzid;
    var item_indexx = e.currentTarget.dataset.indexx;
    console.log(item_id)
    var cookie_mid = wx.getStorageSync('zan') || []; //获取全部点赞的mid       
    if (hhArr[item_indexx]) {
      var hasChange = hhArr[item_indexx].hasChange;
      if (hasChange !== undefined) {
        var onum = hhArr[item_indexx].user_praise;
        if (!hasChange) {
          hhArr[item_indexx].user_praise = (onum - 1);
          hhArr[item_indexx].hasChange = true;
          wx.request({
            url: app.globalData.url + '/Look/dianZan',
            data: {
              user_id: app.globalData.userInfo.id,
              user_praise: hhArr[item_indexx].user_praise,
              comment_id: item_id
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              console.log(res.data);

            }
          })
        } else {
          hhArr[item_indexx].user_praise = (onum + 1);
          hhArr[item_indexx].hasChange = false;
          // console.log(hhArr[item_indexx].user_praise)

          wx.request({
            url: app.globalData.url + '/Look/dianZan',
            data: {
              user_id: app.globalData.userInfo.id,
              user_praise: hhArr[item_indexx].user_praise,
              comment_id: item_id

            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              console.log(res.data);

            }
          })



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
  onXq: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log("HH")
    console.log(id)
    wx.navigateTo({
      url: "/pages/index/details/index?id=" + id
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  // 城市
  city: function () {
    wx.navigateTo({
      url: '../switchcity/switchcity',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})