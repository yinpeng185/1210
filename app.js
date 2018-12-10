App({
  onLaunch: function(options) {

    // 判断是否由分享进入小程序
    if (options.scene == 1007 || options.scene == 1008) {
      this.globalData.share = true
    } else {
      this.globalData.share = false
    };

    wx.getSystemInfo({
      success: (res) => {
        this.globalData.height = res.statusBarHeight
        this.globalData.navHeight = res.statusBarHeight + 46;
      }
    })

    wx.login({
      success: res => {
        this.code = res.code;
        var that = this;
        wx.request({
          url: that.globalData.url + '/User/getUses',
          data: {
            code: that.code,
          },
          header: {
            'Content-Type': 'application/json'
          },
          success: function(res) {
            console.log('首页用户信息加载。。')

            console.log(res)
            if (res.data.length === 2) {
              console.log(res.data[0])
              console.log(res.data[0].avatarUrl)
              that.globalData.userInfo = res.data[0];
              that.globalData.userInfo.img = res.data[0].avatarUrl
              wx.setStorageSync('openid', res.data[1].openid);
              wx.setStorageSync('session_key', res.data[1].session_key);
            } else {
              wx.setStorageSync('openid', res.data.apiData.openid);
              wx.setStorageSync('session_key', res.data.apiData.session_key);
            }

          }
        })
      }
    })
    // wx.checkSession可以校验 session_key 是否有效，从而避免小程序反复执行登录流程。
    wx.checkSession({
      success: res => {
        this.errmsg = res.errMsg;
      },
      fail: function(res) {}

    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        // console.log(res.authSetting)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              // this.globalData.userInfo = res.userInfo

              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  globalData: {
    share: false, // 分享默认为false
    height: 0,
    userInfo: 'null',
    // url: "https://www.daotuba.cn/api/",
    // url: "http://47.110.69.213/api/",
    // url: "http://192.168.100.142/hutp5/api/",
    url:"https://api.shaiyixia.top/api/",
  }
})





















