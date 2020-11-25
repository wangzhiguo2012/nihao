<template>
  <div class="channel-edit">
    <div class="channel">
      <van-cell title="我的频道" :border="false">
        <van-button size="mini" type="info" @click="editing = !editing">{{
          editing ? "取消" : "编辑"
        }}</van-button>
      </van-cell>
      <van-grid>
        <van-grid-item
          v-for="(item,idx) in channels"
          :key="item.id"
          @click="hClickMyChannel(item)"
          :class="{ cur: idx === activeIndex }"
        >
          <span>{{ item.name }}</span>
          <van-icon name="cross" class="btn"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="channel">
      <van-cell title="可选频道" :border="false"></van-cell>
      <van-grid>
        <van-grid-item
          v-for="item in cRecommendChannels"
          :key="item.id"
          @click="hAddChannel(item)"
        >
          <span>{{ item.name }}</span>
          <van-icon
            v-show="editing && idx !== 0"
            name="cross"
            class="btn"
          ></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>
<script>
import {
  getAllChannels,
  addChannel,
  deleteChannel
} from '../../api/channel.js'
export default {
  name: 'channelEdit',
  props: {
    channels: {
      type: Array,
      required: false,
      default: () => {
        return [{ id: 0, name: 'ab' }]
      }
    },
    activeIndex: {
      type: Number,
      required: false,
      default: 100
    }
  },
  activeIndex: {
    type: Number,
    required: false,
    default: 100
  },
  data () {
    return {
      editing: false,
      allChannels: []
    }
  },
  computed: {
    cRecommendChannels () {
      const arr = this.allChannels.filter((channel) => {
        const idx = this.channels.findIndex((item) => item.id === channel.id)
        return idx === -1
      })
      return arr
    }
  },
  methods: {
    async loadAllChannels () {
      const result = await getAllChannels()
      this.allChannels = result.data.data.channels
    },
    async hClickMyChannel (channel) {
      if (this.editing) {
        if (channel.id === 0) {
          return
        }
        const result = await deleteChannel(channel.id)
        const idx = this.channels.findIndex((it) => it.id === channel.id)
        if (idx !== -1) {
          this.channels.splice(idx, 1)
        }
        if (idx < this.activeIndex) {
          alert('父组件中activeIndex要-1')
          this.$emit('updateCurIndex', this.activeIndex - 1)
        }
      } else {
        this.$emit('close')
        this.$emit('updateCurChannel', channel)
      }
    },
    async hAddChannel (channel) {
      let curChannelsNow = [...this.channels, channel]
      curChannelsNow.splice(0, 1)
      curChannelsNow = curChannelsNow.map((item, idx) => {
        return { id: item.id, seq: idx }
      })
      const result = await addChannel(curChannelsNow)
      this.channels.push(channel)
    }
  },
  created () {
    this.loadAllChannels()
  },
  mounted () {}
}
</script>

<style scoped lang='less'>
.channel {
  padding: 15px;
  font-size: 14px;
}
.btn {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 24px;
}
.cur {
  color: red;
  font-weight: bold;
}
</style>
