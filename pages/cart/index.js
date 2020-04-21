// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    telNumber: '',
    address: '',
    cart: {},
    allCheck: true,
    total_price: 0,
    total_num: 0
  },
  handleAddAddress() {
    wx.getSetting({
      success: (res) => {
        const scopeAddress = res.authSetting["scope.address"]
        if (scopeAddress == true || scopeAddress == undefined) {
          wx.chooseAddress({
            success: (res) => {
              const addressInfo = res
              wx.setStorageSync('address', addressInfo)
              this.getAdrress()
            }
          })
        } else {
          wx.openSetting({
            success: (res2) => {
              wx.chooseAddress({
                success: (res) => {
                  const addressInfo = res
                  wx.setStorageSync('address', addressInfo)
                  let userName = addressInfo.name
                  let telNumber = addressInfo.telNumber
                  let address = addressInfo.provinceName + addressInfo.cityName + addressInfo.countyName + addressInfo.detailInfo
                  this.setData({
                    userName,
                    telNumber,
                    address
                  })
                  console.log("data", this.data);

                }
              })
            },
          })
        }
      },
      fail: () => {},
      complete: (res) => {}
    })


  },
  getAdrress() {
    let addressInfo = wx.getStorageSync('address')
    let userName = addressInfo.userName
    let telNumber = addressInfo.telNumber
    let address = addressInfo.provinceName + addressInfo.cityName + addressInfo.countyName + addressInfo.detailInfo
    this.setData({
      userName,
      telNumber,
      address
    })
  },
  handleCheck(e) {
    let index = e.currentTarget.dataset.index
    let {
      cart
    } = this.data
    cart[index].isCheck = !cart[index].isCheck
    let allCheck = cart.findIndex(v => v.isCheck === false)
    if (allCheck === -1) {
      allCheck = true
    } else {
      allCheck = false
    }
    this.setData({
      cart,
      allCheck
    })
    console.log("ca",cart);
    
    wx.setStorageSync('cart', cart)
    let payCartList = cart.filter(v => v.isCheck === true)
    let total_price = 0
    let total_num = 0
    payCartList.forEach(v => {
      total_price += v.goods_price * v.num
      total_num += v.num
    })
    this.setData({
      total_price,
      total_num
    })


  },
  handleAllCheck() {
    let allCheck = !this.data.allCheck
    let cart = this.data.cart

    cart.forEach(v => {
      v.isCheck = allCheck
    })
    this.setData({
      cart,
      allCheck
    })
    wx.setStorageSync('cart', cart)
    let payCartList = cart.filter(v => v.isCheck === true)
    let total_price = 0
    let total_num = 0
    payCartList.forEach(v => {
      total_price += v.goods_price * v.num
      total_num += v.num
    })
    this.setData({
      total_price,
      total_num
    })

  },
  handleChangeNum(e) {
    let {
      index,
      symbol
    } = e.currentTarget.dataset
    let cart = this.data.cart
    if (symbol === -1 && cart[index].num === 1) {
      wx.showModal({
        title: "提示",
        content: "确定要删除该商品",
        success: res => {
          console.log(res);
          if (res.confirm) {
            cart.splice(index, 1)
            this.setData({
              cart
            })
            wx.setStorageSync('cart', cart)
            let payCartList = cart.filter(v => v.isCheck === true)
            let total_price = 0
            let total_num = 0
            payCartList.forEach(v => {
              total_price += v.goods_price * v.num
              total_num += v.num
            })
            this.setData({
              total_price,
              total_num
            })
          }
        }
      })
    } else {
      cart[index].num += symbol
      this.setData({
        cart
      })
    }
    wx.setStorageSync('cart', cart)
    let payCartList = cart.filter(v => v.isCheck === true)
    let total_price = 0
    let total_num = 0
    payCartList.forEach(v => {
      total_price += v.goods_price * v.num
      total_num += v.num
    })
    this.setData({
      total_price,
      total_num
    })
  },
  handleChangeRouter(){
    if(!this.data.address){
      wx.showToast({
        title: '请添加地址',
        icon:"none"
      })
      return
    }
    if(this.data.total_num===0){
      wx.showToast({
        title: '请选择商品',
        icon:"none"
      })
      return
    }
    wx.showToast({
      title: '支付成功',
    })
    setTimeout(()=>{
      let cart =this.data.cart
      cart=cart.filter(v=>v.isCheck=== false)
      this.setData({cart})
      wx.setStorageSync('cart', cart)
    },1000)
    // wx.navigateTo({
    //   url: '/pages/pay/pay',
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getAdrress()
    const cart = wx.getStorageSync('cart') || []

    this.setData({
      cart
    })
    let payCartList = cart.filter(v => v.isCheck === true)
    let total_price = 0
    let total_num = 0
    payCartList.forEach(v => {
      total_price += v.goods_price * v.num
      total_num += v.num
    })
    this.setData({
      total_price,
      total_num
    })
    console.log("total_price", total_price)
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