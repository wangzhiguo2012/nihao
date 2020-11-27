<template>
<div class="article-comments">
    <van-nav-bar :title="comment.reply_count + '条回复'">
      <van-icon @click="$emit('close')" slot="left" name="cross" />
    </van-nav-bar>
    <van-cell title="当前评论">
      <van-image
        slot="icon"
        round
        width="30"
        height="30"
        style="margin-right: 10px;"
        :src="comment.aut_photo"
      />
      <span style="color: #466b9d;" slot="title">{{comment.aut_name}}</span>
      <div slot="label">
        <p style="color: #363636;">{{comment.aut_name}}</p>
        <p>
          <span style="margin-right: 10px;">{{comment.pubdate | relativeTime}}</span>
          <van-button
            size="mini"
            type="default"
             @click="hAddReply"
          >回复 {{comment.reply_count}}</van-button>
        </p>
      </div>
      <van-icon slot="right-icon" />
    </van-cell>
    <van-divider>全部回复</van-divider>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
     >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
      >
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px;"
          :src="comment.aut_photo"
        />
        <span style="color: #466b9d;" slot="title">{{comment.aut_name}}</span>
        <div slot="label">
          <p style="color: #363636;">{{comment.content}}</p>
          <p>
            <span style="margin-right: 10px;">{{comment.pubdate | relativeTime}}</span>
          </p>
        </div>
      </van-cell>
    </van-list>
    <van-cell-group class="publish-wrap">
      <van-field
        clearable
        placeholder="请输入回复内容"
         v-model.trim="content"
      >
        <van-button
          slot="button"
          size="mini"
          type="info"
          @click="hAddReply"
        >发布回复</van-button>
      </van-field>
    </van-cell-group>
</div>

</template>
<script>
import { getComments, addComment } from '@/api/comment.js'
export default {
  name: 'CommentReply',
  data () {
    return {
      content: '',
      offset: null,
      list: [],
      loading: false,
      finished: false
    }
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: String,
      required: true
    }
  },
  methods: {
    async onLoad () {
      const result = await getComments({
        type: 'c',
        source: this.comment.com_id.toString(),
        offset: this.offset
      })
      this.list.push(...result.data.data.results)
      this.loading = false
      if (result.data.data.results.length === 0) {
        this.finished = true
      }
      this.offset = result.data.data.last_id
    },
    async hAddReply () {
      if (this.content === '') {
        return
      }
      const result = await addComment({
        target: this.comment.com_id.toString(),
        content: this.content,
        art_id: this.articleId
      })
      this.list.unshift(result.data.data.new_obj)
      this.comment.reply_count++
      this.$toast.success('回复成功')
      this.content = ''
    }

  }
}
</script>
<style lang="less" scoped>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
// 给发表评论区空出地方
.van-list {
  margin-bottom: 45px;
}
</style>
