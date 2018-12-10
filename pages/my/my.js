//index.js
//获取应用实例
const app = getApp()

function GetLength(str) {
  return str.replace(/[\u0391-\uFFE5]/g, "aa").length;
};

function GetChinaNum(str) {
  var re = /[\u4e00-\u9fa5 ~a-zA-Z0-9]/g; //测试中文字符的正则
  var res = str.match(re);
  if (res !== null) {
    return res.length
  } else {
    return 0
  }
};

function getGbkNum(author) {
  var reg = /[\u4e00-\u9fa5 a-zA-Z0-9]/g;
  var result = author.match(reg);
  var count = !result ? 0 : result.length;
  return count;
}


Page({
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标
      title: '我的', //导航栏 中间的标题
    },
    height: app.globalData.navHeight,  // 此页面 页面内容距最顶部的距离
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    shaishai: [],
    shoucang: [],
    hh: 0,
    imgfd: [],
    img: '',

    name: '',
    urlimg: '',
    c_w: 0,
    c_h: 0,
    phone_width: "",
    phone_height: "",
    look: false,
    zjid: app.globalData.userInfo.id,
    ononlo: "正在生成..."
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    if (app.globalData.userInfo) {
      var imgfd = app.globalData.userInfo.img
    }
    var that = this,
      userInfo = this.data.userInfo,
      shaishai = this.data.shaishai;
    var shoucang = this.data.shoucang;

    wx: wx.request({
      url: app.globalData.url + 'User/getUseris',
      data: {
        openid: wx.getStorageSync('openid')
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log('新数据')
        console.log(res.data);
        console.log("HHHH")
        that.setData({
          userInfo: res.data,
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    });

    if (app.globalData.userInfo === null) {
      that.onGotUserInfo()
    } else {
      console.log('查看加载。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。')
      that.setData({
        userInfo: app.globalData.userInfo,
      })
      that.userinfo()
    }
    console.log(that.data)
    console.log("-----------", that.data.userInfo.nickName)

    // var urlimg = that.data.imgfd[0];
    // var name = that.data.userInfo.nickName;
    // //获取手机信息
    // var phone = wx.getSystemInfoSync();
    // //将手机的尺寸信息
    // var phone_width = phone.windowWidth;
    // var phone_height = phone.windowHeight;
    // // console.log(urlimg,name,phone,phone_width,phone_height)
    // this.setData({
    //   urlimg: urlimg,
    //   name: name,
    //   phone_width: phone_width,
    //   phone_height: phone_height,
    //   height: app.globalData.navHeight,
    // })
    // that.getImg()
    // that.eron()

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

  // eron: function () {
  //   wx.request({
  //     url: app.globalData.url + "Codesend/getWXACodeUnlimit",//域名省略
  //     data: {
  //       page: "pages/index/index/",
  //       scene: "1234&123",
  //     },
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded'
  //     },
  //     method: 'GET',
  //     dataType: 'json',
  //     success: function (res) {
  //       console.log(res)
  //     },
  //     fail: function () { },

  //   })
  // },

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
        ctx.fillRect(w / 2.4, 25, w / 5, w / 5)
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
        ctx.fillText(that.data.name, w / 2+10, 115);             //名字位置

        ctx.setFontSize(w / 27);
        ctx.setFillStyle("gray");
        ctx.setTextAlign('center')
        ctx.fillText('我们的故事，从你关注我的那刹那开始！', w / 2, 145);

        that.setData({ c_h: g_h });

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

        that.setData({ c_h: g_h + 105 });
        ctx.save();
        ctx.draw();
      }
    })
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
  userinfo: function () {
    var that = this;
    wx: wx.request({
      url: app.globalData.url + 'Look/looking',
      data: {
        user_id: app.globalData.userInfo.id
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log('查看晒晒加载')
        console.log(res);
        console.log(res.data.data)

        that.setData({
          shaishai: res.data.data,
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    });
    wx.request({
      url: app.globalData.url + 'Look/shouCangInfo',
      method: 'GET',
      data: {
        user_id: app.globalData.userInfo.id
      },
      header: {
        'Content-Type': 'application/json'
      },
      success(data) {
        console.log(data.data.data);
        console.log('加载收藏信息成功');
        that.setData({
          shoucang: data.data.data
        });
      }
    })
    wx.request({
      url: app.globalData.url + 'LooK/pingtaiSetting',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log('查看2')
        console.log(res.data.data);
        that.setData({
          setting: res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    that.setData({
      zjid: app.globalData.userInfo.id
    })


    if (app.globalData.userInfo != null) {
      that.setData({
        userInfo: app.globalData.userInfo,
      })
      wx: wx.request({
        url: app.globalData.url + 'Look/looking',
        data: {
          user_id: app.globalData.userInfo.id
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log('查看晒晒加载')
          console.log(res.data.data)
          console.log('查看晒晒加载')
          that.setData({
            shaishai: res.data.data,
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      });
      wx.request({
        url: app.globalData.url + 'Look/shouCangInfo',
        method: 'GET',
        data: {
          user_id: app.globalData.userInfo.id
        },
        header: {
          'Content-Type': 'application/json'
        },
        success(data) {
          console.log('加载收藏信息成功');
          console.log(data.data.data);
          console.log('加载收藏信息成功');
          that.setData({
            shoucang: data.data.data
          });
        }
      })
      wx.request({
        url: app.globalData.url + 'LooK/pingtaiSetting',
        data: {},
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log('查看2')
          console.log(res.data.data);
          that.setData({
            setting: res.data.data
          })
        }
      })
    }

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onReady()
    var that = this;
    if (app.globalData.userInfo != null) {
      wx.request({
        url: app.globalData.url + '/Look/getInfo',
        data: {
          user_id: app.globalData.userInfo.id
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {

          console.log('olshow加载')
          console.log(res.data)
          app.globalData.userInfo = res.data[0]
          that.onLoad();
        }
      })
    }
    console.log("图片放大效果")
    console.log(app.globalData.userInfo.img)
    console.log("图片放大效果")
    this.data.imgfd.push(app.globalData.userInfo.img)
    console.log(this.data.imgfd)
  },

  navbarTap: function (e) {

    this.setData({
      hh: e.currentTarget.dataset.index
    })

  },
  fffdd: function (e) {

    this.setData({
      look: false
    })

  },

  godetailInfo1: function (e) {
    console.log('点击1')
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: "/pages/index/details/index?id=" + e.currentTarget.id + "&huuID=" + 111
    })
  },
  godetailInfo2: function (e) {
    console.log('点击2')
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: "/pages/index/details/index?id=" + e.currentTarget.id
    })
  },
  // 关注
  gzfans: function () {
    wx.navigateTo({
      url: '/pages/my/setup/homefans/fans?gzid=' + 22,
    })
  },

  // 粉丝
  fsfans: function () {
    wx.navigateTo({
      url: '/pages/my/setup/homefans/fans',
    })
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

  // /生成海报
  share: function () {
    var that = this
    setTimeout(function () {
      that.setData({
        ononlo: "保存图片",
      });
      console.log("消失")
    }, 2000);
    // wx.navigateTo({
    //   url: './share/index?id=' + this.data.userInfo.id + '&urlimg=' + this.data.userInfo.avatarUrl + '&name=' + this.data.userInfo.nickName
    // })

    var urlimg = that.data.userInfo.avatarUrl;
    var name = that.data.userInfo.nickName;
    //获取手机信息
    var phone = wx.getSystemInfoSync();
    //将手机的尺寸信息
    var phone_width = phone.windowWidth;
    var phone_height = phone.windowHeight;
    // console.log(urlimg,name,phone,phone_width,phone_height)
    that.setData({
      urlimg: urlimg,
      name: name,
      phone_width: phone_width,
      phone_height: phone_height,
      height: app.globalData.navHeight,
    })
    that.getImg()
    that.setData({
      look: true,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  goDetail: function (e) {
    console.log('点击')
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: "/pages/index/details/index?id=" + e.currentTarget.id
    })
  },
  gxqmTop: function () {
    // console.log("hh")
    wx.navigateTo({
      url: './setup/information/autograph/autograph',
    })
  },

  bjTop: function () {
    wx.navigateTo({
      url: './setup/setup',
    })
  },
  chNameTop: function () {
    wx.navigateTo({
      url: './setup/information/nickname/nickname',
    })
  },
  qqboTop: function () {
    console.log("HH")
    wx.navigateTo({
      url: './wallet/wallet',
    })
  },
  onGotUserInfo: function (e) {
    console.log(e)
    console.log(app.code)
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
        // errmsg: app.errmsg,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        //rawData: e.detail.rawData,
        //signature: e.detail.signature,
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log('点击用户信息....')
        app.globalData.userInfo = res.data
        wx.setStorageSync('user_info', res.data);
        console.log(res.data)
        that.setData({
          userInfo: wx.getStorageSync('user_info'),

        })
        that.onLoad()
      }
    })
  },


  previewImage: function (e) {
    var current = e.currentTarget.dataset.src
    console.log(this.data.imgfd)
    wx.previewImage({
      current: current,
      urls: this.data.imgfd,
    })
  },
  //  删除晒晒
  myshsh: function (e) {
    var id = e.currentTarget.dataset.id
    var that = this
    wx.showModal({
      content: '是否确定删除',
      success(res) {
        console.log("我的晒晒删除", res)
        if (res.confirm) {
          wx.request({
            url: app.globalData.url + 'Upload/deleteComment',
            data: {
              comment_id: id,
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              console.log("删除成功", res)
              that.onReady()
            }
          })
        } else if (res.cancel) {
        }
      }
    })
  },

  //  删除收藏
  myshch: function (e) {
    var id = e.currentTarget.dataset.id
    var shu = e.currentTarget.dataset.zs
    console.log("点击", id, shu)
    var that = this
    wx.showModal({
      content: '是否确定删除',
      success(res) {
        console.log("我的收藏删除", res)
        if (res.confirm) {
          wx.request({
            url: app.globalData.url + 'Look/bintTap',
            data: {
              user_id: app.globalData.userInfo.id,
              sc_count: shu,
              comment_id: id
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              console.log("删除我的收藏成功", res)
              that.onReady()
            }
          })
        } else if (res.cancel) {
        }
      }
    })
  }

})








    // goHome: function () {
    //   let url = '/pages/my/my';
    //   wx.switchTab({
    //     url: url,
    //   })
    // }
