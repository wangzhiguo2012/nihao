<template>
  <div class="index">
    <van-tabs v-model="activeIndex">
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
     <div class="bar-btn" @click="showChannelEdit=true">
        <van-icon name="wap-nav" size="24" />
    </div>
    <van-popup v-model="showMoreAction" :style="{ width: '80%' }">
      <more-action  @dislike="hDislike"  ref="refMoreAction" @report="hReport"></more-action>
    </van-popup>
      <van-action-sheet v-model="showChannelEdit" title="频道管理">
      <channel-edit :channels="channels"  @close="hCloseChannelEdit()"
     @updateCurChannel="hUpdateCurChannel" @updateCurIndex="hUpdateCurIndex" :activeIndex="activeIndex"></channel-edit>
    </van-action-sheet>
  </div>
</template>

<script>
import { getChannels } from '@/api/channel.js'
import ArticleList from './articleList.vue'
import MoreAction from './moreAction.vue'
import { dislikeArticle, reportArticle } from '../../api/article.js'
import channelEdit from './channelEdit'
export default {
  name: 'HomeIndex',
  data () {
    return {
      showMoreAction: false,
      showChannelEdit: true,
      // 频道列表
      channels: [],
      articleId: null,
      activeIndex: 0
    }
  },
  components: {
    ArticleList,
    MoreAction,
    channelEdit
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
      if (this.$refs.refMoreAction) {
        this.$refs.refMoreAction && (this.$refs.refMoreAction.isReport = false)
      }
    },
    delArticle () {
      const eventObj = {
        articleId: this.articleId,
        channelId: this.channels[this.activeIndex].id
      }
      this.$eventBus.$emit('delArticle', eventObj)
    },
    async hDislike () {
      const result = await dislikeArticle(this.articleId)
      this.$toast.success('操作成功')
      this.showMoreAction = false
      this.delArticle()
    },
    async hReport (reportTypeId) {
      // 1. 调用接口
      const result = await reportArticle(this.articleId, reportTypeId)
      this.$toast.success('操作成功')
      this.showMoreAction = false
      this.delArticle()
    },
    hCloseChannelEdit () {
      this.showChannelEdit = false
    },
    hUpdateCurChannel (channel) {
      const idx = this.channels.findIndex(it => it.id === channel.id)
      this.activeIndex = idx
    },
    hUpdateCurIndex (index) {
      this.activeIndex = index
    }
  }
}
</script>

<style scoped lang='less'></style>
