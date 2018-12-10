const app = getApp()
import util from '../../utils/hh';
Array.prototype.has = function (e) { // 判断数组是否存在某个值
  for (let i = 0; i < this.length; ++i) {
    if (this[i] == e) {
      return true;
    }
  }
  return false;
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标
      title: '首页', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.navHeight,
    childCid: 0, //选项卡默认选中
    dataArray: [],
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    zan: [],
    color: "#ff6f10",
    disabled: false,
    getCode: "获取验证码",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.page_data_init();
    this.getLocation()
    var hh = "aaaaaa的点击的解决发"
    console.log(hh.slice(0, -1))
    this.sendCode()
  },

  getLocation: function () {
    wx.getLocation({
      success: res => {
        util.getMapSdk().reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: res => {
            res = res.result;
            console.log(res.address_component.city.slice(0, -1))
            this.setData({
              address: res.address_component.city.slice(0, -1),
              latitude: res.location.lat,
              longitude: res.location.lng
            });
          }
        });
      },
    });
  },

  page_data_init: function () {
    var that = this;
    that.setData({
      navH: app.globalData.navHeight
    })
    // 'http://47.110.69.213/api/Home/getClassInfo',
    wx.request({
      url: app.globalData.url + '/Home/getClassInfo',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          category: res.data
        });
      }
    })
    //首次刷新数据
    this.loadData(0);
    let zan = wx.getStorageSync('zan');
    this.setData({
      zan: zan
    });
    wx.stopPullDownRefresh();

  },
  /** 
   * 滑动切换tab 
   */
  bindChange: function (e) {

    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },

  switch_data: function (e) {
    let tab_id = e.currentTarget.dataset.xzid;

  },

  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  lower: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset['lastid']
    this.loadData(id)
  },



  sendCode: function (e) {
    var that = this;
    var times = 0
    var i = setInterval(function () {
      times++
      if (times >= 5) {
        that.setData({
          disabled: false,
        })
        clearInterval(i)
      } else {
        that.setData({
          disabled: true
        })
      }
    }, 1000)
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
  // 下来刷新数据 每次刷新8条数据
  loadData: function (lastid) {
    var cat = this.data.childCid;
    console.log("UU&&")
    console.log(cat)

    var limit = 8
    var that = this

    wx.request({
      url: app.globalData.url + 'Home/getPageContentInfoxxggg',
      data: {
        lastid: lastid,
        limit: limit,
        cat: cat
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("首页数据")

        console.log(res)
        console.log(res.data.data)
        if (res.data.data.data.length == 0) {
          return false;
        }
        var len = res.data.data.data.length
        var dataArr = that.data.dataArray
        var newData = dataArr.concat(res.data.data.data);
        // var newData = res.data.data.data;
        let zan = that.data.zan;
        if (typeof zan !== 'object') {
          zan = []
        }
        for (let i = 0; i < newData.length; ++i) {
          if (zan.has(newData[i].id)) {
            newData[i].hasChange = false;
          } else {
            newData[i].hasChange = true;
          }
        }
        // console.log(newData)
        that.setData({
          dataArray: newData,
          lastid: res.data.data.data[len - 1].id
        })
      }
    })
  },
  getUserInfo: function (e) { },
  // /点赞
  onPostTap: function (e) {
    console.log("点赞")

    var that = this;
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

      url: "/pages/index/detail/index?id=" + id
    })
  },

  /**首页 */
  onHome: function (e) {
    var that = this
    if (e.currentTarget.dataset.address == '同城') {
      console.log("shouy", e.currentTarget.dataset.address)
      wx.showModal({
        content: '请授权地理位置',
        success(res) {
          if (res.confirm) {
            that.getUserLocation();

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

    } else {
      wx.navigateTo({
        url: "/pages/index/detailss/detailss?namec=" + this.data.address
      })
    }

  },

  getUserLocation: function () {
    var _this = this;
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.openSetting({
            success: function (res) {
              if (res.authSetting["scope.userLocation"] == true) {
                wx.showToast({
                  title: '授权成功',
                  icon: 'success',
                  duration: 1000
                })
                //再次授权，调用wx.getLocation的API
                _this.getLocation();
              } else {
                wx.showToast({
                  title: '授权失败',
                  icon: 'none',
                  duration: 1000
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //用户首次进入页面,调用wx.getLocation的API
          _this.getLocation();
        } else {
          _this.getLocation();
        }
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
    // this.setData({
    //   dataArray: []
    // })
    // this.loadData(0)
    this.getUserLocation();
  },
  // 个人主页
  goto_home: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/my/setup/homepage/homepage?id=' + id,
    });
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
      dataArray: []
    });
    this.page_data_init();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  onGotUserInfo: function (e) {
  
    var that = this,
      userInfo = this.data.userInfo;
    console.log(wx.getStorageSync('openid'))
    console.log(wx.getStorageSync('session_key'))
    wx.request({
      url: app.globalData.url + '/User/getUserInfo',
      data: {
        openid: wx.getStorageSync('openid'),
        session_key: wx.getStorageSync('session_key'),
        code: app.code,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log('点击用户信息....')
        app.globalData.userInfo = res.data
        wx.setStorageSync('user_info', res.data);
        wx.setStorageSync('userhhh', res.data);
        console.log(res.data)
        that.setData({
          userInfo: wx.getStorageSync('user_info'),
          userhhh: wx.getStorageSync('userhhh'),
        })
        that.onLoad()
      }
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    // if (options.from === 'button') {
    //   // 来自页面内转发按钮
    //   console.log(options.target)
    // }
    return {
      desc: '一个可以赚钱的分享社区, 啥出你的美好生活',
      path: 'pages/index/index',

      success: function (res) {
        //这是我自定义的函数，可替换自己的操作
        util.showToast(1, '发送成功');
      },
      //## 转发操作失败/取消 后的回调处理，一般是个提示语句即可
      fail: function () {
        util.showToast(0, '朋友代付转发失败...');
      }
    }
  }
})