// pages/index/index.js
import {
  request
} from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    navList: [],
    floorList: []
  },
  getSwiperList() {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"
    }).then(res => {

      let swiperList = res.data.message
      swiperList.forEach(v => {
        v.navigator_url = v.navigator_url.replace(/\main/, "index")

      })
      this.setData({
        swiperList
      })


    })
  },
  getNavList() {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"
    }).then(res => {
      let navList = res.data.message
      navList.forEach(v => {
        if (v.navigator_url) {
          v.navigator_url = v.navigator_url.replace(/\main/, "index")
        }
      })
      this.setData({
        navList: res.data.message
      })
    })
  },
  getFloorList() {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/floordata"
    }).then(res => {

      let floorList = res.data.message
      floorList.forEach(v => {
        v.product_list.forEach(v => {
          v.navigator_url = `/pages/goods_list/index?cid=129}`
        
        })
      })
      console.log("floorList1", floorList[0].product_list[0].navigator_url)

      this.setData({
        floorList
      })
      console.log("floorList", floorList)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList()
    this.getNavList()
    this.getFloorList()

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