<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleSub () {
      if (this.value <= 1) {
        return
      }
      this.$emit('input', this.value - 1)
    },
    handleAdd () {
      this.$emit('input', this.value + 1)
    },
    handleChange (e) {
      const num = +e.target.value
      if (isNaN(num) || num < 1) {
        e.target.value = this.value
        return
      }
      this.$emit('input', num)
    }
  }
}
</script>

<template>
  <div class="count-box">
    <button @click="handleSub" class="minus" style="width:30px"> - </button>
    <input @change="handleChange" :value="value" class="inp" type="text">
    <button @click="handleAdd" class="add" style="width:30px"> + </button>
  </div>
</template>

<style scoped lang="less">
.count-box {
  width: 110px;
  display: flex;
  .add .minus {
    width: 40px;
    height: 30px;
    outline: none;
    border: none;
    background-color: #efefef;
  }
  .inp {
    width:40px;
    height:30px;
    outline: none;
    border: none;
    margin: 0 5px;
    background-color: #efefef;
    text-align: center;
  }
}
</style>
