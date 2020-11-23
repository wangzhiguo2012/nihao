<template>
  <div class="index">
    <van-tabs>
      <van-tab
        v-for="(item, index) in channels"
        :title="item.name"
        :key="index"
      >
        <article-list
          :channel="item"
          @showMoreAction="hShowMoreAction"
        ></article-list>
      </van-tab>
    </van-tabs>
    <van-popup v-model="showMoreAction" :style="{ width: '80%' }">
      <more-action></more-action>
    </van-popup>
  </div>
</template>

<script>
import { getChannels } from '@/api/channel.js'
import ArticleList from './articleList.vue'
import MoreAction from './moreAction.vue'
export default {
  name: 'HomeIndex',
  data () {
    return {
      showMoreAction: true,
      // 频道列表
      channels: [],
      articleId: null
    }
  },
  components: {
    ArticleList,
    MoreAction
  },
  computed: {},
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      const result = await getChannels()
      this.channels = result.data.data.channels
    },

    hShowMoreAction (articeleId) {
      this.articleId = articeleId
      this.showMoreAction = true
    }
  }
}
</script>

<style scoped lang='less'></style>
