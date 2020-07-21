const app = getApp()
const {
  $Toast
} = require('../../dist/base/index');

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    usercode: '',
    password: ''
  },
  //监听账号输入框
  usernameInput(e) {
    this.setData({
      usercode: e.detail.value
    })
  },
  //监听密码输入框
  passwordInput(e) {
    this.setData({
      password: e.detail.value
    })
  },
  //登录
  login() {
    if (this.data.usercode == "") {
      $Toast({
        content: '请输入账号'
      });
      return false;
    } else if (this.data.password == "") {
      $Toast({
        content: '请输入密码'
      });
      return false;
    } else {
      $Toast({
          content: "正在登录",
          type: 'loading',
          duration: 0
        }),
        wx.request({
          url: app.globalData.url + '/Login',
          data: {
            UserCode: this.data.usercode,
            PassWord: this.data.password
          },
          method: 'POST',
          dataType: 'json',
          contentType: 'application/json',
          success: (res) => {
            $Toast.hide();
            //成功
            if (res.data.IsSuccess) {
              wx.reLaunch({
                url: '/pages/home/home'
              });
              wx.setStorageSync('usercode', this.data.usercode);
              wx.setStorageSync('password', this.data.password);
              // wx.setStorageSync('token', res.data.JwtCode);
            } else {
              $Toast({
                content: res.data.ErrorMsg
              })
            }
          },
          fail: (res) => {
            $Toast({
              content: "连接服务器失败，请稍后再试！"
            })
          }
        })
    }
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    // if (wx.getStorageSync('usercode') != '' && wx.getStorageSync('openid') != '') {
    //   wx.redirectTo({
    //     url: '/pages/home/home'
    //   });
    // }
  },
  onShow() {
    if (wx.getStorageSync('usercode') != '') {
      this.setData({
        usercode: wx.getStorageSync('usercode'),
        password: wx.getStorageSync('password')
      })
    }
    wx.hideHomeButton({
      complete: (res) => {}
    })
  },
  getUserInfo: function (e) {
    if (!e.detail.userInfo) {
      //用户按了拒绝按钮
      wx.showModal({
        title: "警告",
        content: '您点击了拒绝授权，无法进入小程序，请授权后再进入！',
        showCancel: false,
        confirmText: '返回授权'
      })
    } else {
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  }
})