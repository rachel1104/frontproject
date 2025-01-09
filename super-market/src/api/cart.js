import requests from '@/utils/requests'
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return requests.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}
// 获取购物车列表
export const getCartList = () => {
  return requests.get('/cart/list')
}
// 更新购物车商品数量
export const changeCount = (goodsId, goodsNum, goodsSkuId) => {
  return requests.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 删除购物车
export const delSelect = (cartIds) => {
  return requests.post('/cart/clear', {
    cartIds
  })
}
