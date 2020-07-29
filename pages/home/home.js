const api = require('../../utils/request.js')
const app = getApp();
const {
  $Toast
} = require('../../dist/base/index');
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    elements: [{
        title: '装柜预约',
        name: 'reserve',
        color: 'cyan',
        icon: 'newsfill'
      },
      {
        title: '定位签到',
        name: 'getLocation',
        color: 'blue',
        icon: 'footprint'
      },
      {
        title: '装柜列表',
        name: 'LoadingList',
        color: 'red',
        icon: 'form'
      },
      {
        title: '退出登录 ',
        name: 'login',
        color: 'green',
        icon: 'exit'
      }
    ]
  },
  methods: {
    onShareAppMessage() {
      return {
        title: '排柜预约系统',
        desc: '新宝电器出货系统排柜预约',
        imageUrl: './shareImg.jpg'
      }
    },
    onLoad(e) {
      api.wxRequest(app.globalData.url + '/GetRoles', {
        UserCode: wx.getStorageSync('usercode')
      }, (res) => {
        //成功
        if (res.data.IsSuccess) {
          app.globalData.userRole = res.data.Role;
        }
      })
      wx.removeStorageSync('SearchObject')
    }
  }
})