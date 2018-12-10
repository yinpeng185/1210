// pages/add/add.js
import util from '../../utils/hh';
const app = getApp();
const at_num = 0; // 已@用户数量
const topic_num = 0; // 已添加话题数
Array.prototype.has = function(v) {
  for (let i = 0; i < this.length; ++i) {
    if (this[i] == v) {
      return true;
    }
  }
  return false;
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标
      title: '发布', //导航栏 中间的标题
    },

    // 此页面 页面内容距最顶部的距离
    height: app.globalData.navHeight,
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    category: [], //下拉列表的数据
    index: false, //选择的下拉列表下标
    pics: [],
    videoSource: '',
    videoHidden: true,
    categoryID: '',
    autoFocus: true,
    username: '',
    imggim: [],
    imgName: [],
    hhh: ["HHHH", "hhhhh"],
    addressname: '添加位置',
    id: '',
    user_at: [], //  匹配到的用户所@字符
    topic: [], // 匹配到的用户话题字符
    user_info: [], // 选择@页所选择的用户列表，包含用户id和用户名
    is_button_nav: false, // 是否为按钮跳转
    topic_info: [],
    caogao_id: 0,
    exits_img: [],
    max: 588
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let caogao_id = wx.getStorageSync('caogao_id');
    if (typeof caogao_id == 'number') {
      this.setData({
        caogao_id: caogao_id
      });
      let that = this;

      wx.request({
        url: app.globalData.url + 'Caogao/caogaoInfo',
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        data: {
          id: caogao_id
        },
        success(res) {
          console.log(res);
          that.setData({
            pics: res.data.image,
            videoSource: '',
            videoHidden: true,
            categoryID: '',
            id: res.data.category_id,
            name: res.data.category_name,
            autoFocus: true,
            username: res.data.description,
            imggim: [],
            imgName: [],
            exits_img: res.data.image,
            hhh: ["HHHH", "hhhhh"],
            addressname: res.data.addressname,
            address: res.data.address,
            latitude: res.data.xpoint,
            longitude: res.data.ypoint,
            user_at: [], //  匹配到的用户所@字符
            topic: [], // 匹配到的用户话题字符
            user_info: [], // 选择@页所选择的用户列表，包含用户id和用户名
            is_button_nav: false, // 是否为按钮跳转
            topic_info: [],
          });
        },
        fail(res) {
          console.log(res);
        }
      });
      wx.setStorageSync('caogao_id', '');
    }

  },
  //获取焦点
  activeFocus: function(e) {

  },
  //失去焦点
  resignblur: function(e) {

  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    // console.log(Index)
    var categoryID = e.currentTarget.dataset.indexx;
    // console.log(categoryID)
    this.setData({
      index: Index,
      categoryID: categoryID,
      show: !this.data.show
    });
  },



  get_user_input: function(e) { // 获取用户输入
    let at_reg = /@{1,}[^@#\s]*[\s]{1}/gm;
    let topic_reg = /#{1,}[^@#]*#{1}[\s]{1}/gm;
    let str = e.detail.value;
    if (/@$/gm.test(str)) { // 用户输入了新的@，也就是要跳转到用户选择页
      console.log('新的@出现');
      let user_name = this.data.username;
      if (user_name.length < str.length) { // 判断是输入了新的@还是删除到了@的位置
        user_name = user_name.substr(0, user_name.length); // 去除掉当前的@
        this.setData({
          username: user_name
        });
        wx.navigateTo({
          url: './aa/aa',
        });
        return user_name;
      }
    }

    if (/#$/gm.test(str)) { // 用户输入了新的#，也就是要跳转到话题选择页
      console.log('新的#出现');
      let user_name = this.data.username;
      let topic_info = this.data.topic_info;
      if (user_name.length < str.length && topic_info.length == 0) { // 判断是输入了新的#还是删除到了#的位置
        user_name = user_name.substr(0, user_name.length);
        this.setData({
          username: user_name
        });
        wx.navigateTo({ // 跳转到话题选择页
          url: './grie/grie',
        });
        return user_name;
      }
    }

    let user_at = str.match(at_reg);
    if (user_at !== null) { // 对匹配出来的用户名再次处理，去除掉@
      for (let i = 0; i < user_at.length; ++i) {
        user_at[i] = user_at[i].substr(1, user_at[i].length - 2);
      }
    }
    let topic = str.match(topic_reg);
    if (topic !== null) { // 对匹配出来的话题再次处理，去除掉#
      for (let s = 0; s < topic.length; ++s) {
        topic[s] = topic[s].substr(1, topic[s].length - 3);
      }
    }
    // console.log(user_at);
    // console.log(topic);

    // 计算字数
    var len = parseInt(str.length);
    // console.log("计算字数",len)
    this.setData({
      username: str,
      user_at: user_at,
      topic: topic,
      currentWordNumber: len //当前字数  
    });
  },
  /**
   * 打开地图
   */
  onGetMapLocationTap: function(e) {
    console.log(e);


    wx.chooseLocation({
      success: res => {
        this.setData({
          addressname: res.name,
          address: res.address,
          latitude: res.latitude,
          longitude: res.longitude
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  selectTaprrr: function() {
    console.log("HH")
    wx.navigateTo({
      url: '../classification/classification',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},
  onIpget: function() {
    var that = this
    wx.request({
      url: 'http://ip-api.com/json',
      success: function(e) {
        // console.log(e);
        // console.log(e.data.query);
        that.setData({
          motto: e.data
        })
      }
    })
  },

  fbon: function() {
    wx.navigateTo({
      url: './fb/fb',
    })
  },


  // grie: function () {
  //   let topic_info = this.data.topic_info;
  //   if(topic_info.length==0){
  //     wx.navigateTo({
  //       url: './grie/grie',
  //     });
  //     this.setData({
  //       is_button_nav: true
  //     });
  //   }
  // },
  grie: function() {
    let topic_info = this.data.topic_info;
    wx.navigateTo({
      url: './grie/grie',
    });
    this.setData({
      is_button_nav: true
    });

  },


  aa: function() {
    this.setData({ // 按钮跳转，未选择用户的返回处理不同
      is_button_nav: true
    });
    wx.navigateTo({
      url: './aa/aa',
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},
  /**
   * 图片方法
   */
  onChooseUploadImageTap: function() {
    let data = this;
    wx.showActionSheet({
      itemList: ['选择图片', '相机拍照'],
      itemColor: "#333333",
      success: function(res) {
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

  chooseWxImage: function(type) {
    var data = this,
      pics = this.data.pics;

    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function(res) {
        var imgSrc = res.tempFilePaths;
        pics = pics.concat(imgSrc);
        data.setData({
          pics: pics
        })
      }
    })
  },
  // 图片预览
  previewImage: function(e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.pics,
    })
  },

  /**
   * 删除选择的图片
   */
  onDeleteImgTap: function(e) {
    const dataset = e.currentTarget.dataset,
      index = dataset.index;
    var data = this
    const pics = data.data.pics;
    pics.splice(index, 1);
    data.setData({
      pics: pics
    });
  },


  onUpdata: function(i) {


    var _this = this,
      imgName = this.data.imgName;
    wx.uploadFile({
      url: app.globalData.url + 'Upload/index',

      filePath: _this.data.pics[i],
      name: 'file',
      formData: {
        id: wx.getStorageSync('user_Id'),

      },
      success(res) {
        console.log('村一')
        console.log(res.data)
      },
      fail: (res) => {},
    })
  },
  getOpinionCaogao: function(i) {


    var _this = this,
      imgName = this.data.imgName;
    wx.uploadFile({
      url: app.globalData.url + 'Upload/index',

      filePath: _this.data.pics[i],
      name: 'file',
      formData: {
        id: wx.getStorageSync('user_Id'),
        types: 111
      },
      success(res) {
        console.log('村二')
        console.log(res.data)
      },
      fail: (res) => {},
    })
  },

  publish: function(formData) { //  发布草稿到晒晒
    let thisd = this;
    if (formData.description == '') {
      wx.showModal({
        content: "发布内容不能为空",
        showCancel: false,
      });
    } else if (this.data.latitude == undefined) {
      wx.showModal({
        content: "请选择地址不为空",
        showCancel: false,
      });

    } else if (this.data.id == '') {
      wx.showModal({
        content: "请选择分类不为空",
        showCancel: false,
      });

    } else if (this.data.pics == '') {
      wx.showModal({
        content: "图片不为空",
        showCancel: false,
      });
    } else {
      wx.request({
        url: app.globalData.url + 'Newadd/caogaoTopublish',
        data: formData,
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          console.log('user_id');
          console.log(res);
          // 根据返回文章的user_Id存储图片
          wx.setStorageSync('user_Id', res.data.data.id);
          let exits_img = thisd.data.exits_img;
          for (var i = 0; i < thisd.data.pics.length; i++) {
            if (!exits_img.has(thisd.data.pics[i])) {
              thisd.onUpdata(i)
            }
          }
          // show_fenxiang
          // pages / index / details / index
          wx.showToast({
            title: '正在发布中',
            icon: 'loading',
            duration: 10000,
          });
          wx.navigateTo({
            url: '../index/details/index?id=' + Number(res.data.data.id) + "&tur=" + 111,
          })
        }
      })
    }
  },

  bindFormSubmit: function(e) {
    console.log(e.detail.target.dataset.hid)
    var thisd = this
    var formData = e.detail.value
    formData.categoryID = this.data.id
    formData.addressname = this.data.addressname
    formData.address = this.data.address
    formData.latitude = this.data.latitude
    formData.longitude = this.data.longitude
    formData.image = this.data.imgName
    formData.home_uaer_name = app.globalData.userInfo.nickName
    formData.r_image = app.globalData.userInfo.avatarUrl
    formData.id = app.globalData.userInfo.id;
    formData.user_info = this.data.user_info;
    formData.topic_info = this.data.topic_info;
    console.log(formData);

    if (this.data.caogao_id != 0) {
      formData.caogao_id = this.data.caogao_id;
      this.publish(formData);
      return;
    }

    if (e.detail.target.dataset.hid != null) { // 发布内容存草稿
      // console.log('啊啊啊啊啊啊')
      if (this.data.latitude == undefined) {
        wx.showModal({
          content: "请选择地址不为空",
          showCancel: false,
        });
      }

      wx.request({
        url: app.globalData.url + 'Add/getAddCaogao',
        data: formData,
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          console.log(res);
          // 根据返回文章的user_Id存储图片
          wx.setStorageSync('user_Id', res.data.data.id);
          for (var i = 0; i < thisd.data.pics.length; i++) {

            thisd.getOpinionCaogao(i)
          }
          wx.navigateTo({
            url: '/pages/my/setup/draft/draft',
          });
          thisd.setData({
            height: app.globalData.navHeight,
            show: false,
            category: [],
            index: false,
            pics: [],
            videoSource: '',
            videoHidden: true,
            categoryID: '',
            autoFocus: true,
            username: '',
            imggim: [],
            imgName: [],
            hhh: ["HHHH", "hhhhh"],
            addressname: '相关商家或者地址',
            id: '',
            user_at: [],
            topic: [],
            user_info: [],
            is_button_nav: false,
            topic_info: [],
          });
        }
      })

    } else { // 发布内容
      if (e.detail.value.description == '') {
        wx.showModal({
          content: "发布内容不为空",
          showCancel: false,
        });
      } else if (this.data.latitude == undefined) {
        wx.showModal({
          content: "请选择地址不为空",
          showCancel: false,
        });

      } else if (this.data.id == '') {
        wx.showModal({
          content: "请选择分类不为空",
          showCancel: false,
        });

      } else if (this.data.pics == '') {
        wx.showModal({
          content: "图片不为空",
          showCancel: false,
        });
      } else {


        wx.request({
          url: app.globalData.url + '/Add/getAddAip',
          data: formData,
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            console.log('user_id');
            console.log("返回文章Id")
            console.log(res);
            // 根据返回文章的user_Id存储图片
            wx.setStorageSync('user_Id', res.data.data.id);
            for (var i = 0; i < thisd.data.pics.length; i++) {
              thisd.onUpdata(i)
            }
            console.log("发布成功跳转详情页面")
            wx.navigateTo({
              url: '../index/details/index?id=' + Number(res.data.data.id) + "&tur=" + 111,
            })
          }
        })
      }

    }
  },

  // selectTaprrr:function(){
  //   console.log("HHY")

  // },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

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

  },
  onShow: function() {
    this.onLoad()

  },
  // 计算字数
  inputs: function(e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);

    //最少字数限制
    if (len <= this.data.min)
      this.setData({
        texts: "加油，够5个字可以得20积分哦"
      })
    else if (len > this.data.min)
      this.setData({
        texts: " "
      })

    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len //当前字数  
    });
  }
})