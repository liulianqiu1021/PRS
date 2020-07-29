const app = getApp();
var utils = require("../../utils/util.js")
var testData = require("../LoadingList/tempData")

Page({

  /**
  * 页面的初始数据
  */
  data: {

  },



  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    
    //用户单据获取数据
    var LoadingWear=wx.getStorageSync('LoadingWear')
    this.setData({
      LoadingWear:LoadingWear
    })
 
  },
})