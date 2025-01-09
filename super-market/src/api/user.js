import requests from '@/utils/requests'
// 获取个人信息
export const getUserInfoDetail = () => {
  return requests.get('/user/info')
}
