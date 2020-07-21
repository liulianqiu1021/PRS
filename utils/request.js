function wxRequest(url, data, onSuccess) {
  wx.request({
    url: url,
    method: 'POST',
    data: data,
    header: {
      'content-type': 'application/json'
      // 'auth': wx.getStorageSync('token')
    },
    dataType: 'json',
    success: (res) => {
      //未携带有效token
      if (res.statusCode == 401) {
        $Toast({
          content: "登录信息过期，请重新登录",
          success: () => {
            wx.reLaunch({
              url: '/pages/login/login'
            })
          }
        })
      }
      onSuccess(res);
    },
    fail: (err) => {
      $Toast({
        content: "连接服务器失败，请稍后再试"
      })
    }
  })
}

module.exports = {
  wxRequest: wxRequest
}