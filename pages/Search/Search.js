const app = getApp();
var utils = require("../../utils/util.js")
var testData = require("../LoadingList/tempData")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    ShipmentDate: "", //日期
    MakeOrg: "", //单位
    LoadingPlace: "", //装柜地点
    BoxSn: "", //序号
    BoxNo: "", //柜号
    IsLeave: ""
  },

  MakeOrgInput(e) { //单位
    this.setData({
      MakeOrg: e.detail.value
    })
  },
  LoadingPlaceInput(e) { //装柜地点
    this.setData({
      LoadingPlace: e.detail.value
    })
  },
  BoxSnInput(e) { //序号
    this.setData({
      BoxSn: e.detail.value
    })
  },
  BoxNoInput(e) { //柜号
    this.setData({
      BoxNo: e.detail.value
    })
  },
  bindDateChange: function (e) { //日期
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      ShipmentDate: e.detail.value
    })
  },
  checkboxChange: function (e) {
    this.setData({
      IsLeave: e.detail.value
    })
  },

  onLoad: function (option) {
    var that = this
    var date = new Date()
    this.setData({
      ShipmentDate: utils.formatday(date),
      BoxSn: option.BoxSn,
      LoadingPlace: option.LoadingPlace
    })
  },
  /**
   * 
   * 搜索提交
   */
  ticketDetailPage: function (e) {
    var that = this
    var leave = this.data.IsLeave
    if (leave) {
      leave = "1" //已经离开
    } else {
      leave = "0" //未离开
    }
    // console.log(leave)
    var searchObject = {
      ShipmentDate: this.data.ShipmentDate,
      MakeOrg: this.data.MakeOrg,
      LoadingPlace: this.data.LoadingPlace,
      BoxSn: this.data.BoxSn,
      BoxNo: this.data.BoxNo,
      IsLeave: leave
    }
    wx.setStorageSync('SearchObject', searchObject),
      wx.navigateTo({
        url: '../LoadingList/LoadingList',
      })
  }
})