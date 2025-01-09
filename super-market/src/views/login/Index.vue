<script>
import { codeLogin, getMsgCode, getPicCode } from '@/api/login'
export default {
  name: 'LoginIndex',
  data () {
    return {
      picCode: '', // 用户输入的图形验证码
      picKey: '', // 请求传递的图形验证码唯一标识
      picUrl: '',
      totalSecond: 60, // 总秒数
      second: 60, // 当前秒
      timer: null,
      mobile: '',
      msgCode: '' // 短信验证码
    }
  },
  methods: {
    async getPicCode () {
      const {
        data: {
          base64,
          key
        }
      } = await getPicCode()
      this.picUrl = base64 // 存储地址
      this.key = key // 存储key
      // Toast('获取图形验证码成功')
      // this.$toast.success('成功')
    },
    // 获取短信验证码
    async getCode () {
      if (!this.validFn()) {
        return
      }
      // 当前没有开定时器，且totalSecond 和second一致时才可以倒计时
      if (!this.timer && this.second === this.totalSecond) {
        // 发送请求
        await getMsgCode(this.picCode, this.picKey, this.mobile)
        this.$toast('短信发送成功，请注意查收')

        // 点击按钮开启倒计时
        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)
      }
    },
    // 校验手机号和图形验证码是否合法
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的验证码')
        return false
      }
      return true
    },
    // 登录
    async login () {
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的手机验证码')
        return
      }
      const res = await codeLogin(this.mobile, this.msgCode)
      this.$store.commit('user/setUserInfo', res.data)
      this.$toast('登录成功！')
      // 成功登录后打开首页
      const url = this.$router.query.backUrl || '/'
      await this.$router.replace({ path: url })
    }
  },
  async created () {
    await this.getPicCode()
  },
  // 离开页面清除定时器
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<template>
  <div>
    <van-nav-bar
      title="会员登录"
      right-text="按钮"
      left-arrow
    />
    <div class="container">
      <div class="title">
        <h3>手机登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>
      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img @click="getPicCode" :src="picUrl" alt="">
        </div>
        <div class="form-item">
          <input v-model="msgCode" class="inp" placeholder="请输入验证码" type="text">
          <button @click="getCode">
            {{ second === totalSecond ? '获取验证码' : second + '秒后重新发送' }}
          </button>
        </div>
      </div>
      <div @click="login" class="login-btn">登录</div>

    </div>
  </div>
</template>

<style scoped lang="less">
  .container {
    padding: 49px 29px;
  }
  .title {
    margin-bottom: 20px;
  }
  h3 {
    font-size: 26px;
    font-weight: normal;
    text-align: center;
  }
  p {
    line-height: 40px;
    font-size: 14px;
    color: #b8b8b8;
    text-align: center;
  }
  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding:8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp{
      display: block;
      border:none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex:1;
    }
    img{
      width:94px;
      height:31px;
    }
    button{
      height: 31px;
      border:none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }
  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,0.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
