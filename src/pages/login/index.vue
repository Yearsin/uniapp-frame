<template>
  <view class="page-demo">
    <view>
      <text>取消单独网络任务</text>
      <button size="mini" @click="send()">发送请求</button>
      <button size="mini" @click="cancel()">取消请求</button>
    </view>
  </view>
</template>

<script>
import { login } from '@/server/user'

export default {
  data() {
    return {
      uploadPromise: null,
      timer: null
    }
  },
  onLoad() {},
  methods: {
    send() {
      //* 一旦调用了then()或catch()方法，Promise对象的链式调用会终止，并且后续的方法无法直接访问到原始的Promise对象。

      //? 可把网络调整为3g测试
      this.uploadPromise = login()
      this.uploadPromise
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    cancel() {
      // 调用集成在 promise原始对象上 abort 取消网络任务方法
      this.uploadPromise.abort()
    }
  }
}
</script>

<style lang="scss">
.page-demo {
  padding: 20rpx 20rpx 0;
  text {
    display: block;
  }
  button {
    margin: 10rpx 5rpx;
  }
}
</style>
