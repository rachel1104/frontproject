import requests from '@/utils/requests'

// 订单结算确认
export const checkOrder = (mode, obj) => {
  return requests.get('/checkout/order', {
    params: {
      mode,
      delivery: 10,
      shopId: 0,
      couponId: 0,
      isUsePoint: 0,
      ...obj
    }
  })
}

// 提交訂單
export const submitOrder = (mode, obj) => {
  return requests.post('/checkout/submit', {
    mode,
    delivery: 10,
    couponId: 0,
    isUsePoints: 0,
    payType: 10,
    ...obj
  })
}
// 订单列表
export const getMyOrderList = (dataType, page) => {
  return requests.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
