<template>
  <div class="serach-result">
    <van-nav-bar
      title="xxx 的搜索结果"
      left-arrow
      fixed
      @click-left="$router.back()"
    />
    <van-list
      class="article-list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item,idx) in list"
        :key="idx"
        :title="item"
      />
    </van-list>
    <!-- /文章列表 -->
  </div>
</template>

<script>
import { getSearch } from '@/api/search'
export default {
  name: 'SearchResult',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1
    }
  },

  methods: {
    // onLoad () {
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }
    //     // 加载状态结束
    //     this.loading = false
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 500)
    // },
    async onLoad () {
      const keyword = this.$route.query.keyword
      const result = await getSearch(keyword, this.page)
      this.list.push(...result.data.data.results)
      this.loading = false
      this.page++
      if (result.data.data.results.length === 0) {
        this.finished = true
      }
    }
  },
  created () {
    var keyword = this.$route.query.keyword
    alert(keyword)
  }
}
</script>

<style lang="less" scoped>
.serach-result {
  height: 100%;
  overflow: auto;
  .article-list {
    margin-top: 39px;
  }
}
</style>
