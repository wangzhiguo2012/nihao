<template>
  <div class="scroll-wrapper">
    <van-pull-refresh v-model="isLoadingNew" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="(item, idx) in list" :key="idx" :title="item.title" @click="$router.push('/article/' + item.art_id.toString())">
          <div slot="label">
            <van-grid :column-num="item.cover.images.length">
              <van-grid-item v-for="(img, idx) in item.cover.images" :key="idx">
                <van-image lazy-load :src="img" />
              </van-grid-item>
            </van-grid>

            <!-- 文字说明 -->
            <div class="meta">
              <span>{{ item.aut_name }}</span>
              <span>{{ item.comm_count }}评论</span>
              <span>{{ item.pubdate | relativeTime }}</span>
              <span class="close" @click="hClose(item)" v-if="$store.state.tokenInfo.token">
                <van-icon name="cross"></van-icon>
              </span>
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '../../api/article.js'
export default {
  name: 'ArticleList',
  props: ['channel'],
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      count: 0,
      isLoading: false,
      isLoadingNew: false
    }
  },
  methods: {
    async onLoad () {
      if (!this.timestamp) {
        this.timestamp = Date.now()
      }
      const result = await getArticles(this.channel.id, Date.now())
      const arr = result.data.data.results
      this.timestamp = result.data.data.pre_timestamp
      this.list = this.list.concat(arr)
      this.loading = false
      if (arr.length === 0) {
        this.finished = true
      }
    },
    async onRefresh () {
      const result = await getArticles(this.channel.id, Date.now())
      const arr = result.data.data.results
      this.list.unshift(...arr)
      this.isLoadingNew = false
      this.$toast.success('加载成功' + arr.length + '条')
    },
    hClose (article) {
      this.$emit('showMoreAction', article.art_id.toString())
    }
  },
  computed: {},
  created () {
    this.$eventBus.$on('delArticle', obj => {
      const { channelId, articleId } = obj
      if (channelId !== this.channel.id) {
        return
      }
      const idx = this.list.findIndex(it => it.art_id.toString() === articleId)
      if (idx !== -1) {
        this.list.splice(idx, 1)
      }
    })
  },
  mounted () {}
}
</script>
<style scoped lang='less'>
.meta {
  display:flex;
  span {
    margin-right:10px;
  }
  .close{
    margin-left:auto;
  }
}
</style>
