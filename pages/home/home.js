Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    elements: [{
        title: '装柜预约',
        name: 'reserve',
        color: 'cyan',
        icon: 'newsfill'
      },
      {
        title: '定位签到',
        name: 'getLocation',
        color: 'blue',
        icon: 'footprint'
      },
      {
        title: '装柜列表',
        // name: 'reserveInfo',
        color: 'red',
        icon: 'form'
      },
      {
        title: '退出登录 ',
        name: 'login',
        color: 'green',
        icon: 'exit'
      }
    ]
  },
  methods: {
    onShareAppMessage: function () {
      return {
        title: '排柜预约系统',
        desc: '新宝电器出货系统排柜预约',
        imageUrl: './shareImg.jpg'
      }
    }
  }
})