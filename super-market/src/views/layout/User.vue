<script>
import { getUserInfoDetail } from '@/api/user'

export default {
  name: 'UserIndex',
  data () {
    return {
      detail: {}
    }
  },
  created () {
    if (this.isLogin) {
      this.getUserInfoDetail()
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters.token
    }
  },
  methods: {
    async getUserInfoDetail () {
      const { data: { userInfo } } = await getUserInfoDetail()
      this.detail = userInfo
    },
    logout () {
      this.$dialog.confirm({
        title: '温馨提示',
        message: '您确认要退出吗？'
      }).then(async () => {
        this.$store.dispatch('user/logout')
      }).catch(() => {})
    }
  }
}
</script>

<template>
  <div id="app">
    <div class="logout-btn">
      <button @click="logout">退出登录</button>
    </div>
  </div>
</template>

<style scoped lang="less">
.logout-btn {
  witdh:80px;
  text-align: center;
  margin: 20px;
  color: black;
}
</style>
