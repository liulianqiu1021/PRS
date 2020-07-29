var testData = require("../LoadingList/tempData");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
/**
 * 
 * 开始装柜页面跳转
 */
  ticketDetailPage:function(e){
    this.onClick()
    var ticketObject = e.currentTarget.dataset.itemobject
    //把触发的项目数据写进小程序数据库
    // wx.getStorageSync('LoadingObject', ticketObject)
    //页面转移
    var tempData = wx.getStorageSync('LoadingObject')  //装柜列表
    var MY=tempData.DocNo.substring(0,2)   //易损件
    if(MY=="MY"){
      wx.navigateTo({
        url: '../LoadingWear/LoadingWear',
      })
    }
    else{
    wx.navigateTo({
      url: '../LoadingDetail/LoadingDetail',
    })
    }
  },
  /**
   * 
   * 联系司机电话
   */
  callPhone:function(e){
    var LoadingObject=wx.getStorageSync('LoadingObject')
    var telephone=LoadingObject.DriverTel
    if(telephone){
      wx.makePhoneCall({
      phoneNumber: telephone,
      }).catch(() => {})
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var tempData = wx.getStorageSync('LoadingObject')
    wx.request({
      //url:app.globalData.URL +　'/api/PRSBills/GetTicketLists/',
      url:app.globalData.url+'/GetShipmentDetail',
      data:{
        PlanItemCode:tempData.PlanItemCode
      },
      method:'Post',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if(res.data.IsSuccess==false){
          wx.showModal({
            content: res.data.ErrorMsg,
          })
          return
        }
        var detail = res.data.OutPutShipmentDetail;
        wx.setStorageSync('LoadingDetail', res.data.OutPutShipmentDetail)
        that.setData({
          detailList:detail
        })
      },
      fail: (err) => {
        $Toast({
           content: "连接服务器失败，请稍后再试"
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示  获取装柜明细数据
   */
  onShow: function () { 
    var tempData = wx.getStorageSync('LoadingObject')  //装柜列表唯一码
   //请求后端，获取数据
   wx.request({
    url:app.globalData.url+'/GetCabinetDetail',
    data:{
      PlanItemCode:tempData.PlanItemCode
    },
    method:'Post',
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if(res.data.IsSuccess==false){
        wx.showModal({
          content: res.data.ErrorMsg,
        })
        return
      }
      var detail = res.data.PutCabinetDetail;
      wx.setStorageSync('CabinetDetail', res.data.PutCabinetDetail)
      // that.setData({
      //   CabinetDetail:detail
      // })
    },
    fail: (err) => {
      $Toast({
         content: "连接服务器失败，请稍后再试"
      })
    }
  });
  },

  onClick:function(){
    var tempData = wx.getStorageSync('LoadingObject')  //装柜列表
    var LoadingDetail=wx.getStorageSync('LoadingDetail')
    var MY=tempData.DocNo.substring(0,2)   //易损件
    var DocNo=LoadingDetail[0].DocNo
    var PlanCode=LoadingDetail[0].PlanCode
    if(MY=="MY"){
      wx.request({
        url:app.globalData.url+'/GetCabinetDetail',
        data:{
          DocNo:DocNo,
          PlanCode:PlanCode
        },
        method:'Post',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if(res.data.IsSuccess==false){
            wx.showModal({
              content: res.data.ErrorMsg,
            })
            return
          }
          var detail = res.data.MyDocList;
          wx.setStorageSync('LoadingWear', detail)
        },
        fail: (err) => {
          $Toast({
             content: "连接服务器失败，请稍后再试"
          })
        }
      });
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})