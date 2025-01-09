import requests from '@/utils/requests'
export const getProdList = (obj) => {
  const { categoryId, goodsName, page } = obj
  return requests.get('/goods/list', {
    params: {
      categoryId,
      goodsName,
      page
    }
  })
}

// 获取详情页数据
export const getProductDetail = (goodsId) => {
  return requests.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}

// 获取商品评价
export const getProComments = (goodsId, limit) => {
  return requests.get('/comment/listRows', {
    params: {
      goodsId,
      limit
    }
  })
}
