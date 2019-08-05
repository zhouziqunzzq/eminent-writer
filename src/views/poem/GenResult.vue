<template>
  <v-container fluid fill-height id="wrapper"
               :style="{ backgroundImage: 'url(' + bgImage + ')'}"
  >
<!--    loader-->
    <v-layout row justify-center align-center v-if="!isReady">
      <v-flex xs3>
        <single-loader></single-loader>
      </v-flex>
    </v-layout>
<!--    result-->
    <v-layout column v-else>
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
                      @click="showBgPicker = true"
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
    <bg-picker
      :show="showBgPicker"
      @close="showBgPicker = false"
      @change-bg="onChangeBg"
    />
  </v-container>
</template>

<script lang="js">
import { mapState, mapActions } from 'vuex'
import { postForm, postJson } from '@/helpers'
import { poemKeyURL, poemAcrosticURL, poemPictureURL } from '@/config'
import singleLoader from '@/components/SingleLoader'
import smallStamp from '@/components/SmallStamp.vue'
import bigStamp from '@/components/BigStamp.vue'
import bgPicker from '@/components/BgPicker.vue'
import html2canvas from 'html2canvas'

export default {
  name: 'GenResult',
  components: {
    singleLoader,
    smallStamp,
    bigStamp,
    bgPicker
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
      bgImage: require('@/assets/home/bg.jpg')
    }
  },
  computed: {
    ...mapState({
      genMethod: state => state.poem.genMethod,
      textInput: state => state.poem.textInput,
      photoFile: state => state.poem.photoFile,
      isCangtou: state => state.poem.isCangtou,
      numberOfWords: state => state.poem.numberOfWords
    })
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
    onChangeBg (url) {
      this.bgImage = url
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

  .poem-wrapper
    padding: 0
    //background-color: rgba(255, 255, 255, 0.6)

  .poem-text
    font-size: 1.2rem
    font-weight: normal
</style>
