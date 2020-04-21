// pages/goods_detail/goods_detail.js
import {
  request
} from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodDetailList: {},
    pics: [],
  },
  goodInfo: {

  },
  QueryInfo: {
    goods_id: 0
  },

  getGoodsDetailList() {
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail',
      data: this.QueryInfo
    }).then(res => {
      const goodDetailList = res.data.message
      this.goodInfo = goodDetailList
      const pics = goodDetailList.pics
      this.setData({
        goodDetailList,
        pics
      })

    })
  },
  //加入购物车
  handleAddCate() {
    let cart = wx.getStorageSync('cart') || []

    let index = cart.findIndex(v => v.goods_id === this.goodInfo.goods_id)
    if (index === -1) {
      this.goodInfo.num = 1
      this.goodInfo.isCheck = true
      cart.push(this.goodInfo)

    } else {
      cart[index].num++
    }
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '加入成功',
      icon: "success",
      mask: true
    })

  },
  //图片放大
  handleAmplification(e) {
    let current = e.currentTarget.dataset.url
    let urls = this.data.pics.map(item => item.pics_mid)

    wx.previewImage({
      current,
      urls
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryInfo.goods_id = options.goods_id
    this.getGoodsDetailList()


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