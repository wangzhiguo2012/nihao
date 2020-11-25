<template>
  <div>
    <van-nav-bar
      left-arrow
      title="搜索中心"
      @click-left="$router.back()"
    ></van-nav-bar>

    <van-search
      show-action
      placeholder="请输入搜索关键词"
      shape="round"
      v-model.trim="keyword"
      @input="hGetSuggestion_with_fang_dou"
    >
      <div slot="action" @click="hSearch">搜索</div>
    </van-search>
    <van-cell-group v-if="keyword">
      <van-cell
        v-for="(item, idx) in cSuggestion"
        @click="hSearchSuggestion(idx)"
        :key="idx"
        icon="search"
        ><div v-html="item"></div>
      </van-cell>
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell title="历史记录"> </van-cell>
      <van-cell
        v-for="(item, idx) in history"
        :key="idx"
        :title="item"
        @click="$router.push('/search/result?keyword=' + item)"
      >
        <van-icon name="close" @click.stop="hDelHistory(idx)" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestion } from '../../api/search.js'
import { setItem, getItem } from '@/utils/storage'
const LOCALSTROAGE_SEARCH_NAME = 'searchHistory'
export default {
  name: 'index',
  props: {},
  data () {
    return {
      timer: null,
      history: getItem(LOCALSTROAGE_SEARCH_NAME) || [],
      suggestion: [],
      keyword: ''
    }
  },
  computed: {
    cSuggestion () {
      const reg = new RegExp(this.keyword, 'gi')
      return this.suggestion.map((str) =>
        str.replace(reg, (str) => `<span style="color:red">${str}</span>`)
      )
    }
  },
  created () {},
  methods: {
    addHistory (str) {
      const idx = this.history.findIndex((it) => it === str)
      if (idx === -1) {
        this.history.splice(idx, 1)
      }
      this.history.unshift(str)
      setItem(LOCALSTROAGE_SEARCH_NAME, this.history)
    },
    hSearchSuggestion (idx) {
      this.addHistory(this.suggestion[idx])
      this.$router.push('/search/result?keyword=' + this.suggestion[idx])
    },
    hSearch () {
      if (this.keyword === '') {
        return
      }
      this.addHistory(this.keyword)
      // 方式一：最朴素的拼接的方式
      // this.$router.push('/search/result?keyword=' + this.keyword)
      // 方式二：对象格式
      this.$router.push({
        path: '/search/result',
        query: {
          keyword: this.keyword
        }
      })
    },
    hDelHistory (idx) {
      this.history.splice(idx, 1)
      setItem(LOCALSTROAGE_SEARCH_NAME, this.history)
    },
    hGetSuggestion_with_fang_dou () {
      if (!this.timer) {
        this.timer = setTimeout(async () => {
          this.timer = null

          if (this.keyword === '') {
            this.suggestion = []
            return
          }
          const result = await getSuggestion(this.keyword)
          this.suggestion = result.data.data.options
        }, 0.3 * 1000)
      }
    }
  },
  mounted () {}
}
</script>

<style scoped lang='less'></style>
