<template>
  <div class="article-container">
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      title="文章详情"
    ></van-nav-bar>
    <van-loading class="article-loading" v-show="loading" />
     <div v-if="is404" class="error">
      文章不见了！
    </div>
    <div v-else class="detail">
      <h3 class="title">{{ article.title }}</h3>
      <div class="author">
        <van-image
          round
          width="1rem"
          height="1rem"
          fit="fill"
          :src="article.aut_photo"
        />
        <div class="text">
          <p class="name">{{ article.aut_name }}</p>
          <p class="time">{{ article.pubdate }}</p>
        </div>
        <van-button round size="small" type="info" @click="hSwitchFollow">{{
          article.is_followed ? "取关" : "+ 关注"
        }}</van-button>
      </div>
      <div class="content" v-html="article.contont"></div>
      <van-divider>END</van-divider>
      <div class="zan">
        <van-button
          round
          size="small"
          hairline
          type="primary"
          plain
          icon="good-job-o"
          @click="hSwitchLike"
          >{{ article.attitude ? "取消点赞" : "+ 点赞" }}</van-button
        >
        &nbsp;&nbsp;&nbsp;&nbsp;
        <van-button
          round
          size="small"
          hairline
          type="danger"
          plain
          icon="delete"
          @click="hSwitchDisLike"
          >{{ article.attitude === 0 ? "取消不喜欢" : "不喜欢" }}</van-button
        >
      </div>
    </div>
    <article-comment :articleId="$route.params.id"></article-comment>
  </div>
</template>

<script>
import { getArticle, addLike, deleteLike, addDisLike, deleteDisLike } from '../../api/article.js'
import { unFollowUser, followUser } from '../../api/user.js'
import ArticleComment from './comment'
export default {
  name: 'ArticleIndex',
  data () {
    return {
      is404: false,
      loading: false, // 控制加载中的 loading 状态
      article: {}
    }
  },
  components: {
    ArticleComment
  },
  created () {
    this.loadArticle()
  },
  methods: {
    async loadArticle () {
      try {
        const result = await getArticle(this.$route.params.id)
        this.article = result.data.data
        this.loading = false
      } catch (err) {
        this.loading = false
        if (err && err.response && err.response.status === 404) {
          this.is404 = true
        }
      }
    },
    async hSwitchFollow () {
      if (this.article.is_followed) {
        await unFollowUser(this.article.aut_id)
      } else {
        await followUser(this.article.aut_id)
      }
      this.$toast.success('操作成功')
      this.article.is_followed = !this.article.is_followed
    },
    async hSwitchLike () {
      if (this.article.attitude === 1) {
        await deleteLike(this.article.art_id.toString())
      } else {
        await addLike(this.article.art_id.toString())
      }
      this.$toast.success('操作成功')
      this.article.attitude = this.article.attitude * -1
    },
    async hSwitchDisLike () {
      if (this.article.attitude === 0) {
        await deleteDisLike(this.article.art_id.toString())
        this.article.attitude = -1
      } else {
        await addDisLike(this.article.art_id.toString())
        this.article.attitude = 0
      }
      this.$toast.success('操作成功')
    }
  }
}
</script>

<style scoped lang='less'>
.article-container {
  position: absolute;
  left: 0;
  top: 0;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
}
.article-loading {
  padding-top: 100px;
  text-align: center;
}
.error {
  padding-top: 100px;
  text-align: center;
}
.detail {
  padding: 50px 10px;
  .title {
    font-size: 16px;
  }
  .zan {
    text-align: center;
  }
  .author {
    padding: 10px 0;
    display: flex;
    .text {
      flex: 1;
      padding-left: 10px;
      line-height: 1.3;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .content {
    font-size: 14px;
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    /deep/ img {
      max-width: 100%;
      background: #f9f9f9;
    }
  }
}
</style>
