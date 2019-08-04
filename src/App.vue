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

<!--    font loader-->
<!--    <font-loader-->
<!--      :font-families="['STKaiti', 'STXingkai']"-->
<!--      tip-str="(2/2) 字体预加载中..."-->
<!--      progress-type="count"-->
<!--      v-if="isLoadingFonts"-->
<!--      @font-loaded="fontLoaded()"-->
<!--    >-->
<!--    </font-loader>-->

<!--    splash animation-->
<!--    <v-container fluid fill-height v-if="isSplashing" pa-0>-->
<!--      <v-layout column justify-center align-center>-->
<!--        <v-img src="~@/assets/logo-loader.gif"-->
<!--               :contain="true"-->
<!--               width="100%"-->
<!--        ></v-img>-->
<!--      </v-layout>-->
<!--    </v-container>-->

<!--    main content-->
    <v-content v-if="!isLoadingImg">
      <router-view></router-view>

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
// import fontLoader from '@/components/FontLoader.vue'

export default {
  name: 'App',
  components: {
    preLoadImage
  },
  data () {
    return {
      imgURLs: imgURLs,
      isLoadingImg: true,
      // isLoadingFonts: false,
      isSplashing: false,
      isPlaying: false
    }
  },
  computed: {
    ...mapState([
      'snackbar',
      'app'
    ])
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
      // this.startSplash()
      setTimeout(() => {
        this.toggleAudio()
      }, 1000)
    },
    startSplash () {
      this.isSplashing = true
      setTimeout(() => {
        this.isSplashing = false
        setTimeout(() => {
          this.toggleAudio()
        }, 1000)
      }, 4000)
    }
  },
  mounted () {
    // console.log(imgURLs)
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
</style>
