// pages/category/category.js
import {
  request
} from "../../request/index"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateList: [],
    cateTitle: [],
    cateDetail: [],
    currentIndex: 0,
    scrollTop: 0
  },
  handleItem(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      cateDetail: this.data.cateList.data[index].children,
      currentIndex: index,
      scrollTop: 0
    })

  },
  getCateList(index) {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/categories"
    }).then(res => {
      let cateTitle = res.data.message.map(item => item.cat_name)
      let cateDetail = res.data.message[0].children
      this.setData({

        cateTitle: cateTitle,
        cateDetail: cateDetail
      })
      wx.setStorageSync('cateList', {
        time: Date.now(),
        data: res.data.message
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cateList = wx.getStorageSync('cateList')
    if (!cateList) {
      this.getCateList()
    }
    let cateTitle = cateList.data.map(item => item.cat_name)
    let cateDetail = cateList.data[0].children
    this.setData({
      cateList: cateList,
      cateTitle: cateTitle,
      cateDetail: cateDetail
    })


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