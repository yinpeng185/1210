const app = getApp();

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

  //   /**
  //    * 页面的初始数据
  //    */
  data: {
    name: '',
    urlimg: '',
    //     loadhide: true,
    //     share_title: '', //海报第一部分  分享标题
    //     share_category: '', //海报第二部分  分享分类    
    //     share_content: '', //海报第三部分  分享内容  
    //     qrcode: ''
    c_w:0,
    c_h:0,
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标
      title: '生成海报', //导航栏 中间的标题
    },
  },
  //   /**
  //    * 生命周期函数--监听页面加载
  //    */
  onLoad: function (options) {

    var that = this;
    const scene = decodeURIComponent(options.id)
    //获取分享数据
    var urlimg = options.urlimg;
    var name = options.name;
    console.log(urlimg)
    console.log(name)
    //获取手机信息
    var phone = wx.getSystemInfoSync();

    //将手机的尺寸信
    var phone_width = phone.windowWidth;
    var phone_height = phone.windowHeight;

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

  //   //下载图片方法
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

  eron:function(){
    wx.request({
      url: app.globalData.url +"Codesend/getWXACodeUnlimit",//域名省略
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

  //   /**
  //    * 画图
  //    */

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
      c_h:phoneHeight
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


        console.log("tup" + width + height);
      
        var g_h = (phoneWidth / width) * height - 50;
        var g_w = (phoneWidth / width) * width - 50;
        console.log(g_h +"TT"+ g_w)


        ctx.drawImage(that.data.urlimg, 25, 25, g_w, g_h);
        that.setData({
          c_h: g_h
        });

        // ctx.draw(true);
        ctx.setFontSize(24 * mpx);
        ctx.font = 'normal bold 12px sans-serif';
        ctx.setFillStyle("#333333");
        
        let doc_str = that.data.name
        let str_length = GetLength(doc_str);
        if (str_length>45){
        let txt1 = doc_str.substring(0, 22);
        let txt2 = doc_str.substring(20, 38) + '...';
          ctx.fillText(txt1, 30, g_h + 45);
          ctx.fillText(txt2, 30, g_h + 65);
        }else{
          ctx.fillText(that.data.name, 30, g_h + 45);
        }        
        ctx.drawImage('/img/hhyy.png', g_w-30, g_h+35, 50, 50);
        ctx.setFontSize(10);
        ctx.setFillStyle("#333333");
        ctx.fillText("一个可以赚钱的分享社区", 30, g_h + 95);
        ctx.setFontSize(7);
        ctx.setFillStyle("#333333");
        ctx.fillText("扫码查看", g_w - 30, g_h + 95);
        that.setData({
          c_h: g_h + 105
        });

        //   //       var g_w = phoneWidth; //商品名图片与手机屏幕宽度一致
        //   //       //通过宽度比例计算图片应有高度
        //   //       var g_h = (phoneWidth / that.xzwidth) * that.xzheight;
        //   //       //现在图片
        //   //       // ctx.drawImage(that.data.urlimg, (phoneWidth - (g_w / 1.1)) / 2, 20, g_w / 1.1, g_h + 100)


        //   //       //内容
        //   //       let doc_str = data.info.content
        //   //       let str_length = GetLength(doc_str);
        //   //       console.log("str_length" + str_length)
        //   //       let txt1 = doc_str.substring(0, 20);
        //   //       let txt2 = doc_str.substring(20, 38) + '...';
        //   //       ctx.setFontSize(14 * mpx);
        //   //       ctx.setFillStyle("#4c4c4c");
        //   //       ctx.fillText(txt2, (phoneWidth - ((14 * mpx) * 20)) / 2 - 30, qr_ht + 40);
        //   //       ctx.fillText(txt1, (phoneWidth - ((14 * mpx) * 20)) / 2 - 30, qr_ht + 20);
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
    }, 3000);
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
      })
    },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    //this.initplacard(this.data.options);
  },

    goHome: function () {
      let url = '/pages/index/index';
      wx.switchTab({
        url: url,
      })
    }
})