var utils = require("../../utils/util.js");
const app = getApp();
var DetailData = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttonList: [],
    imgList: [],
    picPaths: [],
    imgListView: [],
    imgListOne: [],
    picPathsOne: [],
    imgListViewOne: [],
    imgListTwo: [],
    picPathsTwo: [],
    imgListViewTwo: [],
    imgListThree: [],
    picPathsThree: [],
    imgListViewThree: [],
    imgListFour: [],
    picPathsFour: [],
    imgListViewFour: [],
    date: '2020-07-01',
    time: '12:00',
    CabinetCode: '',
    ArrivalDatePlan: '', //预计到厂时间
    OutQtyActual: '', //数量
    BoxQtyActual: '', //箱数
    BoxNumPer: '', //装箱数
    GrossWeight: '', //毛重
    NetWeight: '', //净重
    BoxLength: '', //长
    BoxWidth: '', //宽
    BoxHight: '', //高
    // Distance:'',
    Rank: '', //排位
    Unusual: '', //异常情况
    OutDate: '2020-07-01',
    OutTime: '12:00',
    state: ''
  },



  /**
   * 事件处理函数， 用户上传空柜图片
   */
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        // console.log("image", res)

        this.UpImgs(res.tempFilePaths[0], 0) //上传
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  /**
   * 事件处理函数， 用户查看图片
   */
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgListView,
      current: e.currentTarget.dataset.url
    });
  },

  /**
   * 事件处理函数， 用户修删除图片
   */
  DelImg(e) {
    wx.showModal({
      title: '图片删除',
      content: '确定要删除吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.data.picPaths.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },

  UpImgs(imgurl, index) {
    var that = this;
    wx.uploadFile({
      url: app.globalData.url + '/ImgUpload',
      filePath: imgurl,
      name: 'files',
      method: 'POST',
      header: {
        'content-type': 'multipart/form-data'
      },
      formData: null,
      success: function (res) {
        // console.log(res) //接口返回网络路径
        //var resdata = JSON.parse(res.data.replace(/\\/g,'/'))
        var pathdata = res.data
        var list = pathdata.split(",")
        var resdata = list[1].slice(8, -1)
        that.data.picPaths.push(resdata)
        //that.data.picPaths = resdata
        that.setData({
          picPaths: that.data.picPaths
        })
      }
    })
  },

  /**
   * 事件处理函数， 用户上传第一排图片
   */
  ChooseImageOne() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        // console.log("image", res)

        this.UpImgsOne(res.tempFilePaths[0], 0) //上传
        if (this.data.imgListOne.length != 0) {
          this.setData({
            imgListOne: this.data.imgListOne.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgListOne: res.tempFilePaths
          })
        }
      }
    });
  },
  /**
   * 事件处理函数， 用户查看图片
   */
  ViewImageOne(e) {
    wx.previewImage({
      urls: this.data.imgListViewOne,
      current: e.currentTarget.dataset.url
    });
  },

  /**
   * 事件处理函数， 用户修删除图片
   */
  DelImgOne(e) {
    wx.showModal({
      title: '图片删除',
      content: '确定要删除吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgListOne.splice(e.currentTarget.dataset.index, 1);
          this.data.picPathsOne.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgListOne: this.data.imgListOne
          })
        }
      }
    })
  },

  UpImgsOne(imgurl, index) {
    var that = this;
    wx.uploadFile({
      url: app.globalData.url + '/ImgUpload',
      filePath: imgurl,
      name: 'files',
      method: 'POST',
      header: {
        'content-type': 'multipart/form-data'
      },
      formData: null,
      success: function (res) {
        // console.log(res) //接口返回网络路径
        //var resdata = JSON.parse(res.data.replace(/\\/g,'/'))
        //var resdata = res.data.replace(/\\/g, '/')
        var pathdata = res.data
        var list = pathdata.split(",")
        var resdata = list[1].slice(8, -1)
        that.data.picPathsOne.push(resdata)
        //that.data.picPaths = resdata

        that.setData({
          picPathsOne: that.data.picPathsOne
        })
        //  console.log(that.data.picPaths)
      }
    })
  },
  /**
   * 事件处理函数， 用户上传半柜图片
   */
  ChooseImageTwo() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        // console.log("image", res)

        this.UpImgsTwo(res.tempFilePaths[0], 0) //上传
        if (this.data.imgListTwo.length != 0) {
          this.setData({
            imgListTwo: this.data.imgListTwo.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgListTwo: res.tempFilePaths
          })
        }
      }
    });
  },
  /**
   * 事件处理函数， 用户查看图片
   */
  ViewImageTwo(e) {
    wx.previewImage({
      urls: this.data.imgListViewTwo,
      current: e.currentTarget.dataset.url
    });
  },

  /**
   * 事件处理函数， 用户修删除图片
   */
  DelImgTwo(e) {
    wx.showModal({
      title: '图片删除',
      content: '确定要删除吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgListTwo.splice(e.currentTarget.dataset.index, 1);
          this.data.picPathsTwo.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgListTwo: this.data.imgListTwo
          })
        }
      }
    })
  },

  UpImgsTwo(imgurl, index) {
    var that = this;
    wx.uploadFile({
      url: app.globalData.url + '/ImgUpload',
      filePath: imgurl,
      name: 'files',
      method: 'POST',
      header: {
        'content-type': 'multipart/form-data'
      },
      formData: null,
      success: function (res) {
        // console.log(res) //接口返回网络路径
        //var resdata = JSON.parse(res.data.replace(/\\/g,'/'))
        //var resdata = res.data.replace(/\\/g, '/')
        var pathdata = res.data
        var list = pathdata.split(",")
        var resdata = list[1].slice(8, -1)
        that.data.picPathsTwo.push(resdata)
        //that.data.picPathsTwo = resdata

        that.setData({
          picPathsTwo: that.data.picPathsTwo
        })
        // console.log(that.data.picPaths)
      }
    })
  },
  /**
   * 事件处理函数， 用户上传满柜图片
   */
  ChooseImageThree() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        // console.log("image", res)

        this.UpImgsThree(res.tempFilePaths[0], 0) //上传
        if (this.data.imgListThree.length != 0) {
          this.setData({
            imgListThree: this.data.imgListThree.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgListThree: res.tempFilePaths
          })
        }
      }
    });
  },
  /**
   * 事件处理函数， 用户查看图片
   */
  ViewImageThree(e) {
    wx.previewImage({
      urls: this.data.imgListViewThree,
      current: e.currentTarget.dataset.url
    });
  },

  /**
   * 事件处理函数， 用户修删除图片
   */
  DelImgThree(e) {
    wx.showModal({
      title: '图片删除',
      content: '确定要删除吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgListThree.splice(e.currentTarget.dataset.index, 1);
          this.data.picPathsThree.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgListThree: this.data.imgListThree
          })
        }
      }
    })
  },

  UpImgsThree(imgurl, index) {
    var that = this;
    wx.uploadFile({
      url: app.globalData.url + '/ImgUpload',
      filePath: imgurl,
      name: 'files',
      method: 'POST',
      header: {
        'content-type': 'multipart/form-data'
      },
      formData: null,
      success: function (res) {
        // console.log(res) //接口返回网络路径
        //var resdata = JSON.parse(res.data.replace(/\\/g,'/'))
        //var resdata = res.data.replace(/\\/g, '/')
        var pathdata = res.data
        var list = pathdata.split(",")
        var resdata = list[1].slice(8, -1)
        that.data.picPathsThree.push(resdata)
        //that.data.picPathsThree = resdata

        that.setData({
          picPathsThree: that.data.picPathsThree
        })
        // console.log(that.data.picPaths)
      }
    })
  },
  /**
   * 事件处理函数， 用户上传封条图片
   */
  ChooseImageFour() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        // console.log("image", res)

        this.UpImgsFour(res.tempFilePaths[0], 0) //上传
        if (this.data.imgListFour.length != 0) {
          this.setData({
            imgListFour: this.data.imgListFour.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgListFour: res.tempFilePaths
          })
        }
      }
    });
  },
  /**
   * 事件处理函数， 用户查看图片
   */
  ViewImageFour(e) {
    wx.previewImage({
      urls: this.data.imgListViewFour,
      current: e.currentTarget.dataset.url
    });
  },

  /**
   * 事件处理函数， 用户修删除图片
   */
  DelImgFour(e) {
    wx.showModal({
      title: '图片删除',
      content: '确定要删除吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgListFour.splice(e.currentTarget.dataset.index, 1);
          this.data.picPathsFour.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgListFour: this.data.imgListFour
          })
        }
      }
    })
  },

  UpImgsFour(imgurl, index) {
    var that = this;
    wx.uploadFile({
      url: app.globalData.url + '/ImgUpload',
      filePath: imgurl,
      name: 'files',
      method: 'POST',
      header: {
        'content-type': 'multipart/form-data'
      },
      formData: null,
      success: function (res) {
        // console.log(res) //接口返回网络路径
        //var resdata = JSON.parse(res.data.replace(/\\/g,'/'))
        //var resdata = res.data.replace(/\\/g, '/')
        var pathdata = res.data
        var list = pathdata.split(",")
        var resdata = list[1].slice(8, -1)
        that.data.picPathsFour.push(resdata)
        //that.data.picPathsFour = resdata

        that.setData({
          picPathsFour: that.data.picPathsFour
        })
        //console.log(that.data.picPathsFour)
      }
    })
  },

  /**
   * 时间选择器
   */
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      OutDate: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      OutTime: e.detail.value
    })
  },

  /**
   * 事件处理函数， 用户输入字段内容
   */
  OutQtyActualInput(e) { //数量
    this.setData({
      OutQtyActual: e.detail.value
    })
  },
  CaseNumInput(e) { //箱数
    this.setData({
      BoxQtyActual: e.detail.value
    })
  },
  LoadCaseNumInput(e) { //装箱数
    this.setData({
      BoxNumPer: e.detail.value
    })
  },
  GrossWeightInput(e) { //毛重
    this.setData({
      GrossWeight: e.detail.value
    })
  },
  NetWeightInput(e) { //净重
    this.setData({
      NetWeight: e.detail.value
    })
  },
  LengthInput(e) { //长度
    this.setData({
      BoxLength: e.detail.value
    })
  },
  WidthInput(e) { //宽度
    this.setData({
      BoxWidth: e.detail.value
    })
  },
  HeigthInput(e) { //高度
    this.setData({
      BoxHight: e.detail.value
    })
  },
  //  DistanceInput(e) {  //到厂距离
  //   this.setData({
  //     Distance: e.detail.value
  //   })
  // },
  OrderNumInput(e) { //排位
    this.setData({
      Rank: e.detail.value
    })
  },
  textAreaValidate(e) { //异常情况
    this.setData({
      Unusual: e.detail.value
    })
  },

  /**
   * 同柜订单切换
   */
  ticketDetailPage: function (e) {
    var ticketObject = e.currentTarget.dataset.itemobject
    wx.setStorageSync('DocListNo', ticketObject)

    var CabinetDetail = wx.getStorageSync('CabinetDetail')
    var DocNo = ticketObject
    var PlanCode = CabinetDetail.PlanCode
    var MY = ticketObject.substring(0, 2)
    if (MY == "MY") { //切换易损件
      wx.request({
        url: app.globalData.url + '/GetCabinetDetail',
        data: {
          DocNo: DocNo,
          PlanCode: PlanCode
        },
        method: 'Post',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.IsSuccess == false) {
            wx.showModal({
              content: res.data.ErrorMsg,
            })
            return
          }
          console.log(res)
          var detail = res.data.MyDocList;
          wx.setStorageSync('LoadingWear', detail)

        },
        fail: (err) => {
          $Toast({
            content: "连接服务器失败，请稍后再试"
          })
        }
      });
      wx.navigateTo({
        url: '../LoadingWear/LoadingWear',
      })
    } else { //切换大件
      app.globalData.Flag = true
      this.onLoad()
    }
    // wx.startPullDownRefresh({
    //   complete: (res) => {

    //   },
    // })
  },

  onShow: function () {
    if (app.globalData.Flag) {
      app.globalData.Flag = false
      this.getData()
    }
  },
  //切换大件查询数据
  getData: function () {
    var DocNo = wx.getStorageSync('DocListNo')
    var CabinetDetail = wx.getStorageSync('CabinetDetail')
    //查询请求后端，获取数据
    wx.request({
      url: app.globalData.url + '/GetCabinetDetail',
      data: {
        DocNo: DocNo,
        PlanCode: CabinetDetail.PlanCode
      },
      method: 'Post',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.IsSuccess == false) {
          wx.showModal({
            content: res.data.ErrorMsg,
          })
          return
        }
        var detail = res.data.PutCabinetDetail;
        wx.setStorageSync('CabinetDetail', res.data.PutCabinetDetail)
      },
      fail: (err) => {
        $Toast({
          content: "连接服务器失败，请稍后再试"
        })
      }
    });
  },

  showModal(e) {
    var that = this
    var state = ''
    this.setData({
      state: e.currentTarget.dataset.state
    })
    if (that.data.state == "Finish") {
      if (this.data.OutQtyActual == '' || this.data.OutQtyActual == null || this.data.BoxQtyActual == '' || this.data.BoxQtyActual == null || this.data.NetWeight == '' || this.data.NetWeight == null || this.data.GrossWeight == '' || this.data.GrossWeight == null || this.data.BoxLength == '' || this.data.BoxLength == null || this.data.BoxWidth == '' || this.data.BoxWidth == null || this.data.BoxHight == '' || this.data.BoxHight == null) {
        wx.showModal({
          title: '资料欠缺',
          content: '基础资料请填写完整！',
          showCancel: false,
          success: res => {
            console.log("info filled")
          }
        })
      } else {
        wx.showModal({
          title: '提交确认',
          content: '确认提交？',
          showCancel: true,
          success: res => {
            if (res.confirm) {
              // this.setData({
              //   state: e.currentTarget.dataset.state
              // })
              this.formSubmit();
            }
          }
        })

      }
    } else {
      wx.showModal({
        title: '提交确认',
        content: '确认提交？',
        showCancel: true,
        success: res => {
          if (res.confirm) {
            this.formSubmit();
          }
        }
      })
    }
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    // var date=new Date()
    // var dateFormated = utils.formatTime(date)
    var tempData = wx.getStorageSync('LoadingObject') //装柜列表

    if (app.globalData.Flag) {
      app.globalData.Flag = false
      this.getData()
    }
    var CabinetData = wx.getStorageSync('CabinetDetail')

    if (CabinetData.ArrivalDateActual != null) {
      var datelist = CabinetData.ArrivalDateActual.split(" ") //截取离厂日期
    }
    //图片处理
    var pic1 = ""
    if (CabinetData.Pic1 != "" && CabinetData.Pic1 != null) {
      pic1 = CabinetData.Pic1
      pic1 = pic1.split('|')
    }
    var pic2 = ""
    if (CabinetData.Pic2 != "" && CabinetData.Pic2 != null) {
      pic2 = CabinetData.Pic2
      pic2 = pic2.split('|')
    }
    var pic3 = ""
    if (CabinetData.Pic3 != "" && CabinetData.Pic3 != null) {
      pic3 = CabinetData.Pic3
      pic3 = pic3.split('|')
    }
    var pic4 = ""
    if (CabinetData.Pic4 != "" && CabinetData.Pic4 != null) {
      pic4 = CabinetData.Pic4
      pic4 = pic4.split('|')
    }
    var pic5 = ""
    if (CabinetData.Pic5 != "" && CabinetData.Pic5 != null) {
      pic5 = CabinetData.Pic5
      pic5 = pic5.split('|')
    }

    //同柜订单处理
    var DocList = []
    var DocCodeList = []
    if (CabinetData.DocNoList) {
      DocList = CabinetData.DocNoList.split(";")
      for (var i = 0; i < DocList.length - 1; i++) {
        var Doc = []
        Doc = DocList[i].split(":")
        DocCodeList.push(Doc[0])
      }
    }


    that.setData({
      buttonList: DocCodeList, //同柜订单数组
      DocNo: CabinetData.DocNo,
      DocNoList: CabinetData.DocNoList,
      OutQtyActual: CabinetData.OutQtyActual,
      BoxQtyActual: CabinetData.BoxQtyActual,
      BoxNumPer: CabinetData.BoxNumPer,
      GrossWeight: CabinetData.GrossWeight,
      NetWeight: CabinetData.NetWeight,
      BoxLength: CabinetData.BoxLength,
      BoxWidth: CabinetData.BoxWidth,
      BoxHight: CabinetData.BoxHight,
      Rank: CabinetData.Rank,
      Unusual: CabinetData.Unusual,
      ArrivalDatePlan: CabinetData.ArrivalDatePlan,
      OutQtyPlan: CabinetData.OutQtyPlan,
      BoxQty: CabinetData.BoxQty,
      LeaveDateTime: CabinetData.LeaveDateTime,

      imgListView: pic1,
      imgListViewOne: pic2,
      imgListViewTwo: pic3,
      imgListViewThree: pic4,
      imgListViewFour: pic5
    })
  },

  /**
   * 事件处理函数， 报单提交
   */
  formSubmit: function (e) {

    var that = this
    var date = new Date()
    var closeTime = utils.formatTime(date)
    var tempData = wx.getStorageSync('LoadingObject')
    var dataObject = wx.getStorageSync('CabinetDetail')
    //空柜图片
    var img = []
    if (dataObject.Pic1) {
      img = dataObject.Pic1.split('|')
    }
    for (var i = 0; i < this.data.picPaths.length; i++) {
      img.push(this.data.picPaths[i])
    }
    //第一排图片
    var imgone = []
    if (dataObject.Pic2) {
      imgone = dataObject.Pic2.split('|')
    }
    for (var i = 0; i < this.data.picPathsOne.length; i++) {
      imgone.push(this.data.picPathsOne[i])
    }
    //半柜图片
    var imgtwo = []
    if (dataObject.Pic3) {
      imgtwo = dataObject.Pic3.split('|')
    }
    for (var i = 0; i < this.data.picPathsTwo.length; i++) {
      imgtwo.push(this.data.picPathsTwo[i])
    }
    //满柜图片
    var imgthree = []
    if (dataObject.Pic4) {
      imgthree = dataObject.Pic4.split('|')
    }
    for (var i = 0; i < this.data.picPathsThree.length; i++) {
      imgthree.push(this.data.picPathsThree[i])
    }
    //封条图片
    var imgfour = []
    if (dataObject.Pic5) {
      imgfour = dataObject.Pic5.split('|')
    }
    for (var i = 0; i < this.data.picPathsFour.length; i++) {
      imgfour.push(this.data.picPathsFour[i])
    }
    if (this.data.Rank == null) {
      this.data.Rank = ""
    }
    if (!this.data.GrossWeight) {
      this.data.GrossWeight = "0"
    }
    if (!this.data.NetWeight) {
      this.data.NetWeight = "0"
    }
    if (!this.data.BoxLength) {
      this.data.BoxLength = "0"
    }
    if (!this.data.BoxWidth) {
      this.data.BoxWidth = "0"
    }
    if (!this.data.BoxHight) {
      this.data.BoxHight = "0"
    }
    dataObject.PlanItemCode = tempData.PlanItemCode
    dataObject.OutQtyActual = this.data.OutQtyActual
    dataObject.BoxQtyActual = this.data.BoxQtyActual
    dataObject.GrossWeight = this.data.GrossWeight
    dataObject.NetWeight = this.data.NetWeight
    dataObject.BoxLength = this.data.BoxLength
    dataObject.BoxWidth = this.data.BoxWidth
    dataObject.BoxHight = this.data.BoxHight
    dataObject.Rank = this.data.Rank
    dataObject.Unusual = this.data.Unusual
    dataObject.Pic1 = img.toString()
    dataObject.Pic2 = imgone.toString()
    dataObject.Pic3 = imgtwo.toString()
    dataObject.Pic4 = imgthree.toString()
    dataObject.Pic5 = imgfour.toString()

    var submitvalue = that.data.state
    if (submitvalue == "Post") {
      //发送后端服务器
      wx.request({
        url: app.globalData.url + '/SubmitCabinetDetail',
        data: dataObject,
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        dataType: 'JSON',
        success(res) {
          //返回主页      
          if (JSON.parse(res.data).IsSuccess) {
            console.log("success")
            wx.showToast({
              title: '提交成功',
            })

          } else {
            wx.showModal({
              content: res.data.ErrorMsg,
            })
            console.log(JSON.parse(res.data).ErrorMsg)
          }
        },
        fail() {
          utils.connectionFailed()
        },
        complete() {
          // wx.reLaunch({
          //   url: '../home/home',
          // })
          // console.log('complete');
        }
      })
    } else {
      //发送后端服务器
      wx.request({
        url: app.globalData.url + '/SubmitLeaveDate',
        data: {
          PlanCode: dataObject.PlanCode,
          DocNo: dataObject.DocNo
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        dataType: 'JSON',
        success(res) {
          //返回主页 
          //  console.log(res)     
          if (JSON.parse(res.data).IsSuccess) {
            console.log("success")
            wx.showToast({
              title: '已离场',
            })

          } else {
            console.log(JSON.parse(res.data).ErrorMsg)
            wx.showModal({
              content: res.data.ErrorMsg,
            })
          }
        },
        fail() {
          utils.connectionFailed()
        },
        complete() {
          // wx.reLaunch({
          //   url: '../home/home',
          // })
          // console.log('complete');
        }
      })
    }
    // console.log(JSON.stringify(dataObject))
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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