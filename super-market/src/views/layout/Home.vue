<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getHomeData } from '@/api/home'
export default {
  name: 'HomeIndex',
  components: { GoodsItem },
  data () {
    return {
      bannerList: [],
      navList: [],
      proList: []
    }
  },
  async created () {
    const { data: { pageData } } = await getHomeData()
    this.bannerList = pageData.items[1].data
    this.navList = pageData.items[3].data
    this.proList = pageData.items[6].data
    console.log(this.proList)
  }
}
</script>

<template>
  <div class="home">
    <van-nav-bar title="小卖铺" fixed />
    <van-search
      readonly
      shape="round"
      background="#f1f1f2"
      placeholder="请输入搜索关键词"
      @click="$router.push('/search')"
    />
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in bannerList" :key="item.imgUrl">
        <img :src="item.imgUrl" alt="" />
      </van-swipe-item>
    </van-swipe>
    <van-grid column-num="5" icon-size="40">
      <van-grid-item
        v-for="item in navList" :key="item.imgUrl"
        :icon="item.imgUrl"
        :text="item.text"
        @click="$router.push('/category')"
      />
    </van-grid>
    <div class="main">
      <img src="@/assets/aa1.png" alt="" />
    </div>
    <div class="guess">
      <p class="guess-title">-----猜你喜欢-----</p>
      <div class="goods-item">
        <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item"></GoodsItem>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .home {

  }
  van-swipe-item {
    width: 100%;
    height: 50px;
  }
  .main img {
    display: block;
    width: 100%;
  }
  .guess-list {
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .goods-list{
    background-color: #f6f6f6;
  }
  .guess-title {
    font-size: 14px;
    text-align: center;
    color: black;
  }
  .home {
    padding-top: 100px;
    padding-bottom: 50px;
  }
  .van-nav-bar {
    z-index: 999;
    background-color: #c21401;
    ::v-deep .van-nav-bar__title {
      color: #fff;
    }
  }
  .van-search {
    position: fixed;
    width: 100%;
    top: 46px;
    z-index: 999;
  }
  .my-swipe .van-swipe-item {
    height: 185px;
    color:#fff;
    font-size: 20px;
    text-align: center;
    background-color: #39a9ed;
  }
  .my-swipe .van-swip-item img {
    width: 100%;
    height: 185px;
  }

  .main img {
    display: block;
    width: 100%;
  }
  .guess .guess-title {
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .goods-list{
    background-color: #f6f6f6;
  }
</style>
