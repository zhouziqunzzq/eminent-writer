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
      <v-flex xs8>
        <v-container fluid fill-height style="padding: 10% 15%">
          <v-layout column justify-start align-center>
            <v-flex xs6 style="width: 80%">
              <v-container fluid fill-height class="duilian-wrapper">
                <v-layout column justify-center>
                  <v-flex xs3>
                    <v-container fluid fill-height pa-0 pt-4>
                      <v-layout row justify-center align-center reverse>
                        <h5 v-for="(c, i) in safeHengpi"
                            class="duilian-text kaiti" :key="i">
                          {{c}}
                        </h5>
                      </v-layout>
                    </v-container>
                  </v-flex>
                  <v-flex xs9>
                    <v-container fluid fill-height pa-0 pl-1 pr-1 pb-4>
                      <v-layout row justify-space-between align-center reverse>
                        <v-flex xs4>
                          <v-container fluid fill-height pa-0>
                            <v-layout column justify-center align-center>
                              <h5 v-for="(c, i) in safeShanglian"
                                  class="duilian-text kaiti" :key="i">
                                {{c}}
                              </h5>
                            </v-layout>
                          </v-container>
                        </v-flex>
                        <v-flex xs4>
                          <v-container fluid fill-height pa-0>
                            <v-layout column justify-center align-center>
                              <h5 v-for="(c, i) in safeXialian"
                                  class="duilian-text kaiti" :key="i">
                                {{c}}
                              </h5>
                            </v-layout>
                          </v-container>
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
      <v-flex xs4 pb-4>
        <v-container fluid fill-height pa-0>
          <v-layout row justify-space-between align-end>
            <template v-if="genMethod === 'text' && isKeyword">
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
                      @click="duilianPtr = (duilianPtr + 1) % duilianCnt"
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
import { duilianDuiURL, duilianKeyURL, duilianPictureURL,
  bgBasePath, bgCount } from '@/config'
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
      myDuilians: null,
      duilianCnt: 0,
      duilianPtr: 0,
      isReady: false,
      showButton: true,
      bgImageID: 11,
      bgCount: bgCount,
      bgImageInUse: bgBasePath + '11.jpg',
      isLoadingBg: false
    }
  },
  computed: {
    ...mapState({
      genMethod: state => state.duilian.genMethod,
      textInput: state => state.duilian.textInput,
      photoFile: state => state.duilian.photoFile,
      isKeyword: state => state.duilian.isKeyword
    }),
    safeHengpi () {
      if (this.myDuilians === null) {
        return ''
      } else {
        return this.myDuilians[this.duilianPtr].hengpi.length === 0
          ? '小牛雅颂' : this.myDuilians[this.duilianPtr].hengpi
      }
    },
    safeShanglian () {
      if (this.myDuilians === null) {
        return ''
      } else {
        return this.myDuilians[this.duilianPtr].shanglain
      }
    },
    safeXialian () {
      if (this.myDuilians === null) {
        return ''
      } else {
        return this.myDuilians[this.duilianPtr].xialian
      }
    },
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
            link.setAttribute('download', 'niutrans_duilian_' + new Date().getTime() + '.png')
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
      try {
        const apiURL = this.isKeyword ? duilianKeyURL : duilianDuiURL
        const response = await postJson(apiURL, {
          input: this.textInput
        })
        if (response.parsedBody.result) {
          this.myDuilians = response.parsedBody.data
          this.duilianCnt = this.myDuilians.length
          this.duilianPtr = 0
        } else {
          this.showError(response.parsedBody.msg)
        }
      } catch (e) {
        this.showError(e)
      }
      this.isReady = true
    } else if (this.genMethod === 'photo') {
      try {
        const response = await postForm(duilianPictureURL, {
          'photo': this.photoFile
        })
        if (response.parsedBody.result) {
          this.myDuilians = response.parsedBody.data
          this.duilianCnt = this.myDuilians.length
          this.duilianPtr = 0
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

  .duilian-wrapper
    padding: 0
    //background-color: rgba(255, 255, 255, 0.6)

  .duilian-text
    font-size: 1.4rem
    font-weight: normal
</style>
