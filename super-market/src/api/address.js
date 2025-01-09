import requests from '@/utils/requests'

// 获取地址列表
export const getAddressList = () => {
  return requests.get('/address/list')
}
