<template lang="pug">
.vue-preload-image(v-if="show")
  .progress
    slot
    div.loadingAnimation(v-if="animationShow").loadingAnimation
    p.tip-str(v-if="tipStrShow") {{tipStr}}
    p.progress-str(v-if="progressShow") {{progressStr}}
    p.timeout-str(v-if="timeoutStrShow") {{timeoutStr}}
</template>

<script lang="js">
import WebFontLoader from 'webfontloader'

export default {
  name: 'FontLoader',
  props: {
    fontFamilies: {
      type: Array
    },
    fontUrls: {
      type: Array
    },
    // 控制显示
    animationShow: { // 控制加载动画的显示
      type: Boolean,
      default: true
    },
    tipStrShow: { // 控制文字提示信息的显示
      type: Boolean,
      default: true
    },
    progressShow: { // 控制加载进程文字的显示
      type: Boolean,
      default: true
    },
    progressType: { // 加载进程文字的类型
      type: String,
      default: 'percent' // 'percent' 百分比类型 | 'count' 加载数量类型
    },
    tipStr: { // 预加载中的提示语内容
      type: String,
      default: '图片预加载中...'
    },
    timeout: {
      type: Number,
      default: 5000
    },
    timeoutStr: { // 超时提示语内容
      type: String,
      default: '（由于字体文件较大，若长时间未响应，请刷新重试）'
    }
  },
  data () {
    return {
      show: true,
      progressStr: '',
      fontSum: NaN,
      loadedCount: 0,
      timeoutStrShow: false
    }
  },
  methods: {
    preloadFonts () {
      // let myTestStr = {}
      // for (let v of this.fontFamilies) {
      //   myTestStr[v] = '测试'
      // }
      WebFontLoader.load({
        custom: {
          families: this.fontFamilies,
          urls: this.fontUrls
          // testStrings: myTestStr
        },
        active: () => {
          this.show = false
          this.$emit('font-loaded')
        },
        fontactive: (name, fvd) => {
          console.log(name + ' successfully loaded')
          // console.log(fvd)
          this.loadedCount++
          this.progressStr = this.progressType === 'percent'
            ? parseInt(this.loadedCount * 100 / this.fontSum) + '%'
            : this.loadedCount + '/' + this.fontSum
        },
        fontloading: (name, fvd) => {
          console.log('start loading ' + name)
          // console.log(fvd)
        }
      })
    }
  },
  created () {
    this.fontSum = this.fontFamilies.length
    this.preloadFonts()
    setTimeout(() => {
      this.timeoutStrShow = true
    }, this.timeout)
  }
}
</script>

<style scoped lang="stylus">
  .vue-preload-image
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    display: table
    text-align: center
    .progress
      display: table-cell
      vertical-align: middle
      p
        margin: 0
      .tip-str
        margin-top: .4em
      .loadingAnimation
        width: 60px
        height: 60px
        background-color: #67CF22

        margin: 0 auto;
        -webkit-animation: rotateplane 1.2s infinite ease-in-out
        animation: rotate-plane 1.2s infinite ease-in-out

      @keyframes rotate-plane
        0%
          transform: perspective(120px) rotateX(0deg) rotateY(0deg);
        50%
          transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
        100%
          transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
</style>
