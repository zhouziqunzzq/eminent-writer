<template>
  <v-app id="app-wrapper">
<!--    image loader-->
    <pre-load-image
      :img-url-arr="imgURLs"
      :order="false"
      tip-str="图片预加载中..."
      v-if="isLoadingImg"
      :animation-show="false"
      @imgAllLoaded="imgLoaded()"
    >
      <v-img src="~@/assets/logo-loader.gif"
             :contain="true"
             width="100%"
      ></v-img>
    </pre-load-image>

<!--    splash animation-->
    <v-container fluid fill-height pa-0 v-if="isSplashing">
      <v-layout column justify-center align-center>
        <v-img src="~@/assets/logo-loader.gif"
               :contain="true"
               width="100%"
        ></v-img>
      </v-layout>
    </v-container>

<!--    font loader-->
  <font-loader
    v-if="!isLoadingSplash && !isLoadingImg"
    :font-families="['STKaiti', 'STXingkai']"
    :background="true"
  >
  </font-loader>

<!--    main content-->
    <v-content v-if="!isLoadingSplash && !isLoadingImg && !isSplashing">
      <transition :name="transitionName">
        <router-view></router-view>
      </transition>

      <audio
        id="bgm" src="/audio/bgm.mp3"
        loop="loop" preload="auto"
      >
      </audio>
      <a id="music-control" @click="toggleAudio()" v-show="app.showMusicControl">
        <v-img
          :class="{'rotate-forever': isPlaying}"
          src="~@/assets/music.png"
          :contain="true"
          width="40px"
        ></v-img>
      </a>

      <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        :timeout="3000"
      >
        {{ snackbar.msg }}
        <v-btn
          dark
          flat
          @click="hideSnackbar()"
        >
          关闭
        </v-btn>
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script lang="js">
import { mapState, mapActions } from 'vuex'
import { HIDE_SNACKBAR } from '@/mutation-types'
import { imgURLs } from '@/assets-description'
import preLoadImage from 'vue-preload-image'
import { preloadImage } from '@/helpers'
import fontLoader from '@/components/FontLoader.vue'

export default {
  name: 'App',
  components: {
    preLoadImage,
    fontLoader
  },
  data () {
    return {
      imgURLs: imgURLs,
      isLoadingSplash: true,
      isLoadingImg: false,
      beginLoading: null,
      endLoading: null,
      // isLoadingFonts: false,
      isSplashing: false,
      isPlaying: false,
      transitionName: 'slide-left'
    }
  },
  computed: {
    ...mapState([
      'snackbar',
      'app'
    ])
  },
  watch: {
    '$route' (to, from) {
      const toPath = to.path.split('/')
      const fromPath = from.path.split('/')
      const toDepth = toPath.length
      const fromDepth = fromPath.length
      const toLast = toPath[toPath.length - 1]
      const fromLast = fromPath[fromPath.length - 1]
      if (toDepth === fromDepth) {
        this.transitionName = fromLast === 'home' && toLast === 'result' ? 'slide-left' : 'slide-right'
      } else {
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    }
  },
  methods: {
    ...mapActions([
      'showInfo',
      'showError'
    ]),
    hideSnackbar () {
      this.$store.commit(HIDE_SNACKBAR)
    },
    playAudio (id) {
      const audio = document.querySelector(id)
      const audioPromise = audio.play()
      if (audioPromise !== undefined) {
        audioPromise.then(() => {
          this.isPlaying = true
        })
          .catch((e) => {
            console.log(e)
            this.showError('非常抱歉，背景音乐播放失败，轻触右上角音符图标重试。')
          })
      }
    },
    pauseAudio (id) {
      document.querySelector(id).pause()
      this.isPlaying = false
    },
    toggleAudio () {
      if (this.isPlaying) {
        this.pauseAudio('#bgm')
      } else {
        this.playAudio('#bgm')
      }
    },
    imgLoaded () {
      this.isLoadingImg = false
      this.endLoading = Date.now()
      const loadingTime = this.endLoading - this.beginLoading
      const remainTime = Math.max(0, 4000 - loadingTime)
      if (remainTime > 0) {
        this.isSplashing = true
        setTimeout(() => {
          this.isSplashing = false
          setTimeout(() => {
            this.toggleAudio()
          }, 1000)
        }, remainTime)
      } else {
        setTimeout(() => {
          this.toggleAudio()
        }, 1000)
      }
    }
  },
  async mounted () {
    // preload splash
    await preloadImage(require('@/assets/logo-loader.gif'))
    this.isLoadingSplash = false
    this.isLoadingImg = true
    this.beginLoading = Date.now()
  }
}
</script>

<style lang="stylus" scoped>
  #app-wrapper
    background-color: #ffffff !important

  #music-control
    position: absolute
    top: 1rem
    right: -0.2rem
    width: 15%

  .rotate-forever
    animation: rotateRound 3s linear infinite

  @keyframes rotateRound
    from {transform: rotate(0deg) }
    to {transform: rotate(360deg) }

  .slide-right-enter-active, .slide-right-leave-active
    transition: transform .5s !important
    position: absolute
    top: 0
    left: 0
  .slide-right-enter
    transform: translateX(-100%)
  .slide-right-leave-to
    transform: translateX(100%)

  .slide-left-enter-active, .slide-left-leave-active
    transition: transform .5s !important
    position: absolute
    top: 0
    left: 0
  .slide-left-enter
    transform: translateX(100%)
  .slide-left-leave-to
    transform: translateX(-100%)
</style>
