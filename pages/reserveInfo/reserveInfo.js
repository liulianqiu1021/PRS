// pages/reserveInfo/reserveInfo.js
const app = getApp();
const {
  $Toast
} = require('../../dist/base/index');

const api = require('../../utils/request.js')
Page({
  data: {
    SerialCode: '', //装柜序号
    reserveInfo: {},
    date: '',
    CabinetPlaceList: [], //装柜地点表
    AppointmentDateList: [], //可预约时间表
    array: [], //顺序表(1-n)
    disabled: true
  },
  onLoad: function (options) {
    this.setData({
      SerialCode: options.SerialCode,
      date: options.date
    })
    app.globalData.ShippingList.forEach(item => {
      if (item.SerialCode == this.data.SerialCode) {
        this.setData({
          reserveInfo: item
        })
      }
    })
    if (!this.data.reserveInfo.IsAppointment) {
      this.setData({
        disabled: false
      })
    }
  },

  bindNumChange(e) {
    let index = e.currentTarget.dataset.id;
    let temp = 'CabinetPlaceList[' + index + '].SortNum';
    this.setData({
      [temp]: this.data.array[e.detail.value]
    })
  },
  onShow: function () {
    //获取可预约时间列表 获取仓库列表（预约）
    api.wxRequest(app.globalData.url + '/GetAppointmentDateAndPlace', {
      PlanCode: this.data.reserveInfo.PlanCode,
      SerialCode: this.data.reserveInfo.SerialCode,
      ShippingDate: this.data.date
    }, (res) => {
      //成功
      if (res.data.IsSuccess) {
        this.setData({
          AppointmentDateList: res.data.AppointmentDateList, //可预约时间列表
          CabinetPlaceList: res.data.CabinetPlaceList //仓库列表
        })
        // console.log(JSON.stringify(this.data.CabinetPlaceList))
        let tempArr = [];
        if (this.data.CabinetPlaceList.length > 1) {
          for (let i = 1; i <= this.data.CabinetPlaceList.length; i++) {
            tempArr.push(i);
          }
        } else if (this.data.CabinetPlaceList.length == 1) {
          tempArr = [1];
        }
        this.setData({
          array: tempArr
        })
      } else {
        $Toast({
          content: res.data.ErrorMsg
        })
      }
    })
  },
  //操作
  oprate(e) {
    //查看(取消预约)
    if (this.data.reserveInfo.IsAppointment) {
      api.wxRequest(app.globalData.url + '/SubmitCancelAppiontment', {
        SerialCode: this.data.reserveInfo.SerialCode, //装柜序号
        ShippingDate: this.data.date
      }, (res) => {
        if (res.data.IsSuccess) {
          //取消预约成功
          wx.showToast({
            title: '取消预约成功',
            icon: 'none',
            duration: 2000,
            success: function () {
              setTimeout(function () {
                wx.navigateBack({
                  url: '/pages/reserve/reserve'
                })
              }, 2000)
            }
          })
        } else {
          $Toast({
            content: res.data.ErrorMsg
          })
        }
      })
    } else {
      //提交预约时间  提交仓库顺序
      let CabinetPlaceList = this.data.CabinetPlaceList;
      //判断装柜顺序是否重复
      for (let i = 0; i < CabinetPlaceList.length - 1; i++) {
        for (let j = i + 1; j < CabinetPlaceList.length; j++) {
          if (CabinetPlaceList[i].SortNum == CabinetPlaceList[j].SortNum) {
            $Toast({
              content: '装柜顺序重复，请重新排序'
            })
            return false;
          }
        }
      }

      let time = e.currentTarget.dataset.id;
      api.wxRequest(app.globalData.url + '/SubmitAppointment', {
        SerialCode: this.data.reserveInfo.SerialCode, //装柜序号
        AppointmentDate: time, //预约时间
        ShippingDate: this.data.date, //0今天 1明天
        CabinetPlaceList: JSON.stringify(this.data.CabinetPlaceList), //仓库列表
        CabinetCode: this.data.reserveInfo.CabinetCode, //柜号
        CarCode: this.data.reserveInfo.CarCode, //车牌号
        IDCard: this.data.reserveInfo.IDCard, //身份证
        DriverName: this.data.reserveInfo.DriverName, //司机名称
        Telephone: this.data.reserveInfo.Telephone //联系方式
      }, (res) => {
        $Toast.hide();
        //成功
        if (res.data.IsSuccess) {
          wx.showToast({
            title: '预约成功',
            icon: 'none',
            duration: 2000,
            success: function () {
              setTimeout(function () {
                wx.navigateBack({
                  url: '/pages/reserve/reserve'
                })
              }, 2000)
            }
          })
        } else {
          $Toast({
            content: res.data.ErrorMsg
          })
        }
      })
    }
  }
})