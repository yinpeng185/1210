const app = getApp();

function GetLength(str) {
  return str.replace(/[\u0391-\uFFE5]/g, "aa").length;
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: '/img/chttt.png',
    loadhide: true,
    canvasHiden: false,
    sharinfo: {
      pic: {
        goods_pic: '/images/default.png',
        head_pic: '/images/ico_vip.png'
      }
    },
    id: '',
    name: '',
    r_image: '',
    urlimg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id
    var urlimg = options.urlimg
    var r_image = options.r_image
    var name = options.name
    console.log("数据")
    console.log(id)
    console.log(urlimg)
    console.log(r_image)
    console.log(name)
    that.setData({
      id: id,
      r_image: r_image,
      urlimg: urlimg,
      name: name,
    })
    that.initData()
  },
  initData: function () {
    var that = this;



    wx.downloadFile({
      url: that.data.r_image,
      success: function (res) {
        console.log("下载图片")
        console.log(res)
        that.setData({
          r_image: res.tempFilePath
        })
        wx.downloadFile({
          url: that.data.urlimg,
          success: function (res) {
            console.log(res)
            that.setData({
              urlimg: res.tempFilePath
            })
            that.drawPoster()
          }
        })
      }
    })


  },

  drawPoster: function () {
    var that = this
    console.log("完成下载图片")
    console.log(that.data.r_image)
    console.log(that.data.urlimg)

    // 获取手机信息
    var phoneMsg = wx.getSystemInfoSync();
    //当天前手机的我宽度
    let pWidth = phoneMsg.windowWidth;
    // console.log("hh1aa" + pWidth);
    //制订同意的长度单位
    let mpx = pWidth / 375;
    //当前的海报高度
    var nowH = 0;
    // console.log(phoneMsg);
    var context = wx.createCanvasContext('myCanvas');
    //绘制背景色
    context.setFillStyle("#e5e5e5");
    context.fillRect(0, 0, pWidth, 2 * pWidth);
    //放置商品图片
    // console.log("商品图片" + that.data.sharinfo.pic.goods_pic)

    //获取图片数据
    wx.getImageInfo({
      src: that.data.r_image,
      success: function (res) {
        context.drawImage(that.data.imgurl, 0, 0, pWidth, 290);
        // 计算商品图片应有的宽高
        var g_w = pWidth; //商品名图片与手机屏幕宽度一致
        // console.log("huu"+g_w);
        //通过宽度比例计算图片应有高度
        var g_h = (pWidth / res.width) * res.height;
        //绘制商品图片
        context.drawImage(that.data.imgurl, 0, 0, 100, 290);
        context.rect(30,140, 500, 30)
        context.setFillStyle('red')
        context.fill()
        context.drawImage(that.data.urlimg, 0, 200, g_w, g_h);
        //标记当前海报的高度
        nowH = g_h;
        context.setFillStyle("red")
        //绘制一个圆形,半径56*mpx  距离左边50*mpx,作为头像的底色 ,头像放在元的中线,多余的白色 作为边框
        context.arc(60 * mpx, nowH, 28 * mpx, 0, 2 * Math.PI)
        // 对当前路径中的内容进行填充。默认的填充色为黑色。
        context.fill();
        context.drawImage(that.data.r_image, 25 * mpx, nowH - 25 * mpx, 50, 50);
        // console.log("h5" + that.data.sharinfo);
        //用户邀请信息
        context.setFontSize(14 * mpx);
        context.setFillStyle("#333333")
        context.fillText(that.data.name, 76 * mpx, nowH + 14 * mpx, 200);
        //hhhhhhhhhhh
        var tet = '邀你一起结伴';
        context.fillText(that.data.name + ' ' + tet, 76 * mpx, nowH + 14 * mpx, 200);
        //h
        // console.log("h4" + that.data.sharinfo.text.username_text + that.data.sharinfo.text.inite_text)
        //标记当前高度
        nowH = nowH + 24 * mpx;
        // 放置商品名
        context.setFillStyle("#E28101")
        context.setFontSize(18 * mpx)
        var g_name = that.data.name;
        //最大书写宽度
        var max_w = pWidth / 2 - 26 * mpx;
        //最多字数
        var max_n = Math.floor(max_w / (18 * mpx));
        // console.log(max_n, max_w);
        //放置初始的位置
        var g_n_x = 26 * mpx;
        var g_n_y = nowH + 18 * mpx;
        //最多行数
        var max = Math.ceil(GetLength(g_name) / 2 / max_n);
        var b, e;
        for (var i = 1; i <= max; i++) {
          var b = (i - 1) * 10;
          var e = i * 10;
          if (i <= 2) {
            var sub_name = g_name.substring(b, e);
            context.fillText(sub_name, g_n_x, i * 22 * mpx + g_n_y, max_w);
          } else {
            var sub_name = g_name.substring(b, b + Math.floor(max_n / 2));
            context.fillText(sub_name + '...', g_n_x, i * 22 * mpx + g_n_y, max_w);
            max = 3;
            break
          }
        }
        context.setFontSize(14 * mpx);
        context.setFillStyle("#333333");
        context.fillText("长按识别图中二维码→", g_n_x, (i + 2) * 22 * mpx + g_n_y, max_w);
        // context.fillText("商品名称商品名称", , g_n_y, max_w);
        // context.fillText("商品名称商品名称", g_n_x+0.5, g_n_y+0.5, max_w);
        var g_n_y = nowH + 18 * mpx;
        // context.drawImage(that.data.sharinfo.pic.qr_pic, g_n_x + max_w + max_w * 0.2, g_n_y, max_w * 0.8, max_w * 0.8)
        nowH = g_n_y + max_w * 0.9;
        context.save();
        context.draw()
        setTimeout(function () {
          wx.canvasToTempFilePath({
            canvasId: 'myCanvas',
            height: nowH,
            fileType: 'jpg',
            success: function (res) {
              //h
              // console.log(res.tempFilePath);
              that.setData({
                imgurl: res.tempFilePath,
                // img: that.data.sharinfo.pic.qr_pic,
                canvasHiden: true,
                loadhide: false
              })
            }
          })
        }, 1500);

      }
    })
    // context.save();
    // context.draw()
    // this.setData({
    //   img: that.data.sharinfo.pic.qr_pic
    // })

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
                  // console.log(res)
                }
              })
            } else if (res.cancel) {
              // console.log('用户点击取消')
            }
          }
        })
      }
    })


  },
  goHome: function () {
    let url = '/pages/index/index';
    wx.switchTab({
      url: url,
    })
  }
})