function GetLength(str) {
  return str.replace(/[\u0391-\uFFE5]/g, "aa").length;
};
// pages/follow/follow.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标
      title: '关注', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.navHeight,
    kg: false,
    dishi: true,
    showView: false,
    navH: app.globalData.navHeight,
    iddd: '',
    hname: '',
    dec: '',
    img: '',
    rimg: "",
    showpass: false,
    isShowAllContent: false,
    aaa: true,
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.navHeight,
    showModalStatus: false,
    name: '',
    urlimg: '',
    show: '',
    c_w: 0,
    c_h: 0,
    phone_width: "",
    phone_height: "",
    look: false,
    ononlo:"正在生成..."

  },


  goto_detail: function(e) {
    let article = e.currentTarget.dataset.id;
    let shu = e.currentTarget.dataset.shu;
    let userhid = e.currentTarget.dataset.userhid;
    if (shu > 0) {
      wx.navigateTo({
        url: '/pages/comment/comment?id=' + article + '&shu=' + shu + '&userhid=' + userhid,
      });
    } else {
      this.setData({
        pl: true
      })
    }

  },

  get_profit: function(e) { //  点击地址获取收益
    let comment_id = e.currentTarget.dataset.id;
    let longitude = e.currentTarget.dataset.longitude;
    let latitude = e.currentTarget.dataset.latitude;
    let name = e.currentTarget.dataset.name;
    let address = e.currentTarget.dataset.address;
    let img = e.currentTarget.dataset.img;

    wx.request({
      url: app.globalData.url + 'Profit/userProfit',
      method: 'GET',
      data: {
        user_id: app.globalData.userInfo.id,
        comment_id: comment_id
      },
      header: {
        'Content-Type': 'application/json'
      },
      success(data) {
        // console.log(data)

      }
    });

    wx.openLocation({
      longitude: Number(longitude),
      latitude: Number(latitude),
      name: name,
      address: address
    })

    wx.request({
      url: app.globalData.url + 'Search/address',
      method: 'GET',
      data: {
        user_id: app.globalData.userInfo.id,
        address: address,
        addressname: name,
        xpoint: latitude,
        ypoint: longitude,
        image: img,
      },
      header: {
        'Content-Type': 'application/json'
      },
      success(data) {
        console.log(data)
        // console.log("关注图片", data)
        // console.log(name)
        // console.log(address)

      }
    });



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    showView: (options.showView == "true" ? true : false)
    this.setData({
      navH: app.globalData.navHeight,
      show_fenxiang: false,

    })

    if (app.globalData.userInfo) {
      this.setData({   
        avatarUrl: app.globalData.userInfo.avatarUrl,
      })
    }
    this.get_list_info();
  },
  // id=' + this.data.iddd + '&
  // urlimg=' + this.data.img[0] + '&
  // r_image=' + this.data.rimg + '&
  // name=' + this.data.dec
  help: function () {
    // console.log(this.data.iddd)
    // console.log(this.data.img[0])
    // console.log(this.data.rimg)
    // console.log(this.data.dec)

    this.setData({
      urlimg: this.data.img,
      // name: this.data.details.home_uaer_name,
      show: this.data.dec
    })
    // console.log(this.data.urlimg)
    // console.log(this.data.name)
    // console.log(this.data.show)

    //canvas
    var urlimg = this.data.urlimg[0];
    // var name = this.data.name;
    var show = this.data.show
    // console.log(urlimg)
    // console.log(name)
    // console.log(show)
    //获取手机信息
    var phone = wx.getSystemInfoSync();
    //将手机的尺寸信息
    var phone_width = phone.windowWidth;
    var phone_height = phone.windowHeight;
    // console.log(urlimg,name,phone,phone_width,phone_height)
    this.setData({
      urlimg: urlimg,
      // name: name,
      phone_width: phone_width,
      phone_height: phone_height,
      height: app.globalData.navHeight,
    })
    this.getImg()
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
    // console.log('urlimgu', urlimg)
    wx.downloadFile({
      url: urlimg,
      success: function (res) {
        // console.log("图片下载了")
        // console.log(res)
        that.setData({
          urlimg: res.tempFilePath
        })
        that.canvasposter();
      },
    })
  },

  // 画图
  canvasposter: function () {
    var that = this;
    // console.log("图片" + that.data.urlimg);

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
        ctx.setFillStyle('white')                           //白布
        ctx.fillRect(w / 2 - 35, 300, 200, 200)
        ctx.drawImage(that.data.urlimg, 25, 20, w / 9 * 8, h / 12 * 9);
        let doc_str = that.data.show
        let str_length = GetLength(doc_str);
        if (str_length > 30) {
          let txt1 = doc_str.substring(0, 15);
          let txt2 = doc_str.substring(15, 30) + '...';
          ctx.setFontSize(w / 22);
          ctx.setFillStyle("#333333");
          ctx.setTextAlign('left')
          ctx.fillText(txt1, 20, h / 12 * 10.3);
          ctx.fillText(txt2, 20, h / 12 * 10.8);
        } else {
          ctx.setFontSize(w / 22);
          ctx.setFillStyle("#333333");
          ctx.setTextAlign('left')
          ctx.fillText(that.data.show, 20, h / 12 * 10.3);
        }
        ctx.setFontSize(w / 27);
        ctx.setFillStyle("#333333");
        ctx.setTextAlign('left')
        ctx.fillText("一个可以赚钱的分享社区", 20, h / 12 * 11.5);            //晒晒说明
        ctx.drawImage('/img/hhyy.png', w / 10 * 9 - 45, h / 11 * 9 + 10, 60, 60);
        ctx.setFontSize(w / 30);
        ctx.setFillStyle("#666666");
        ctx.setTextAlign('right')
        ctx.fillText("扫码查看", w / 9 * 8.4, h / 12 * 11.5);      
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
    }, 1000);
    console.log("canvas")
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



  get_list_info: function() {
    var that = this;
    console.log(app.globalData);
    wx.request({
      url: app.globalData.url + 'Home/userGuanzhu',
      method: 'GET',
      data: {
        user_id: app.globalData.userInfo.id
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log('关注信息',res.data);
        // let sub_data = res.data;
        // for (let i = 0; i < sub_data.length; ++i) {
        //   if (sub_data[i].description.length > 80) {
        //     sub_data[i].description = sub_data[i].description.substr(0, 80) + '...';
        //   }
        // }
        that.setData({
          guanzhuInfo: res.data,
        })
      },
      fail: function(data) {
        console.log(data);
        wx.stopPullDownRefresh();
      }
    })
  },
  // 展开按钮
  showAllAction: function(e) {
    var id = e.currentTarget.dataset.id,
      guanzhuInfo = this.data.guanzhuInfo;
    console.log("ID", id, "guanzhuInfo", guanzhuInfo)

    for (var i = 0, len = guanzhuInfo.length; i < len; ++i) {
      if (guanzhuInfo[i].id === id) {
        guanzhuInfo[i].open = !guanzhuInfo[i].open
        // console.log("guanzhuInfo[i].open11111111111", guanzhuInfo[i].open)
        // guanzhuInfo[i].description = guanzhuInfo[i].description.substr(0, 80) + '...'
      } else {
        guanzhuInfo[i].open = false
        // console.log("guanzhuInfo[i].open2222222222", guanzhuInfo[i].open)
        // guanzhuInfo[i].description = guanzhuInfo[i].description
      }
    }
    this.setData({
      guanzhuInfo: guanzhuInfo
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  showfxqx: function() {

    this.setData({
      show_fenxiang: false
    })
  },

  showfx: function(e) {
    console.log(e)
    // console.log(e.currentTarget.dataset.idd);
    this.setData({
      show_fenxiang: true,
      iddd: e.currentTarget.dataset.idd,
      hname: e.currentTarget.dataset.hname,
      dec: e.currentTarget.dataset.dec,
      img: e.currentTarget.dataset.img,
      rimg: e.currentTarget.dataset.rimg,
    })
  },
  // /生成海报
  // share: function() {
  //   wx.navigateTo({
  //     url: '/pages/index/details/share/index?id=' + this.data.iddd + '&urlimg=' + this.data.img[0] + '&r_image=' + this.data.rimg + '&name=' + this.data.dec
  //   })
  // },
  share: function () {
    var that = this
    that.help()
    setTimeout(function () {
      that.setData({
        ononlo: "保存图片",
      });
      console.log("消失")
    }, 1500);
    // console.log(this.data.details.image[0])
    // wx.navigateTo({
    //   url: './share/index?id=' + this.data.buxianshi + '&urlimg=' + this.data.details.image[0] + '&r_image=' + this.data.details.r_image + '&name=' + this.data.details.description
    // })
    that.setData({
      look: true,
      show_fenxiang: false
      });
      
    },
 
  fffdd: function (e) {

    this.setData({
      look: false
    })
  },

  // 海报返回


  // /生成 长图
  chshare: function() {
    wx.navigateTo({
      url: '/pages/index/details/chshare/index?id=' + this.data.iddd + '&urlimg=' + this.data.img + '&r_image=' + this.data.rimg + '&name=' + this.data.hname
    })
    this.setData({
      show_fenxiang: false,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  // 点赞、评论、收藏开关
  onKgtop: function() {

    this.setData({
      kg: 1
    })

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
  /**取消ann */
  onQx: function() {
    console.log("onqx");
    this.setData({
      dishi: false,
    })
  },
  /**我知道按钮 */
  onWo: function() {
    console.log("onwo");
    this.setData({
      dishi: false,
    })
  },
  /**点赞和评论和收藏的开关 */

  onChangeShowState: function() {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.get_list_info();
  },


  onPostTap: function(e) {
    console.log(e)
    var that = this;
    var hhArr = this.data.guanzhuInfo;
    var item_id = e.currentTarget.dataset.dzid;
    var item_indexx = e.currentTarget.dataset.indexx;
    // console.log(item_id)
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
            success: function(res) {
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
            success: function(res) {
              console.log(res.data);

            }
          })



        }
        for (var i = 0; i < hhArr.length; i++) {
          if (hhArr[i].id == item_id) { //遍历找到对应的id
            if (cookie_mid.includes(item_id)) { //说明已经点过赞,取消赞   
              for (var j = 0; j < cookie_mid.length; j++) {
                // console.log(cookie_mid[j])
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
          guanzhuInfo: hhArr
        })
      }
    }
  },
  onPostTapc: function(e) {
    console.log(e)
    var that = this;
    var hhArr = this.data.guanzhuInfo;
    var item_id = e.currentTarget.dataset.dzid;
    var item_indexx = e.currentTarget.dataset.indexx;
    // console.log(item_id)
    var cookie_mid = wx.getStorageSync('zan') || []; //获取全部点赞的mid       
    if (hhArr[item_indexx]) {
      var hasChangesc = hhArr[item_indexx].hasChangesc;
      if (hasChangesc !== undefined) {
        var onum = hhArr[item_indexx].user_collection;
        if (!hasChangesc) {
          hhArr[item_indexx].user_collection = (onum - 1);
          hhArr[item_indexx].hasChangesc = true;
          wx.request({
            url: app.globalData.url + '/Look/dianZan',
            data: {
              user_id: app.globalData.userInfo.id,
              user_collection: hhArr[item_indexx].user_collection,
              comment_id: item_id
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function(res) {
              console.log(res.data);

            }
          })
        } else {


          hhArr[item_indexx].user_collection = (onum + 1);
          hhArr[item_indexx].hasChangesc = false;
          // console.log(hhArr[item_indexx].user_praise)

          wx.request({
            url: app.globalData.url + '/Look/dianZan',
            data: {
              user_id: app.globalData.userInfo.id,
              user_collection: hhArr[item_indexx].user_collection,
              comment_id: item_id

            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function(res) {
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
          guanzhuInfo: hhArr
        })
      }
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(options) {
    if (options.from === 'button') {
      // 来自页面内转发按钮
      console.log(options.target)
    }
    return {
      desc: this.data.dec,
      path: 'pages/index/details/index?id=' + this.data.iddd,
      success: function(res) {
        //这是我自定义的函数，可替换自己的操作
        util.showToast(1, '发送成功');
      },
      //## 转发操作失败/取消 后的回调处理，一般是个提示语句即可
      fail: function() {
        util.showToast(0, '朋友代付转发失败...');
      }
    }
  },

  previewImage: function(e) {
    console.log(e)
    console.log("图片放大")
    var faimg = e.currentTarget.dataset.faimg
    var index = e.currentTarget.dataset.index
    var src = e.currentTarget.dataset.src
    console.log(src)
    console.log(index)
    console.log(faimg)
    var src = faimg[index]
    wx.previewImage({
      current: src,
      urls: faimg,
    })
  },
  goto_home: function(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/my/setup/homepage/homepage?id=' + id,
    });
  },

  /**
   * 显示评论框
   */
  onShowCommentTap: function(e) {
    console.log(e)
    // return
    console.log("看看", e.currentTarget.dataset.shu)
    var shu = e.currentTarget.dataset.shu
    if (shu == 0) {
      console.log("<0")
      this.setData({
        showpass: !this.data.showpass,
      });
      this.send_form(e)
    }
    if (!shu == 0) {
      console.log(">0")
      this.comment(e)
    }
  },

  //  评论
  comment(e) {
    var id = e.currentTarget.dataset.id
    var shu = e.currentTarget.dataset.shu
    var user_id = e.currentTarget.dataset.userhid
    console.log("评论")
    console.log(user_id)
    wx.navigateTo({
      url: "/pages/comment/comment?id=" + id + '&shu=' + shu + '&userhid=' + user_id,
    })
  },

  //                                                         解开注释
  // 评论提交
  send_form: function(e) {


    wx.request({ // 保存评论到数据库
      url: app.globalData.url + 'Comment/commentsSave',
      data: {
        user_id: app.globalData.userInfo.id,
        comment_id: id,
        reply_msg: username,
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        if (res.data.msg == 'Success') {
          wx.showToast({
            title: '评论成功',
            icon: 'success',
            duration: 2000
          });
          that.setData({
            reply_content: ''
          });
        } else {
          wx.showModal({
            title: '评论失败',
            content: '请稍后重试',
          });
        }
      }
    });

    // this.request()

  },
  // 评论提交结束
  //封装函数
  request() {

    var that = this;
    if (app.globalData.userInfo) {
      that.setData({
        navH: app.globalData.navHeight,
        userId: app.globalData.userInfo.id,
        // shu: that.data.options.shu,
        avatarUrl: app.globalData.userInfo.avatarUrl,
        // userhid: that.data.options.userhid
      })
    }
    // console.log(app.globalData.userInfo.id)
    // console.log(that.data.options.userhid)
    // console.log(that.data.options.id);
    // var id = that.data.options.id
    // console.log(id)
    wx.request({
      url: app.globalData.url + 'Search/commentList',
      data: {
        // article_id: id
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        // console.log("活动")
        // console.log(res.data)
        that.setData({
          // arr: res.data,
          numb: res.data.length
        })
        // console.log(that.data.arr)
      }
    });

    // if (that.data.options.comment_id) {
    //   console.log("回复名称", that.data.name)
    //   this.setData({
    //     hyt: that.data.options.comment_id,
    //     usid: that.data.options.user_id,
    //     show: true,
    //     msg_tips: that.data.name
    //   });

    // }
  }
})