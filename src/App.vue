<template>
  <v-app>
    <pre-load-image
      :img-url-arr="imgURLs"
      :order="false"
      tip-str="小牛雅颂加载中..."
      v-if="isLoading"
      @imgAllLoaded="isLoading = false"
    ></pre-load-image>

    <v-content v-else>
      <router-view></router-view>
    </v-content>

    <audio
      autoplay="autoplay" loop="loop" preload="auto"
      src="/audio/bgm.mp3"
    >
    </audio>

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
  </v-app>
</template>

<script lang="js">
import { mapState } from 'vuex'
import { HIDE_SNACKBAR } from '@/mutation-types'
import { imgURLs } from '@/assets-description'
import preLoadImage from 'vue-preload-image'

export default {
  name: 'App',
  components: {
    preLoadImage
  },
  data () {
    return {
      imgURLs: imgURLs,
      isLoading: true
    }
  },
  computed: {
    ...mapState([
      'snackbar'
    ])
  },
  methods: {
    hideSnackbar () {
      this.$store.commit(HIDE_SNACKBAR)
    }
  },
  mounted () {
    console.log(imgURLs)
  }
}
</script>

<style lang="stylus" scoped>

</style>
