const app = getApp();
const utils = require("../../utils/util.js")
const testData = require("../LoadingList/tempData")
const {
  $Toast
} = require('../../dist/base/index');

Page({
  data: {
    ShipmentDate: '', //日期
    MakeOrg: '', //单位
    LoadingPlace: '', //装柜地点
    BoxSn: '', //序号
    BoxNo: '', //柜号
    ticketList: [],
    searchValue: "",
    RequestTime: "", //预约数据  
    ArrivalTiem: [],
    btnShow: false
  },
  /**
   * 用户选择点击单据 - 页面转换
   */
  ticketDetailPage: function (e) {
    var ticketObject = e.currentTarget.dataset.itemobject
    //把触发的项目数据写进小程序数据库
    wx.setStorageSync('LoadingObject', ticketObject)
    //页面转移
    wx.navigateTo({
      url: '../Loading/Loading',
    })
  },
  /**
   * 
   * 搜索功能
   */
  searchValueInput: function (e) {
    wx.navigateTo({
      url: '../Search/Search',
    })
  },
  onLoad: function (options) {
    
    //用户单据获取数据
    let that = this
    let searchobject = wx.getStorageSync('SearchObject')
    let ShipmentDate = searchobject.ShipmentDate
    let MakeOrg = searchobject.MakeOrg
    let LoadingPlace = searchobject.LoadingPlace
    let BoxSn = searchobject.BoxSn
    let BoxNo = searchobject.BoxNo
    let IsLeave = searchobject.IsLeave
    let usercode = wx.getStorageSync('usercode')
    wx.request({
      url: app.globalData.url + '/GetShipmentList',
      data: {
        ShipmentDate: ShipmentDate,
        MakeOrg: MakeOrg,
        LoadingPlace: LoadingPlace,
        BoxSn: BoxSn,
        BoxNo: BoxNo,
        IsLeave: IsLeave,
        UserCode: usercode
      },
      method: 'Post',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if (res.data.IsSuccess == false) {
          wx.showModal({
            title: '提示',
            content: res.data.ErrorMsg,
            showCancel: false,
            success: res => {
              if (res.confirm) {
                wx.navigateBack();
              }
            }
          })
          return
        }
        this.setData({
          btnShow: true
        })
        $Toast({
          content: "正在加载...",
          type: "loading",
          duration: 0
        })
        let tickets = res.data.ShipmentList;
        let ArrivalList = []
        let ArrivalTiem = []
        let SignTime = []
        let LeaveTime = []
        for (var i = 0; i < tickets.length; i++) {
          if (tickets[i].ArrivalDateRequest) { //预约到厂时间
            ArrivalList = tickets[i].ArrivalDateRequest.split(" ")
            ArrivalTiem = ArrivalList[1].split(":")
            tickets[i]['ArrivalTiem'] = ArrivalTiem[0]
          } else {
            tickets[i]['ArrivalTiem'] = "未预约"
          }
          if (tickets[i].SignDateTime) { //签到时间 
            SignTime = tickets[i].SignDateTime.split(" ")
            tickets[i]['SignTime'] = SignTime[1]
          } else {
            tickets[i]['SignTime'] = "未签到"
          }
          if (tickets[i].LeaveDateTime) { //离厂时间
            tickets[i]['LeaveTime'] = tickets[i].LeaveDateTime
          } else {
            tickets[i]['LeaveTime'] = "未离厂"
          }
          if (tickets[i].FactoryDistance) { //到厂距离
            tickets[i]['Distance'] = tickets[i].FactoryDistance
          } else {
            tickets[i]['Distance'] = "未到厂"
          }
        }
        that.setData({
          ticketList: tickets
        })
        $Toast.hide();
      },
      fail: (err) => {
        $Toast({
          content: "连接服务器失败，请稍后再试"
        })
      }
    });
  },
})