import requests from '@/utils/requests'

// 获取图形验证码
export const getHomeData = () => {
  return requests.get('/page/detail', {
    params: {
      pageId: 0
    }
  })
}
