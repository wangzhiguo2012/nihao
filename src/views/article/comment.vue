<template>
  <div class="article-comments">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, idx) in list" :key="idx">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d" slot="title">{{ item.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636">{{ item.content }}</p>
          <p>
            <span style="margin-right: 10px">{{
              item.pubdate | relativeTime
            }}</span>
            <van-button size="mini" type="default">回复</van-button>
          </p>
        </div>
        <van-icon
          slot="right-icon"
          :name="item.is_liking ? 'like' : 'like-o'"
          @click="hSwitchLike(item)"
        />
      </van-cell>
    </van-list>
    <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容" v-model.trim="content">
        <van-button slot="button" size="mini" type="info" @click="hAddComment"
          >发布</van-button
        >
      </van-field>
    </van-cell-group>
    <van-popup
      v-model="isReplyShow"
      round
      position="bottom"
      :style="{ height: '85%' }"
    >
      <comment-reply
        v-if="isReplyShow"
        :comment="currentComment"
        :articleId="articleId"
        @close="isReplyShow = false"
      ></comment-reply>
    </van-popup>
  </div>
</template>

<script>
import CommentReply from './commentReply'
import {
  addComment,
  getComments,
  addCommentLike,
  deleteCommentLike
} from '../../api/comment.js'
export default {
  name: 'ArticleComment',
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isReplyShow: true,
      offset: null,
      content: '',
      list: [],
      loading: false,
      finished: false,
      currentComment: {}
    }
  },
  components: {
    CommentReply
  },
  methods: {
    async onLoad () {
      const result = await getComments({
        type: 'a',
        source: this.articleId,
        offset: this.offset
      })
      this.list.push(...result.data.data.results)
      this.loading = false
      if (result.data.data.results.length === 0) {
        this.finished = true
      }
      this.offset = result.data.data.last_id
    },
    async hAddComment () {
      if (this.content === '') {
        return
      }
      const result = await addComment({
        target: this.articleId,
        content: this.content
      })
      this.list.unshift(result.data.data.new_obj)
      this.content = ''
    },
    async hSwitchLike (comment) {
      const commentId = comment.com_id.toString()
      if (comment.is_liking) {
        await deleteCommentLike(commentId)
      } else {
        await addCommentLike(commentId)
      }
      this.$toast.success('操作成功')
      comment.is_liking = !comment.is_liking
    },
    hShowReply (item) {
      this.isReplyShow = true
      this.currentComment = item
    }
  }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
.van-list {
  margin-bottom: 45px;
}
</style>
