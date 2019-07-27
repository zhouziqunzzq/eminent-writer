<template>
  <v-container fluid fill-height id="wrapper">
<!--    loader-->
    <v-layout row justify-center align-center v-if="!isReady">
      <v-flex xs3>
        <single-loader></single-loader>
      </v-flex>
    </v-layout>
<!--    result-->
    <v-layout column justify-center v-else>
      <v-flex xs9>
        <v-container fluid fill-height pa-0 pl-4 pr-4>
          <v-layout column justify-start align-center>
            <v-flex xs8 style="width: 95%">
              <v-img src="~@/assets/guwen/bg-text-input.png" :contain="true">
                <v-container fluid fill-height class="textarea-wrapper">
                  <v-layout row wrap justify-center align-center>
                    <v-flex xs9 fill-height>
                      <label for="trans-result"></label>
                      <textarea
                        id="trans-result"
                        v-model="transResult"
                        rows="15"
                        v-show="showButton"
                      ></textarea>
                      <div v-show="!showButton"
                           class="kaiti"
                           style="font-size: 16px"
                           v-html="convertedTransResult"
                      ></div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-img>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs3>
        <v-container fluid fill-height pa-0>
          <v-layout row justify-space-between align-end>
            <v-flex xs2>
              <v-img src="~@/assets/common/niutrans_logo.png"></v-img>
            </v-flex>
            <v-flex xs4 fill-height v-show="showButton">
              <v-container fluid fill-height pa-0>
                <v-layout column justify-end align-end>
                  <v-flex xs2 pa-0 style="width: 75%">
                    <ink-button
                      tag="复制"
                      font-size="14px"
                      @click="doCopy()"
                    ></ink-button>
                  </v-flex>
                  <v-flex xs2 pa-0 style="width: 75%">
                    <ink-button
                      tag="分享"
                      font-size="14px"
                      @click="share()"
                    ></ink-button>
                  </v-flex>
                  <v-flex xs2 pa-0 style="width: 75%">
                    <ink-button
                      tag="返回"
                      font-size="14px"
                      @click="$router.push('/')"
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
import { postForm, postJson } from '@/helpers'
import { guwenTextURL, guwenPictureURL } from '@/config'
import singleLoader from '@/components/SingleLoader'
import html2canvas from 'html2canvas'

export default {
  name: 'GenResult',
  components: {
    singleLoader
  },
  data () {
    return {
      transResult: '庆历四年春，滕子京谪守巴陵郡。' +
        '越明年，政通人和，百废具兴。' +
        '乃重修岳阳楼，增其旧制，刻唐贤今人诗赋于其上。属予作文以记之。',
      isReady: false,
      showButton: true
    }
  },
  computed: {
    ...mapState({
      genMethod: state => state.guwen.genMethod,
      textInput: state => state.guwen.textInput,
      photoFile: state => state.guwen.photoFile,
      direction: state => state.guwen.direction
    }),
    convertedTransResult () {
      return this.transResult.replace(/(?:\r\n|\r|\n)/g, '<br />')
    }
  },
  methods: {
    ...mapActions([
      'showInfo',
      'showError',
      'showMusicControl',
      'hideMusicControl'
    ]),
    doCopy () {
      this.$copyText(this.transResult)
        .then(() => {
          this.showInfo('翻译结果已复制到剪贴板')
        }, (e) => {
          this.showError('自动复制失败，请尝试手动复制')
          console.log(e)
        })
    },
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
            link.setAttribute('download', 'niutrans_guwen_' + new Date().getTime() + '.png')
            link.style.display = 'none'
            document.body.appendChild(link)
            link.click()
            link.remove()
            this.showInfo('已将生成结果保存为图片，请您下载后随意分享吧～')
          })
      }, 100)
    }
  },
  async mounted () {
    if (this.genMethod === 'text') {
      try {
        const response = await postJson(guwenTextURL, {
          input: this.textInput,
          type: this.direction
        })
        if (response.parsedBody.result) {
          this.showInfo(response.parsedBody.msg)
          this.transResult = response.parsedBody.data
          this.isReady = true
        } else {
          this.showError(response.parsedBody.msg)
        }
      } catch (e) {
        this.showError(e)
      }
    } else if (this.genMethod === 'photo') {
      try {
        const response = await postForm(guwenPictureURL, {
          'photo': this.photoFile,
          'type': String(this.direction)
        })
        if (response.parsedBody.result) {
          this.showInfo(response.parsedBody.msg)
          this.transResult = response.parsedBody.data
          this.isReady = true
        } else {
          this.showError(response.parsedBody.msg)
        }
      } catch (e) {
        this.showError(e)
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '~@/styles/textarea-center'

  #wrapper
    background-image: url("~@/assets/home/bg.jpg")
    background-repeat: no-repeat
    background-size: 100% 100%
    padding: 1rem

  .textarea-wrapper
    position: relative
    padding: 10% 0
</style>
