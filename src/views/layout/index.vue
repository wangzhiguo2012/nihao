<template>
   <div class='container'>
    <van-nav-bar
      title="你好"
      right-text="搜索"
      left-arrow
      @click-right="onClickRight"
    />
    <router-view></router-view>
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
  computed: { },
  created () { },
  mounted () { }
}
</script>

<style scoped lang='less'></style>
