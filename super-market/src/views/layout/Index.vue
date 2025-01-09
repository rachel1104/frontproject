<script>
export default {
  name: 'LayoutIndex'
}
</script>

<template>
  <div id="app">
    <router-view></router-view>
    <van-tabbar route active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item to="/home" name="home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" name="category" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to="/cart" name="location" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" name="user-o" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped lang="less">
#app {
  color: red;
}
</style>
