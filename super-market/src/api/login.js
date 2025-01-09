// 存放所有登录相关的接口请求

import requests from '@/utils/requests'

// 获取图形验证码
export const getPicCode = () => {
  return requests.get('/captcha/image')
}
// 获取短信验证码
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return requests.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

// 登录接口
export const codeLogin = (mobile, smsCode) => {
  return requests.post('/passport/login', {
    form: {
      isParty: false,
      partyData: {},
      mobile,
      smsCode
    }
  }, {
    headers: { platform: 'H5' }
  })
}
