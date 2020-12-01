<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="编辑资料"></van-nav-bar>
    <van-cell-group>
      <van-cell is-link title="头像"  @click="hShowImage" center>
        <van-image
          slot="default"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          round
          :src="user.photo"
        />
      </van-cell>
       <input type="file" hidden @change="hPhotoChange" ref="refPhoto" />
      <van-cell is-link title="名称" :value="user.name" @click="showName=true"/>
      <van-cell is-link title="性别" :value="user.gender === 1?'男':'女'" @click="showGender=true"/>
      <van-cell is-link title="生日" :value="user.birthday" @click="showBirthday=true"/>
    </van-cell-group>
    <van-dialog @confirm="hSaveName"  v-model="showName" title="修改名字" show-cancel-button>
      <van-field v-model="newName" />
    </van-dialog>
    <van-popup v-model="showGender" position="bottom">
    <van-nav-bar
         title="修改性别"
         left-text="取消"
         @click-left="showGender=false"
    >
    </van-nav-bar>

    <van-cell is-link title="男" @click="hChangeGender(0)" />
    <van-cell is-link title="女" @click="hChangeGender(1)" />
</van-popup>
<!-- 修改生日 -->
    <van-popup v-model="showBirthday" position="bottom">
      <van-nav-bar title="修改生日"></van-nav-bar>
      <van-datetime-picker
        @cancel="showBirthday=false"
        @confirm="hSaveBirthday"
        v-model="newDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>

  </div>
</template>

<script>
import { userGetInfo, updateUserInfo, updatePhoto } from '@/api/user.js'
import dayjs from 'dayjs'
export default {
  name: 'userProfile',
  data () {
    return {
      showName: false,
      showGender: false,
      showBirthday: false,
      user: {},
      newName: '',
      newDate: new Date(),
      minDate: new Date(1990, 0, 10), // dateTime-picker中最小时间
      maxDate: new Date() // 当前时间
    }
  },
  created () {
    this.loadUserProfil()
  },
  methods: {
    async loadUserProfil () {
      const result = await userGetInfo()
      this.user = result.data.data
    },
    async hSaveName () {
      if (this.newName === '') {
        this.$toast.fail('不能保存空名字')
        return
      }
      if (this.newName === this.user.name) {
        return
      }
      try {
        await updateUserInfo({
          name: this.newName
        })
        this.user.name = this.newName
        this.newName = ''
      } catch (err) {
        this.$toast.fail('修改名字失败')
      }
    },
    async hChangeGender (val) {
      try {
        await updateUserInfo({
          gender: val
        })
        this.user.gender = val
        this.showGender = false
      } catch (err) {
      }
    },
    async hSaveBirthday () {
      const birthday = dayjs(this.newDate).format('YYYY-MM-DD')
      try {
        await updateUserInfo({
          birthday
        })
        this.showBirthday = false
        this.user.birthday = birthday
      } catch (err) {
      }
    },
    hShowImage () {
      this.$refs.refPhoto.click()
    },
    async hPhotoChange () {
      try {
        const file = this.$refs.refPhoto.files[0]
        if (!file) {
          return
        }
        const fd = new FormData()
        fd.append('photo', file)
        const result = await updatePhoto(fd)
        this.user.photo = result.data.data.photo
        this.$store.commit('mSetPhoto', this.user.photo)
        this.$toast.success('修改头像成功')
      } catch (err) {
      }
    }
  }
}
</script>

<style lang="less">
.van-nav-bar__text{
  color:#fff;
}
</style>
