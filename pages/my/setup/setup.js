// pages/my/setup/setup.js
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
    showModalStatus: false,
    name: '',
    urlimg: '',
    c_w: 0,
    c_h: 0,
    phone_width: "",
    phone_height: "",
    look: false,
    ononlo: "正在生成..."
  },
  powerDrawer: function(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function(currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200, //动画时长
      timingFunction: "linear", //线性
      delay: 0 //0则不延迟
    });
    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;
    // 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停
    animation.translateY(240).step();
    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })
    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function() {
      // 执行第二组动画：Y轴不偏移，停
      animation.translateY(0).step()
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })
      //关闭抽屉
      if (currentStatu == "close") {
        this.setData({
          showModalStatus: false
        });
      }
    }.bind(this), 200)
    // 显示抽屉
    if (currentStatu == "open") {
      this.setData({
        showModalStatus: true
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
 console.log(options)
    var that = this;
    that.setData({
      navH: app.globalData.navHeight,
      userInfo: app.globalData.userInfo,
    })
    var urlimg = that.data.userInfo.avatarUrl;
    var name = that.data.userInfo.nickName;
    //获取手机信息
    var phone = wx.getSystemInfoSync();
    //将手机的尺寸信息
    var phone_width = phone.windowWidth;
    var phone_height = phone.windowHeight;
    // console.log(urlimg,name,phone,phone_width,phone_height)
    this.setData({
      urlimg: urlimg,
      name: name,
      phone_width: phone_width,
      phone_height: phone_height,
      height: app.globalData.navHeight,
    })
    that.getImg()
    that.eron()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  look: function () {
    this.setData({
      look: !this.data.look
    })
  },
  //下载图片方法
  getImg: function () {
    var that = this
    var urlimg = that.data.urlimg;
    wx.downloadFile({
      url: urlimg,
      success: function (res) {
        console.log("图片下载了")
        console.log(res)
        that.setData({
          urlimg: res.tempFilePath
        })
        that.canvasposter();
      },
    })
  },

  eron: function () {
    wx.request({
      url: app.globalData.url + "Codesend/getWXACodeUnlimit",//域名省略
      data: {
        page: "pages/index/index/",
        scene: "1234&123",
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res)
      },
      fail: function () { },

    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  // 画图
  canvasposter: function () {
    var that = this;
    console.log("图片" + that.data.urlimg);

    // 手机宽度
    var phoneWidth = that.data.phone_width;
    // 手机高度
    var phoneHeight = that.data.phone_height;
    //按照手机的宽和高生成图片的宽和高
    console.log(phoneWidth)
    console.log(phoneHeight)
    that.setData({
      c_w: phoneWidth,
      c_h: phoneHeight
    });

    //以手机的宽度为基准,设置比例尺 mpx 为0.8533333333333334
    let mpx = phoneWidth / 375;
    //当前的海报高度
    var nowH = 0;
    var ctx = wx.createCanvasContext('myCanvas');
    wx.getImageInfo({
      src: that.data.urlimg,
      success: function (res) {
        var width = res.width;
        var height = res.height;
        var w = that.data.phone_width;
        var h = that.data.phone_height;
        var g_w = (phoneWidth / width) * width - 50;
        var g_h = (phoneWidth / width) * height - 50;
        // console.log("tup" + width + height);
        console.log(w, h)
        ctx.drawImage('/img/backg.png', 0, 0, w, h);               //背景图

        ctx.save();                           
        ctx.beginPath();
        ctx.arc(w / 5 / 2 + w / 2.4, w / 5 / 2 + 25, w / 5 / 2, 0, Math.PI * 2, false);
        ctx.clip();
        ctx.setFillStyle('white')                           //头像白布
        ctx.fillRect(w / 2.4,25, w / 5, w / 5)
        ctx.restore();

        ctx.setFillStyle('white')                           //白布
        ctx.fillRect(w / 2 - 160, 50, 320, 390)

        ctx.save();
        //绘制头像
        ctx.beginPath(); //开始绘制
        //先画个圆，前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
        ctx.arc(w / 6.3 / 2 + w / 2.3, w / 6.3 / 2 + 35, w / 6.3 / 2, 0, Math.PI * 2, false);
        ctx.clip(); //画好了圆 剪切  原始画布中剪切任意形状和尺寸。
        ctx.drawImage(that.data.urlimg, w / 2.3, 35, w / 6.3, w / 6.3);
        ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图问下文即状态 还可以继续绘制

        ctx.setFontSize(w / 21);                                //用户名字字体大小
        ctx.setFillStyle("#333333");                        //名字颜色
        ctx.setTextAlign('center')
        ctx.fillText(that.data.name, w / 2, 115);             //名字位置

        ctx.setFontSize(w / 27);
        ctx.setFillStyle("gray");
        ctx.setTextAlign('center')
        ctx.fillText('我们的故事，从你关注我的刹那开始！', w / 2, 145);

        that.setData({c_h: g_h});

        ctx.drawImage('/img/hhyy.png', w / 2 - 110, 170, 220, 220);               //二维码

        ctx.setFontSize(w / 27);
        ctx.setFillStyle("#333333");
        ctx.setTextAlign('center')
        ctx.fillText("—  微信扫码查看我的个人主页  —", w / 2, 420);    //二维码说明

        ctx.drawImage('/img/logo.png', w / 5, 460, 30, 30);           //logo

        ctx.setFontSize(w / 21);
        ctx.setFillStyle("#333333");
        ctx.setTextAlign('center')
        ctx.fillText("一个可以赚钱的分享社区", w / 2 + 20, 485);            //晒晒说明
        
        that.setData({c_h: g_h + 105});
        ctx.save();
        ctx.draw();
      }
    })
    //要
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        fileType: 'jpg',
        success: function (res) {
          that.setData({
            imgurl: res.tempFilePath,
            cavhide: true,
            imghide: false,
            loadhide: false
          })
        }
      })
    }, 2000);
  },





  savePic: function () {
    let that = this;
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imgurl,
      success: function (res) {
        if (res.errMsg == 'saveImageToPhotosAlbum:ok') {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          })
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '请前往开启保存到相册权限!',
          success: function (res) {
            if (res.confirm) {
              wx.openSetting({
                success: function (res) {
                  console.log(res)
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }),
      this.setData({
        look: false
      })
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

  // 分享
  showfx: function() {
    this.setData({
      show_fenxiang: true
    })
  },

  showfxqx: function() {
    this.setData({
      show_fenxiang: false
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  gerxxTop: function() {
    wx.navigateTo({
      url: './information/information',
    })
  },

  dzTop: function() {
    wx.navigateTo({
      url: './mypraise/mypraise',
    })
  },
  privacyTop: function() {
    wx.navigateTo({
      url: './privacy/privacy',
    })
  },

  newsTop: function() {
    wx.navigateTo({
      url: './news/news',
    })
  },
  opinionTop: function() {
    wx.navigateTo({
      url: './opinion/opinion',
    })
  },
  aboutshaiTop: function() {
    wx.navigateTo({
      url: './aboutshai/aboutshai',
    })
  },

  shpTop: function() {
    wx.navigateTo({
      url: './shopcoo/shopcoo',
    })
  },

  homepageTop: function() {
    wx.navigateTo({
      url: './draft/draft',
    })
  },

  // /生成海报
  share: function () {
    var that = this
    setTimeout(function () {
      that.setData({
        ononlo: "保存图片",
      });
      console.log("消失")
    }, 1000);
    // wx.navigateTo({
    //   url: './share/index?id=' + this.data.userInfo.id + '&urlimg=' + this.data.userInfo.avatarUrl + '&name=' + this.data.userInfo.nickName
    // })
    that.setData({
      look: true,
    })
  },
  fffdd: function (e) {

    this.setData({
      look: false
    })

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
    console.log(this.data.userInfo.id)
    // if (options.from === 'button') {
    //   // 来自页面内转发按钮
    //   console.log(options.target)
    // }
    return {
      desc: '江湖救急，还请贵人伸手相助啊!',
      path: '/pages/my/setup/homepage/homepage?id='+ this.data.userInfo.id,

      success: function (res) {
        //这是我自定义的函数，可替换自己的操作
        util.showToast(1, '发送成功');
      },
      //## 转发操作失败/取消 后的回调处理，一般是个提示语句即可
      fail: function () {
        util.showToast(0, '朋友代付转发失败...');
      }
    }
  },

 
})