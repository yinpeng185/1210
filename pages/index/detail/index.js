function GetLength(str) {
  return str.replace(/[\u0391-\uFFE5]/g, "aa").length;
};
// pages/home/details/details.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    plborder: true, //评论框是否显示
    lengthnum: '', //输入评论字数
    countpl: '', //评论个数
    counts: '', //评论个数-1
    current_index: 0,
    total_index: 0,
    userId: '',
    dataArray: [],
    reply_content: '',
    detail_id: '',
    tur: '',
    buxianshi: '',
    details: '',
    gz: false,
    loadhide: true,
    isShowAllContent: false,
    pla: true, //判断提示文本是否显示
    uuyy: '',
    options: '', //接收的options。id的值
     // 此页面 页面内容距最顶部的距离
    height: app.globalData.navHeight,
    showModalStatus: false,
    name: '',
    urlimg: '',
    show:'',
    c_w: 0,
    c_h: 0,
    phone_width: "",
    phone_height: "",
    look: false,
    ononlo: "正在生成..."
  },

  showAllAction: function () {
    this.setData({
      isShowAllContent: !this.data.isShowAllContent
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("onloadonloadonloadonloadonloadonloadonloadonloadonloadonloadonloadonloadonloadonloadonloadonloadonload")
    this.data.options = options;
    console.log("options",options)
    var that = this;
    console.log("详情页面")
    // console.log("接受发布页面所传的参数tur和id")
    // console.log(options.tur)
    if (options.huuID) {
      that.setData({
        huuID: options.huuID
      })
    }

    if (options.tur) {
      // console.log("发布")
      // console.log(options.tur)

      that.setData({
        tur: options.tur,
        huuID: options.tur,
        uuyy: options.tur,
      })
    }
    // console.log(app.globalData.userInfo.id)
    // console.log(options.id)
    // console.log(options.ht)
    wx.setStorageSync('wenzhang', options.id)
    that.setData({
      userId: app.globalData.userInfo.id,
      avatarUrl: app.globalData.userInfo.avatarUrl,
      detail_id: options.id,
      buxianshi: options.id,
    })
    wx.request({
      url: app.globalData.url + 'Home/getComment',
      data: {
        id: options.id,
        user_id: app.globalData.userInfo.id
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("请求数据")
        console.log('res.data', res.data)      
        that.setData({
          details: res.data,
          total_index: res.data.image.length,
        })
      }
    })
    this.requ()
    that.setData({
      navH: app.globalData.navHeight,
      // dataArray: that.data.dataArray1
    })

    this.loadData(0);

   

  },
  //请求后台数据  
  requ() {
    var that = this
    wx.request({
      url: app.globalData.url + 'Search/commentList',
      data: {
        article_id: this.data.options.id
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)

        that.data.arr = res.data
        that.setData({
          arr: that.data.arr,
          countpl: that.data.arr.length,
          plborder: that.data.plborder,
          counts: that.data.arr.length - 1,
          if(countpl = 0) {
            counts = countpl
          },
        })
        // console.log(that.data.countpl)
        that.posiation()
        // if (res.data.length = 0) {
        //   that.data.plborder = false
        //   console.log("改变了")
        // }
        // that.setData({
        //   plborder:that.data.plborder
        // })
        // console.log("asd",that.data.plborder)
      }
    })
  },
  posiation() {
    var that = this
    // console.log(that.data.counts,that.data.countpl)
    if (that.data.countpl < 1) {
      that.data.plborder = false
    }
    that.setData({
      plborder: that.data.plborder,
    })
    // console.log("判断评论框是否显示",that.data.plborder)
  }
  ,
  get_index: function (e) { // 获取当前滑块处于第几张, 显示轮播的数字指示
    let current_index = e.detail.current;
    this.setData({
      current_index: current_index
    });
  },

  share_open: function () { // 打开分享微信好友界面
    wx.showShareMenu({
      withShareTicket: true
    });
  },

  gzon: function (e) {
    var id = e.currentTarget.dataset.wid;
    let user_id = e.currentTarget.dataset.user_id;
    let that = this;
    let details = this.data.details;

    wx.request({
      url: app.globalData.url + 'Look/guanZhu',
      data: {
        form_user_id: app.globalData.userInfo.id,
        user_id: user_id
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        details.guanInfo = res.data.hasChange
        that.setData({
          details: details
        })

      }
    })


  },


  help: function (){
        this.setData({
          urlimg: this.data.details.image,
          name: this.data.details.home_uaer_name,
          show: this.data.details.description
        })
    console.log(this.data.urlimg)
    console.log(this.data.name)
    console.log(this.data.show)

    //canvas
    var urlimg = this.data.urlimg[0];
    var name = this.data.name;
    var show = this.data.show
    console.log(urlimg)
    console.log(name)
    console.log(show)
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
    this.getImg()
    },

  // 分享
  showfx: function () {
    // console.log("hh");
    this.setData({
      show_fenxiang: true,
      tur: 0
    })
  },
  // 个人主页
  goto_home: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/my/setup/homepage/homepage?id=' + id,
    });
  },

  // 发送评论
  send_form: function (e) { // 发送表单
    let formId = e.detail.formId;
    // console.log('formid' + formId);
    var that = this;
    var username = this.data.reply_content;
    var id = this.data.detail_id;
    // console.log(username)
    // console.log(id)

    // return
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
      success: function (res) {
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
    wx.request({ // 发送模板消息
      url: app.globalData.url + 'Modelreply/replySend',
      method: 'GET',
      data: {
        user_id: app.globalData.userInfo.id,
        reply_msg: username,
        form_id: formId,
        comment_id: id,
        page: '/pages/index/details/index?id=' + id
      },
      success: function (res) {
        // console.log(res);
      },
      fail: function (data) {
        // console.log(data);
      }
    })

    this.requ()
    this.bluron()
  },
  // 发送评论结束

  bluron() {
    setTimeout(() => {
      this.data.pla = true
      this.setData({
        reply_content: '',
        pla: this.data.pla
      })
    }, 100)
  },
  // focusone() {
  //     this.data.pla = !this.data.pla 
  //     this.setData({
  //       pla : this.data.pla
  //     })
  // }, 
  get_value: function (e) {
    // console.log(this.data.reply_content.length)
    // console.log(this.data.reply_content)
    if (this.data.lengthnum > -1) {
      this.data.pla = false
      this.setData({
        pla: this.data.pla
      })
    }

    this.setData({
      reply_content: e.detail.value,
      lengthnum: this.data.reply_content.length,
      pla: this.data.pla
    })
  },
  //分享到取消按钮
  showfxqx: function () {
    this.setData({
      show_fenxiang: false
    })
    console.log('分享取消返回主页');
    console.log(this.data.uuyy);

    if (this.data.uuyy) {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  },
  reportTop: function () {
    wx.navigateTo({
      url: './report/report',
    })
  },
  //  评论
  comment: function (e) {
    var id = e.currentTarget.dataset.comid
    var shu = e.currentTarget.dataset.shu
    var user_id = e.currentTarget.dataset.userid
    console.log("评论")
    console.log(user_id)
    wx.navigateTo({
      url: "/pages/comment/comment?id=" + id + '&shu=' + shu + '&userhid=' + user_id,
    })
  },
  // #号
  jhao: function () {
    // console.log("hhh")
    wx.navigateTo({
      url: '/pages/topicdetails/topicdetails',
    })
  },

  // @的
  asah: function () {
    wx.navigateTo({
      url: '/pages/bghom/bghom',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    console.log('urlimgu', urlimg)
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
        // urlimg: this.data.details.image,
        //   name: this.data.details.home_uaer_name,
        //     show: this.data.details.description
        // ctx.drawImage('/img/backg.png', 0, 0, w, h);               //背景图
        ctx.setFillStyle('white')                           //白布
        ctx.fillRect(w / 2 - 35, 300,200, 200)
        ctx.drawImage(that.data.urlimg, 20, 40, w / 9 * 8, h / 12 * 9);   

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
        ctx.drawImage('/img/hhyy.png', w / 10 * 9 - 45, h / 11 * 9+10,60, 60);            
        ctx.setFontSize(w / 30);
        ctx.setFillStyle("#333333");
        ctx.setTextAlign('right')
        ctx.fillText("扫码查看", w/9*8.5, h / 12 * 11.5);            //晒晒说明
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








  listenSwiper: function (e) {
    // console.log(e);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var options = {
      id: wx.getStorageSync('wenzhang')
    }
    this.onLoad(options) 
    
    
  },

  openLocation: function (e) {
    var xy = e.currentTarget.dataset;
    let comment_id = xy.id;

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
        console.log(data)
        // if(data.data ==='金额修改成功'){
        //   wx.showToast({
        //     title: '获取收益成功',
        //     icon: 'success',
        //     duration: 1500
        //   });
        // }else{
        //   if(data.data===''){
        //     wx.showModal({
        //       title: '错误',
        //       content: '你已经点过了该文章',
        //     });
        //   }else{
        //     wx.showModal({
        //       title: '错误',
        //       content: '网络开小差了',
        //     });
        //   }
        // }
      },
      fail(data) {
        wx.showModal({
          title: '错误',
          content: '网络开小差了',
        });
      }
    })

    console.log(xy)
    wx.openLocation({
      longitude: Number(xy.y),
      latitude: Number(xy.x),
      name: xy.name,
      address: xy.address
    })
  },

  tex: function (e) {
    // console.log(e);
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  //发布成功后分享开关
  onG: function () {
    // console.log("HHHHHHHHYYY")
    wx.reLaunch({
      url: '../../index/index',
    })
    this.setData({
      tur: false
    })

  },

  // 点赞
  onDz: function (e) {
    // console.log(e)
    var hhArr = this.data.details;
    var item_id = e.currentTarget.dataset.id
    if (hhArr) {
      var hasChange = hhArr.hasChange;
      if (hasChange !== undefined) {
        var onum = hhArr.user_praise;
        if (!hasChange) {
          hhArr.user_praise = (onum + 1);
          hhArr.hasChange = true;
          wx.request({
            url: app.globalData.url + 'Look/dianZan',
            data: {
              user_id: app.globalData.userInfo.id,
              user_praise: hhArr.user_praise,
              comment_id: item_id
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              // console.log(res.data);

            }
          })
        } else {
          hhArr.user_praise = (onum - 1);
          hhArr.hasChange = false;
          wx.request({
            url: app.globalData.url + '/Look/dianZan',
            data: {
              user_id: app.globalData.userInfo.id,
              user_praise: hhArr.user_praise,
              comment_id: item_id
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              // console.log(res.data);

            }
          })
        }
      }
      this.setData({
        details: hhArr
      })
    }

  },
  //收藏
  onSc: function (e) {
    var hhArr = this.data.details;
    var item_id = e.currentTarget.dataset.id
    if (hhArr) {
      var hasChangesc = hhArr.hasChangesc;
      if (hasChangesc !== undefined) {
        var onum = hhArr.user_collection;
        if (!hasChangesc) {
          hhArr.user_collection = (onum + 1);
          hhArr.hasChangesc = true;
          wx.request({
            url: app.globalData.url + 'Look/bintTap',
            data: {
              user_id: app.globalData.userInfo.id,
              sc_count: hhArr.user_collection,
              comment_id: item_id
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              // console.log(res.data);

            }
          })
        } else {
          hhArr.user_collection = (onum - 1);
          hhArr.hasChangesc = false;
          wx.request({
            url: app.globalData.url + 'Look/bintTap',
            data: {
              user_id: app.globalData.userInfo.id,
              sc_count: hhArr.user_collection,
              comment_id: item_id
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              // console.log(res.data);

            }
          })
        }
      }
      this.setData({
        details: hhArr
      })
    }

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  lower: function (e) {
    // console.log(e)
    var id = e.currentTarget.dataset['lastid']
    this.loadData(id)
  },
  loadData: function (lastid) {
    var limit = 8
    var that = this
    wx.request({
      url: app.globalData.url + 'Home/getPageContentInfo',
      data: {
        lastid: lastid,
        limit: limit
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log(res)
        console.log(res.data.data)
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
  shanchu: function () {
    wx.request({
      url: app.globalData.url + 'Upload/deleteComment',
      data: {
        comment_id: this.data.buxianshi,
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },


  bindKeyInput: function (e) {
    var that = this;
    var username = e.detail.value;
    console.log(e)
    var id = e.currentTarget.dataset.id
    console.log(username);
    wx.request({
      url: app.globalData.url + 'Comment/commentsSave',
      data: {
        user_id: app.globalData.userInfo.id,
        comment_id: id,
        reply_msg: username
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
      }
    })

  },

  /**
   * 详情
   */
  onXq: function (e) {
    var id = e.currentTarget.dataset.id;
    // console.log("HH")
    // console.log(id)
    wx.navigateTo({
      url: "/pages/index/details/index?id=" + id
    })
  },
  // /点赞
  onPostTap: function (e) {
    var that = this;
    var hhArr = this.data.dataArray;
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
              // console.log(res.data);

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

  // /生成海报
  share: function () {
    var that = this
    that.help()
    setTimeout(function () {
      that.setData({
        ononlo: "保存图片",
      });
      console.log("消失")
    }, 3000);
    // console.log(this.data.details.image[0])
    // wx.navigateTo({
    //   url: './share/index?id=' + this.data.buxianshi + '&urlimg=' + this.data.details.image[0] + '&r_image=' + this.data.details.r_image + '&name=' + this.data.details.description
    // })
    that.setData({
      look: true,
      show_fenxiang: false,
      
    })
  },
  fffdd: function (e) {

    this.setData({
      look: false
    })

  },

  // 海报返回

  // /生成 长图
  chshare: function () {
    // console.log(this.data.details.image[0])
    // wx.navigateTo({
    //   url: './chshare/index?id=' + this.data.buxianshi + '&urlimg=' + this.data.details.image + '&r_image=' + this.data.details.r_image + '&name=' + this.data.details.description
    // })

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