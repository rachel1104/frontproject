<script>
import { getAddressList } from '@/api/address'
import { checkOrder } from '@/api/order'

export default {
  name: 'PayIndex',
  data () {
    return {
      addressList: [],
      order: {},
      personal: {},
      remark: ''
    }
  },
  computed: {
    selectedAddress () {
      return this.addressList[0] || {}
    },
    longAddress () {
      const region = this.selectedAddress.region
      return region.province + region.city + region.region + this.selectedAddress.detail
    },
    mode () {
      return this.$route.query.mode
    },
    cartIds () {
      return this.$route.query.cartIds
    },
    goodsId () {
      return this.$route.query.goodsId
    },
    goodsSkuId () {
      return this.$route.query.goodsSkuId
    },
    goodsNum () {
      return this.$route.query.goodsNum
    }
  },
  created () {
    this.getAddressList()
    this.getOrderList()
  },
  methods: {
    async submitOrder () {
      if (this.mode === 'cart') {
        await this.submitOrder(this.mode, {
          cartIds: this.cartIds,
          remark: this.remark
        })
      }
      if (this.mode === 'buyNow') {
        await this.submitOrder(this.mode, {
          goodsIds: this.goodsId,
          goodsSkuId: this.goodsSkuId,
          goodNum: this.goodsNum,
          remark: this.remark
        })
      }
      this.$toast.success('支付成功')
      this.$router.replace('/myorder')
    },
    async getAddressList () {
      const { data: { list } } = await getAddressList()
      console.log(list)
      // this.addressList = list
      // console.log('vvv', this.addressList)
    },
    async getOrderList () {
      // 购物车购买
      if (this.mode === 'cart') {
        const { data: { order, personal } } = await checkOrder(this.mode, {
          cartIds: this.cartIds
        })
        this.order = order
        this.personal = personal
      }
      // 立刻购买
      if (this.mode === 'buyNow') {
        const { data: { order, personal } } = await checkOrder(this.mode, {
          goodsId: this.goodsId,
          goodsSkuId: this.goodsSkuId,
          goodsNum: this.goodsNum
        })
        this.order = order
        this.personal = personal
      }
    }
  }
}
</script>

<template>
  <div class="pay">
    <van-nav-bar fixed title="订单结算台" left-arrow/>
    <div class="left-icon">
      <van-icon name="logistics"/>
    </div>
    <div class="info">
      <div class="info-content">
        <span class="name">张三</span>
        <span class="mobile">15011111111</span>
      </div>
      <div class="info-adress">
        上海市徐汇区漕河泾
      </div>
      <div class="right-icon">
        <van-icon name="arraw"/>
      </div>
    </div>
    <hr>
    <div class="pay-list" v-if="order.goodsList">
      <div class="list">
        <div class="goods-item" v-for="item in order.goodsList" :key="item.goods_id">
          <div class="left">
            <img :src="item.goods_image" alt="">
          </div>
          <div class="right">
            <p class="tit text-ellipsis-2">
              {{ item.goods_name }}
            </p>
            <p class="info">
              <span class="count">x{{ item.total_num }}</span>
              <span class="price">￥{{ item.total_pay_price }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="flow-num-box">
        <span>共{{ order.orderTotalNums }}件商品，合计：</span>
        <span class="money">￥{{ order.orderTotalPrice }}</span>
      </div>
      <div class="pay-detail">
        <div class="pay-cell">
          <span>订单总金额：</span>
          <span class="red">￥{{ order.orderTotalPrice }}</span>
        </div>
        <div class="pay-cell">
          <span>优惠券：</span>
          <span>无优惠券可用</span>
        </div>
        <div class="pay-cell">
          <span>配送费用：</span>
          <span v-if="!selectedAddress">请先选择配送地址</span>
          <span v-else class="red">+￥0.00</span>
        </div>
      </div>
      <div class="pay-way">
        <span class="tit">支付方式</span>
        <div class="pay-cell">
          <span><van-icon name="balance-o"/>余额支付（可用￥{{ personal.balance }}元）</span>
          <span class="red"><van-icon name="passed"/></span>
        </div>
      </div>
      <div class="buytips">
        <textarea v-model="remark" placeholder="选填:买家留言（50字以内）" name="" id="" cols="30" rows="10"></textarea>
      </div>
    </div>
    <div class="foot-fixed">
      <div class="left">实付款：<span>￥{{ order.orderTotalPrice }}</span></div>
      <div class="tipsbtn" @click="submitOrder">提交订单</div>
    </div>
  </div>
</template>

<style scoped lang="less">
.pay {
  padding-top: 46px;
  padding-bottom: 100px;
  background-color: #f5f5f5;
  min-height: 100vh;
  .left-icon {
    width: 30px;
    height: 30px;
    align-content: center;
    padding: 10px;
    justify-content: center;
  }
  .info-content, .info-adress {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;
    span {
      color: black;
    }
  }
  span {
    color: black;
  }

  .tipsbtn {
    width: 80px;
    background: linear-gradient(90deg, #f9211c, #ff6335);
    color: #fff;
    text-align: center;
    line-height: 30px;
    border-radius: 20%;
    display: block;
    font-size: 14px;
  }
}
</style>
