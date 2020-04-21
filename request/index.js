let ajaxTime=0
export const request=(params)=>{
  ajaxTime++
  wx.showLoading({
    title: '加载中',
  })
return new Promise((reject,resolve)=>{
  wx.request({
    ...params,
    success: (result) => {
     reject(result)
    },
    fail:(error)=>{
      resolve(error)
    },
    complete:()=>{
      ajaxTime--
      if(ajaxTime===0){
        wx.hideLoading()
      }
    }
  })
})
}