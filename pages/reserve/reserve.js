const app = getApp();
const {
  $Toast
} = require('../../dist/base/index');

const api = require('../../utils/request.js')

Page({
  data: {
    ShippingList: [],
    date: "0"
  },

  //日期选择
  radiochange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  //查看预约信息
  showDetail(e) {
    let SerialCode = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/reserveInfo/reserveInfo?SerialCode=' + SerialCode + '&date=' + this.data.date
    })
  },
  //查询
  search() {
    // 可预约列表
    $Toast({
        content: "正在加载",
        type: 'loading',
        duration: 0
      }),
      api.wxRequest(app.globalData.url + '/GetShippingList', {
        ShippingDate: this.data.date, //0今天 1明天
        UserCode: wx.getStorageSync('usercode')
      }, (res) => {
        $Toast.hide();
        //成功
        if (res.data.IsSuccess) {
          //可预约列表ShippingList
          res.data.ShippingList.forEach(item => item.AppointmentDate = item.AppointmentDate == null ? '--' : item.AppointmentDate.substring(11))
          this.setData({
            ShippingList: res.data.ShippingList
          })
          app.globalData.ShippingList = this.data.ShippingList;
        } else {
          $Toast({
            content: res.data.ErrorMsg
          })
        }
      })
  },
  onShow() {
    this.search();
  }
})