const app = getApp()
const amapFile = require('../../libs/amap-wx.js');
const markersData = {
  latitude: '', //纬度
  longitude: '', //经度
  key: "c4b84c40f7ecf5fca4be3abb0c8ff194" //高德地图key
};
const {
  $Toast
} = require('../../dist/base/index');
const api = require('../../utils/request.js')
Page({
  data: {
    listData: [],
    longitude: Number,
    latitude: Number,
    location: "",
    markers: [{
      iconPath: "./map.png",
      id: 0,
      latitude: '',
      longitude: '',
      width: 25,
      height: 25
    }]
  },
  //获取当前位置经纬度
  loadInfo() {
    let that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
          'markers[0].longitude': res.longitude,
          'markers[0].latitude': res.latitude
        })
        that.loadCity(that.data.longitude, that.data.latitude);
      }
    })
  },
  //根据经纬度调用高德API获取准确定位
  loadCity(longitude, latitude) {
    let myAmapFun = new amapFile.AMapWX({
      key: markersData.key
    });
    myAmapFun.getRegeo({
      location: '' + longitude + ',' + latitude + '', //location的格式为'经度,纬度'
      success: (data) => {
        $Toast.hide();
        this.setData({
          location: data[0].regeocodeData.formatted_address
        })
      },
      fail: function (info) {
        $Toast({
          content: "连接服务器失败，请稍后再试！",
          type: "error"
        })
      }
    });
  },
  //重新定位
  refresh() {
    $Toast({
      content: "正在定位，请稍等...",
      type: "loading",
      duration: 0
    })
    this.loadInfo();
  },
  onShow: function () {
    $Toast({
      content: '正在加载',
      type: 'loading',
      duration: 0
    });
    this.loadInfo();
    setTimeout(() => {
      this.refresh();
    }, 300000);
    this.getData();
  },
  //签到
  sign(e) {
    let that = this;
    let index = e.currentTarget.dataset.id; //出货单号
    if (this.data.location == '') {
      $Toast({
        content: '当前地点为空'
      })
      return false;
    }
    api.wxRequest(app.globalData.url + '/SubmitSignAppointment', {
      PlanCode: this.data.listData[index].PlanCode,
      SerialCode: this.data.listData[index].SerialCode,
      WHCode: this.data.listData[index].WHCode,
      SignPlace: this.data.location
    }, (res) => {
      //成功
      if (res.data.IsSuccess) {
        wx.showToast({
          title: '签到成功',
          icon: 'none',
          duration: 1500,
          success: function () {
            setTimeout(function () {
              that.getData();
            }, 1500)
          }
        })
      } else {
        $Toast({
          content: res.data.ErrorMsg
        })
      }
    })
  },
  // 已预约列表
  getData() {
    api.wxRequest(app.globalData.url + '/GetAppointmentList', {
      ShippingDate: 0,
      UserCode: wx.getStorageSync('usercode')
    }, (res) => {
      //成功
      if (res.data.IsSuccess) {
        res.data.AppointmentList.forEach(item => item.AppointmentDate = item.AppointmentDate.substring(11));
        res.data.AppointmentList.forEach(item => {
          if (item.SignDateTime != null) {
            item.SignDateTime = item.SignDateTime.substring(11)
          }
        });
        this.setData({
          listData: res.data.AppointmentList
        })
      } else {
        $Toast({
          content: res.data.ErrorMsg
        })
      }
    })
  }
})