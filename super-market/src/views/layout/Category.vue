<script>
export default {
  name: 'CategoryIndex'
}
</script>

<template>
  <div class="category">
    <van-nav-bar title="全部分类" fixed />
    <van-search
    readonly
    shape="round"
    background="#f1f1f2"
    placeholder="请输入搜索关键词"
    @click="$router.push('/search')"
    />
    <div class="list-box">
      <div class="left">
        <ul>
          <li v-for="(item,index) in list" :key="item.category_id">
            <a :class="{active: index === activeIndex }" @click="activeIndex =index" href="javascript:;">
              {{ item.name }}
            </a>
          </li>
        </ul>
      <div class="right">
        <div @click="$router.push(`/searchlist?categoryId=${item.category_id}`)" v-for="item in list[activeIndex]?.children" :key="item.category_id" class="cate-goods">
          <img :src="item.image?.external_url" alt="">
          <p>{{ item.name }}</p>

        </div>

      </div>
      </div>

    </div>
  </div>
</template>

<style scoped lang="less">

</style>
