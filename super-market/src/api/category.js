import requests from '@/utils/requests'
export const getCategoryData = () => {
  return requests.get('/category/list')
}
