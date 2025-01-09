export default {
  // 編寫vue組件實例的配置項， 可以直接混入組件內部
  // data, methods, computed 生命周期函數
  // 如果和組件內部同名組件內部優先級比較高
  data () {
    return {
      title: 'title'
    }
  },
  methods: {
    loginConfirm () {
      if (!this.$store.getters.token) {
        this.$dialog.confirm({
          title: '温馨提示：',
          message: '需登录才能操作',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        })
          .then(() => {
            this.$router.replace({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {})
        return true
      }
      return false
    }
  }
}
