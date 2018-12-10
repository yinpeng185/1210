// pages/add/img/img.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pics: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onChooseUploadImageTap()
    var query = wx.createSelectorQuery();
    //选择id
    var that = this;
    query.select('.bqwz').boundingClientRect(function (rect) {
      console.log(rect)
      // that.setData({
      //   height: rect.width + 'px'
      // })
    }).exec();
  },
  /**
   * 图片方法
   */
  onChooseUploadImageTap: function () {
    let data = this;
    wx.showActionSheet({
      itemList: ['选择图片', '相机拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        // console.log(res)
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            data.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            data.chooseWxImage('camera')
          }
        }
      }
    })
  },
  /**
   * 选择图片是从相册还是拍照选图片
   */

  chooseWxImage: function (type) {
    var data = this,
      pics = this.data.pics;

    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        var imgSrc = res.tempFilePaths;
        pics = pics.concat(imgSrc);
        data.setData({
          pics: pics
        })

      }
    })

  },

  imageLoad: function (e) {
    // console.log(e.target.dataset.id)
    var width = e.detail.width,    //获取图片真实宽度
      height = e.detail.height,
      ratio = width / height;    //图片的真实宽高比例
    // console.log("WW"+width+"HH" + height +"RR"+ ratio)
    var viewWidth = 750,           //设置图片显示宽度
      viewHeight = 750 / ratio;    //计算的高度值
    var image = this.data.pics;
    // console.log(image)
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    image[e.target.dataset.id] = {
      width: viewWidth,
      height: viewHeight
    };
    // console.log(image)
    this.setData({
      picss: image,
    })
    // console.log(this.data.pics)
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

  }
})