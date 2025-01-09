<script>
import { getHistoryList, setHistoryList } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  data () {
    return {
      history: getHistoryList(),
      search: ''
    }
  },
  methods: {
    goSearch (key) {
      if (this.search.trim() === '') {
        this.$toast('请输入关键字')
        return
      }
      const index = this.history.indexOf(key)
      if (index !== -1) {
        this.history.splice(index, 1)
      }
      this.history.unshift(key)
      setHistoryList(this.history)
      this.$router.push(`/searchlist?search=${key}`)
    },
    clear () {
      this.history = []
      setHistoryList([])
    }
  }
}
</script>

<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)"/>
      <van-search v-model.trim="search" show-action placement="请输入关键词" clearable>
        <template #action>
          <div @click="goSearch(search)">搜索</div>
        </template>
      </van-search>
    <div class="search-history" v-if="history.length > 0">
      <div class="title">
        <span>最近搜索</span>
        <van-icon @click="clear" name="delete" size="16"/>
      </div>
      <div class="list">
        <div v-for="item in history" :key="item" class="list-item" @click="goSearch(item)">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  ::v-deep .van-nav-bar {
    background-color: #c21401;
    color: #fff;
    padding: 0 10px;
    border-radius: 0 0px 0px 0;
    //margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }

  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30px;
    text-align: center;
    //padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-overflow: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
