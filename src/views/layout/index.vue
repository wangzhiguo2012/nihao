<template>
   <div class='container'>
    <van-nav-bar
     v-show="$route.path!='/user'"
      title="你好"
      right-text="搜索"
      fixed
       @click-right="hRearch"
    />
     <keep-alive >
    <router-view ></router-view>
     </keep-alive>
    <van-tabbar route>
      <van-tabbar-item icon="home-o"  to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="chat-o"  to="/question">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="user-o"  to="/user">我的</van-tabbar-item>
    </van-tabbar>
   </div>
</template>

<script>
export default {
  name: 'MyComponent',
  props: { },
  data () {
    return { }
  },
  methods: {
    hRearch () {
      this.$router.push('/search')
    }
  },
  computed: { },
  created () { },
  mounted () { }
}
</script>

<style scoped lang='less'></style>
