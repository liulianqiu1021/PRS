const {
  $Toast
} = require('/dist/base/index');

App({
  globalData: {
    userInfo: null,
    url: 'https://prs.donlim.com/api/PrsApi',
    // url: 'http://192.168.105.17/api/PrsApi',
    ShippingList: []
  },
  onLaunch: function () {
    let that = this;
    wx.checkSession({
      success: function (res) {},
      fail: function (res) {
        that.login();
      }
    })
    //更新小程序
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            wx.showModal({
              title: '已经有新版本上线',
              content: '新版本已经上线，请您删除当前小程序，重新搜索打开。'
            })
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow() {
    if (wx.getStorageSync('openid') == '') {
      this.login();
    }
    if (wx.getStorageSync('usercode') == '') {
      wx.reLaunch({
        url: '/pages/login/login'
      })
    }
  },
  login() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://prs.donlim.com/Home/GetOpenID',
            data: {
              code: res.code
            },
            method: 'POST',
            success: function (res) {
              wx.setStorageSync("openid", res.data.returnData.openid)
              // wx.setStorageSync("session_key", res.data.returnData.session_key)
            }
          })
        } else {
          $Toast({
            content: "登录失败" + res.errMsg,
            type: "error"
          })
        }
      }
    })
  },
  onHide() {
    // wx.reLaunch({
    //   url: '/pages/home/home'
    // });
    this.globalData.ShippingList = [];
  }
})