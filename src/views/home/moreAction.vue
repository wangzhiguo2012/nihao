<template>
  <div class="more-action">
    <van-cell-group v-if="!isReport">
      <van-cell @click="$emit('dislike')">不感兴趣</van-cell>
      <van-cell is-link @click="isReport=true">反馈垃圾内容</van-cell>
      <van-cell>拉黑作者</van-cell>
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="isReport=false">返回</van-cell>
      <van-cell v-for='item in list' :key="item.value" @click="$emit('report',item.value)">{{item.label}}</van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import reportTypeList from '../../constant/reports.js'
export default {
  data () {
    return {
      list: reportTypeList,
      isReport: false
    }
  }
}
</script>

<style lang='less' scoped>
.more-action {
  border-radius: 4px;
}
</style>
