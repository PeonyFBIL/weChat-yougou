// pages/goods_list/goods_list.js
import {
  request
} from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 1,
        name: "综合",
        isActive: true
      },
      {
        id: 2,
        name: "销量",
        isActive: false
      },
      {
        id: 3,
        name: "价格",
        isActive: false
      }
    ],
    goodsList: []
  },
  QueryInfo: {
    query: "",
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  pageTotal: 0,
  obj: [],
  getGoodList() {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/search",
      data: this.QueryInfo
    }).then(res => {
      this.obj = res.data.message
      this.pageTotal = Math.ceil(this.obj.total / this.QueryInfo.pagesize)
      this.setData({
        goodsList: [...this.data.goodsList, ...this.obj.goods]
      })
      wx.stopPullDownRefresh()
    })
  },
  handleCurrentTab(e) {
    let currentIndex = e.detail
    let {
      tabs
    } = this.data
    tabs.forEach((v, i) => {
      i === currentIndex ? v.isActive = true : v.isActive = false
    })
    this.setData({
      tabs
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.QueryInfo.cid = options.cid

    this.getGoodList()
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
    this.setData({
      goodsList: []
    })
    this.QueryInfo.pagenum = 1
    this.getGoodList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.QueryInfo.pagenum++
    if (this.QueryInfo.pagenum >= this.pageTotal) {
      wx.showToast({
        title: '没用更多了',
      })
    } else {
      this.getGoodList()
      console.log(0)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})