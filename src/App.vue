<template>
  <v-app>
    <pre-load-image
      :img-url-arr="imgURLs"
      :order="false"
      tip-str="(1/2) 图片预加载中..."
      v-if="isLoadingImg"
      @imgAllLoaded="imgLoaded()"
    ></pre-load-image>

    <font-loader
      :font-families="['STKaiti', 'STXingkai']"
      tip-str="(2/2) 字体预加载中..."
      progress-type="count"
      v-if="isLoadingFonts"
      @font-loaded="fontLoaded()"
    >
    </font-loader>

    <v-content v-if="!isLoadingImg && !isLoadingFonts">
      <router-view></router-view>

      <audio
        id="bgm" src="/audio/bgm.mp3"
        loop="loop" preload="auto"
      >
      </audio>
      <a id="music-control" @click="toggleAudio()">
        <v-img :class="{'rotate-forever': isPlaying}" src="~@/assets/music.png"></v-img>
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
      isLoadingImg: true,
      isLoadingFonts: false,
      isPlaying: false
    }
  },
  computed: {
    ...mapState([
      'snackbar'
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
      // start loading fonts
      this.isLoadingFonts = true
    },
    fontLoaded () {
      // console.log('font loaded')
      this.isLoadingFonts = false
      setTimeout(() => {
        this.toggleAudio()
      }, 1000)
    }
  },
  mounted () {
    // console.log(imgURLs)
  }
}
</script>

<style lang="stylus" scoped>
  #music-control
    position: absolute
    top: 1rem
    right: 1rem
    width: 15%

  .rotate-forever
    animation: rotateRound 3s linear infinite

  @keyframes rotateRound
    from {transform: rotate(0deg) }
    to {transform: rotate(360deg) }
</style>
