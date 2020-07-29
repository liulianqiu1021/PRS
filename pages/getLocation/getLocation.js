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
const myAmapFun = new amapFile.AMapWX({
  key: markersData.key
});
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
    }],
    IsInRegion: false
  },
  //签到
  sign(e) {
    let that = this;
    let index = e.currentTarget.dataset.id;
    if (this.data.location == '') {
      $Toast({
        content: '当前地点为空'
      })
      return false;
    }
    //判断签到地点合法性
    let LegalArea = JSON.parse(this.data.listData[index].LegalArea); //仓库经纬度数组
    let pathCount = LegalArea.length;
    let iSum = 0;

    if (pathCount < 3) {
      this.data.IsInRegion = false;
    } else {
      for (let i = 0; i < pathCount; i++) {
        let nextIndex = i + 1;
        if (i == pathCount - 1) {
          nextIndex = 0;
        }
        let longStart = Number(LegalArea[i].xAxis); //经度
        let latiStart = Number(LegalArea[i].yAxis); //纬度
        let longEnd = Number(LegalArea[nextIndex].xAxis);
        let latiEnd = Number(LegalArea[nextIndex].yAxis);

        //判断纬度即Y坐标是否在2点的Y坐标内，只有在其内水平线才会相交
        if ((this.data.latitude >= latiStart && this.data.latitude < latiEnd) ||
          (this.data.latitude >= latiEnd && this.data.latitude < latiStart)) {
          if (Math.abs(latiStart - latiEnd) > 0) {
            let dLong = longStart - ((longStart - longEnd) * (latiStart - this.data.latitude)) / (latiStart - latiEnd);
            if (dLong < this.data.longitude) {
              iSum++;
            }
          }
        }
      }
      if ((iSum % 2) != 0) {
        //在区域内部
        this.data.IsInRegion = true;
      }
    }
    if (this.data.IsInRegion == true) {
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
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '你当前位置不在仓库合法范围内，不能签到。',
        showCancel: false,
        confirmColor: '#409EFF'
      })
    }
  },
  //打开地图
  openMap(e) {
    myAmapFun.getRegeo({
      location: '' + Number(e.currentTarget.dataset.longitude) + ',' + Number(e.currentTarget.dataset.latitude) + '',
      success: (data) => {
        let destinationName = data[0].regeocodeData.formatted_address;
        if (destinationName != '' && destinationName != undefined) {
          wx.openLocation({
            latitude: Number(e.currentTarget.dataset.latitude),
            longitude: Number(e.currentTarget.dataset.longitude),
            name: destinationName
          })
        }
      },
      fail: function (info) {
        $Toast({
          content: "连接服务器失败，请稍后再试！",
          type: "error"
        })
      }
    });
  },
  //打电话
  call(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    }).catch(() => {})
  },
  //进入对应装柜地点的装柜信息
  opeLoading(e) {
    //管理员或装柜员
    if (app.globalData.userRole == 0 || app.globalData.userRole == 1) {
      if (e.currentTarget.dataset.time != null) {
        let SerialCode = e.currentTarget.dataset.code; //装柜序号
        let WHName = e.currentTarget.dataset.name; //装柜地点
        wx.navigateTo({
          url: '/pages/Search/Search?BoxSn=' + SerialCode + '&LoadingPlace=' + WHName
        })
      } else {
        $Toast({
          content: "司机还未签到，无法查看装柜信息！"
        })
      }
    }
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
    setTimeout(() => {
      this.refresh();
    }, 300000);
  },
  onLoad() {
    $Toast({
      content: '正在加载',
      type: 'loading',
      duration: 0
    });
    this.loadInfo();
    this.getData();
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