<template>
  <div class="login">
    <van-nav-bar
      title="你好"
    />
    <van-form>
      <van-field
        v-model="userInfo.mobile"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="userInfo.code"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div class="btn-wrap">
        <van-button type="info" class="btn" @click="hLogin">登陆</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { userLogin, userGetInfo } from '../../api/user.js'

export default {
  name: 'Login',
  props: {},
  data () {
    return {
      userInfo: {
        mobile: '13912345678',
        code: '246810'
      }
    }
  },
  computed: {},
  created () {
    userGetInfo()
  },
  methods: {
    async hLogin () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner'
      })
      const { mobile, code } = this.userInfo
      try {
        const result = await userLogin(mobile, code)
        this.$toast.success('登陆成功')
        this.$store.commit('mSetTokenInfo', result.data.data)
      } catch (err) {
        this.$toast.fail('登陆失败')
      }
    }
  },
  mounted () {}
}
</script>

<style lang="less" scoped>
.login {
  // 让登陆按钮居中
  .btn-wrap {
    padding: 20px;
    .btn {
      width: 100%;
      background-color: #6db4fb;
      color: #fff;
    }
  }
}
</style>
