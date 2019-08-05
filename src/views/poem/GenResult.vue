<template>
  <v-container fluid fill-height id="wrapper"
               :style="{ backgroundImage: 'url(' + bgImageInUse + ')'}"
  >
<!--    loader-->
    <v-layout row justify-center align-center v-show="!isReady || isLoadingBg"
              class="my-loader"
    >
      <v-flex xs3>
        <single-loader></single-loader>
      </v-flex>
    </v-layout>
<!--    result-->
    <v-layout column v-show="isReady">
      <v-spacer></v-spacer>
      <v-flex xs6 pt-4>
        <v-container fluid fill-height style="padding: 10% 15%">
          <v-layout column justify-center align-center>
            <v-flex :class="{ 'xs4': numberOfWords === 5, 'xs6': numberOfWords === 7 }">
                <v-container fluid fill-height class="poem-wrapper">
                  <v-layout row justify-center align-center>
                    <v-flex
                      xs1
                      v-for="(v, i) in myPoems[poemPtr]"
                      :key="i"
                      style="margin: 0 0.8rem"
                    >
                      <v-container fluid fill-height pa-0>
                        <v-layout column justify-center>
                          <v-flex
                            xs1
                            v-for="(c, ii) in v"
                            :key="ii"
                          >
                            <h5 class="poem-text text-xs-center kaiti">{{c}}</h5>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-flex>
                  </v-layout>
                </v-container>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs6 pb-4>
        <v-container fluid fill-height pa-0>
          <v-layout row justify-space-between align-end>
            <template v-if="genMethod === 'text'">
              <v-flex xs2 pb-2 v-if="textInput.length <= 3">
                <small-stamp :text="textInput"></small-stamp>
              </v-flex>
              <v-flex xs3 pb-2 v-else>
                <big-stamp :text="textInput"></big-stamp>
              </v-flex>
            </template>
            <v-flex xs2 pb-2 v-else>
              <v-img src="~@/assets/common/niutrans_logo.png"
                     :contain="true"
                     width="3rem"
              ></v-img>
            </v-flex>
            <v-flex xs4 v-show="showButton">
              <v-container fluid fill-height pa-0>
                <v-layout column justify-center align-end>
                  <v-flex xs4 pa-2 style="width: 75%">
                    <ink-button
                      tag="重新生成"
                      @click="poemPtr = (poemPtr + 1) % poemCnt"
                    ></ink-button>
                  </v-flex>
                  <v-flex xs4 pa-2 style="width: 75%">
                    <ink-button
                      tag="更换背景"
                      @click="onChangeBg()"
                    ></ink-button>
                  </v-flex>
                  <v-flex xs4 pa-2 style="width: 75%">
                    <ink-button
                      tag="分享"
                      @click="share()"
                    ></ink-button>
                  </v-flex>
                  <v-flex xs4 pa-2 style="width: 75%">
                    <ink-button
                      tag="返回"
                      @click="$router.go(-1)"
                    ></ink-button>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="js">
import { mapState, mapActions } from 'vuex'
import { postForm, postJson, preloadImage } from '@/helpers'
import { poemKeyURL, poemAcrosticURL,
  poemPictureURL, bgBasePath, bgCount } from '@/config'
import singleLoader from '@/components/SingleLoader'
import smallStamp from '@/components/SmallStamp.vue'
import bigStamp from '@/components/BigStamp.vue'
import html2canvas from 'html2canvas'

export default {
  name: 'GenResult',
  components: {
    singleLoader,
    smallStamp,
    bigStamp
  },
  data () {
    return {
      myPoems: [
        '千山鸟飞绝',
        '万径人踪灭',
        '孤舟蓑笠翁',
        '独钓寒江雪'
      ],
      poemCnt: 0,
      poemPtr: 0,
      isReady: false,
      showButton: true,
      showBgPicker: false,
      bgImageID: 10,
      bgCount: bgCount,
      bgImageInUse: bgBasePath + '10.jpg',
      isLoadingBg: false
    }
  },
  computed: {
    ...mapState({
      genMethod: state => state.poem.genMethod,
      textInput: state => state.poem.textInput,
      photoFile: state => state.poem.photoFile,
      isCangtou: state => state.poem.isCangtou,
      numberOfWords: state => state.poem.numberOfWords
    }),
    bgImage () {
      return bgBasePath + this.bgImageID.toString() + '.jpg'
    }
  },
  methods: {
    ...mapActions([
      'showInfo',
      'showError',
      'showMusicControl',
      'hideMusicControl'
    ]),
    share () {
      this.hideMusicControl()
      this.showButton = false
      setTimeout(() => {
        html2canvas(document.body, { useCORS: true })
          .then((canvas) => {
            this.showMusicControl()
            this.showButton = true
            let link = document.createElement('a')
            link.href = canvas.toDataURL('img/png')
            link.setAttribute('download', 'niutrans_poem_' + new Date().getTime() + '.png')
            link.style.display = 'none'
            document.body.appendChild(link)
            link.click()
            link.remove()
            this.showInfo('已将生成结果保存为图片，请您下载后随意分享吧～')
          })
      }, 10)
    },
    async onChangeBg () {
      const t = setTimeout(() => {
        this.isLoadingBg = true
      }, 100)
      this.bgImageID = this.bgImageID + 1 <= this.bgCount ? this.bgImageID + 1 : 1
      await preloadImage(this.bgImage)
        .then(() => {
          this.bgImageInUse = this.bgImage
          clearTimeout(t)
        })
        .catch((e) => {
          this.showError('加载背景图失败，请重试')
          console.log(e)
        })
      this.isLoadingBg = false
    }
  },
  async mounted () {
    if (this.genMethod === 'text') {
      const apiURL = this.isCangtou ? poemAcrosticURL : poemKeyURL
      try {
        const response = await postJson(apiURL, {
          input: this.textInput,
          type: Number(this.numberOfWords)
        })
        if (response.parsedBody.result) {
          this.myPoems = response.parsedBody.data
          this.poemCnt = this.myPoems.length
          this.poemPtr = 0
        } else {
          this.showError(response.parsedBody.msg)
        }
      } catch (e) {
        this.showError(e)
      }
      this.isReady = true
    } else if (this.genMethod === 'photo') {
      try {
        const response = await postForm(poemPictureURL, {
          'photo': this.photoFile,
          'type': String(this.numberOfWords)
        })
        if (response.parsedBody.result) {
          this.myPoems = response.parsedBody.data
          this.poemCnt = this.myPoems.length
          this.poemPtr = 0
        } else {
          this.showError(response.parsedBody.msg)
        }
      } catch (e) {
        this.showError(e)
      }
      this.isReady = true
    }
  }
}
</script>

<style scoped lang="stylus">
  #wrapper
    background-repeat: no-repeat
    background-size: 100% 100%
    padding: 1rem
    transition: background-image 0.5s

  .my-loader
    position: absolute
    left: 0
    top: 0
    height: 100%
    width: 100%

  .poem-wrapper
    padding: 0
    //background-color: rgba(255, 255, 255, 0.6)

  .poem-text
    font-size: 1.2rem
    font-weight: normal
</style>
