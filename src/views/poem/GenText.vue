<template>
  <v-container fluid fill-height id="wrapper">
    <v-layout column>
      <v-flex xs4>
        <v-container fluid fill-height pa-0>
          <v-layout column justify-end>
            <v-flex xs4>
              <v-img src="~@/assets/poem/bg-text-input.png">
                <v-container fluid fill-height id="text-input-wrapper">
                  <v-layout row wrap justify-center align-center>
                    <v-flex xs6>
                      <label for="text-input"></label>
                      <input type="text" id="text-input"
                             placeholder="请输入关键词"
                             v-model="textInput"
                      />
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-img>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs1>
        <v-container fluid fill-height>
          <v-layout column justify-center>
            <v-flex xs2 id="hr-line">
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs6>
        <v-container fluid fill-height pa-0>
          <v-layout column justify-begin>
            <v-flex xs4>
              <v-img src="~@/assets/poem/bg-text-panel.png"
                     :contain="true">
                <v-container fluid fill-height id="panel-wrapper">
                  <v-layout column justify-begin>
                    <v-flex xs2 mb-2>
                      <v-container fluid fill-height pa-0>
                        <v-layout row justify-begin>
                          <v-flex xs3>
                            <v-img src="~@/assets/poem/panel-format-title.png"></v-img>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-flex>
                    <v-flex xs2 mb-3>
                      <v-container fluid fill-height pa-0>
                        <v-layout row justify-begin>
                          <v-flex xs1 option @click="onOptionWuyanClick">
                            <v-img :src="optionWuyanBg" :contain="true"></v-img>
                          </v-flex>
                          <v-flex xs2 mr-4 option-label @click="onOptionWuyanClick">
                            <v-img src="~@/assets/poem/option-wuyan.png"></v-img>
                          </v-flex>
                          <v-flex xs1 option @click="onOptionQiyanClick">
                            <v-img :src="optionQiyanBg" :contain="true"></v-img>
                          </v-flex>
                          <v-flex xs2 option-label @click="onOptionQiyanClick">
                            <v-img src="~@/assets/poem/option-qiyan.png"></v-img>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-flex>
                    <v-flex xs2 mb-2>
                      <v-container fluid fill-height pa-0>
                        <v-layout row justify-begin>
                          <v-flex xs3>
                            <v-img src="~@/assets/poem/panel-type-title.png"></v-img>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-flex>
                    <v-flex xs2 mb-3>
                      <v-container fluid fill-height pa-0>
                        <v-layout row justify-begin>
                          <v-flex xs1 option @click="onOptionJuejuClick">
                            <v-img :src="optionJuejuBg" :contain="true"></v-img>
                          </v-flex>
                          <v-flex xs2 mr-4 option-label @click="onOptionJuejuClick">
                            <v-img src="~@/assets/poem/option-jueju.png"></v-img>
                          </v-flex>
                          <v-flex xs1 option @click="onOptionCangtouClick">
                            <v-img :src="optionCangtouBg" :contain="true"></v-img>
                          </v-flex>
                          <v-flex xs2 option-label @click="onOptionCangtouClick">
                            <v-img src="~@/assets/poem/option-cangtou.png"></v-img>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-flex>
                    <v-flex xs3>
                      <v-container fluid fill-height pa-0>
                        <v-layout row justify-center>
                          <v-flex xs4 @click="onTextGoClick">
                            <v-img src="~@/assets/poem/button-gen-text.png"></v-img>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-img>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
    <div id="result-mask" v-show="showResult">
      <v-container fluid fill-height pa-0>
        <!--loader-->
        <v-layout row justify-center align-center v-show="!isReady"
                  class="my-loader"
        >
          <v-flex xs3>
            <single-loader></single-loader>
          </v-flex>
        </v-layout>
        <!--result-->
        <v-layout column justify-center v-show="isReady">
          <v-flex xs6 style="position: relative;">
            <v-img src="~@/assets/poem/bg-result.png"
                   id="result-wrapper"
                   :contain="true">
              <v-container fluid fill-height id="result-text-wrapper">
                <v-layout column justify-center>
                  <v-flex xs1
                          mb-1
                          v-for="(v, i) in myPoems[poemPtr]"
                          :key="v + i.toString()"
                  >
                    <h5 class="poem-text text-xs-center xingkai">{{v}}</h5>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
            <div id="result-closer" @click="showResult = false"></div>
          </v-flex>
          <v-flex xs2 mt-3>
            <v-container fluid fill-height pa-0>
              <v-layout row justify-center>
                <v-flex xs3 mr-3 @click="share">
                  <v-img src="~@/assets/poem/button-share.png"></v-img>
                </v-flex>
                <v-flex xs3 ml-3 @click="onRegenerateClick">
                  <v-img src="~@/assets/poem/button-regen.png"></v-img>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </v-container>
</template>

<script lang="js">
import { mapState, mapActions } from 'vuex'
import { postJson, isChinese } from '@/helpers'
import {
  POEM_SET_GEN_METHOD, POEM_SET_TEXT_INPUT,
  POEM_SET_NUM_WORDS, POEM_SET_IS_CANGTOU
} from '@/mutation-types'
import { poemKeyURL, poemAcrosticURL } from '@/config'
import singleLoader from '@/components/SingleLoader'
import html2canvas from 'html2canvas'

const optionBg = require('@/assets/poem/option.png')
const optionSelectedBg = require('@/assets/poem/option-selected.png')

export default {
  name: 'GenText',
  components: {
    singleLoader
  },
  data () {
    return {
      textInput: '',
      showResult: false,
      myPoems: [[]],
      poemCnt: 1,
      poemPtr: 0,
      isReady: false
    }
  },
  computed: {
    ...mapState({
      textInputHistory: state => state.poem.textInput,
      numberOfWords: state => state.poem.numberOfWords,
      isCangtou: state => state.poem.isCangtou
    }),
    optionWuyanBg () {
      if (this.numberOfWords === 5) {
        return optionSelectedBg
      } else {
        return optionBg
      }
    },
    optionQiyanBg () {
      if (this.numberOfWords === 7) {
        return optionSelectedBg
      } else {
        return optionBg
      }
    },
    optionJuejuBg () {
      if (!this.isCangtou) {
        return optionSelectedBg
      } else {
        return optionBg
      }
    },
    optionCangtouBg () {
      if (this.isCangtou) {
        return optionSelectedBg
      } else {
        return optionBg
      }
    }
  },
  methods: {
    ...mapActions([
      'showInfo',
      'showError'
    ]),
    async genText () {
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
    },
    onTextGoClick () {
      if (this.textInput.length === 0) {
        this.showError('请输入关键词')
        return
      }
      if (this.textInput.length > 4) {
        this.showError('关键词不能超过 4 个字符')
        return
      }
      if (!isChinese(this.textInput)) {
        this.showError('关键词只能包含中文')
        return
      }
      this.$store.commit(POEM_SET_GEN_METHOD, 'text')
      this.$store.commit(POEM_SET_TEXT_INPUT, this.textInput)
      this.isReady = false
      this.showResult = true
      this.genText()
    },
    onOptionWuyanClick () {
      this.$store.commit(POEM_SET_NUM_WORDS, 5)
    },
    onOptionQiyanClick () {
      this.$store.commit(POEM_SET_NUM_WORDS, 7)
    },
    onOptionJuejuClick () {
      this.$store.commit(POEM_SET_IS_CANGTOU, false)
    },
    onOptionCangtouClick () {
      this.$store.commit(POEM_SET_IS_CANGTOU, true)
    },
    onRegenerateClick () {
      this.poemPtr = (this.poemPtr + 1) % this.poemCnt
    },
    share () {
      // this.showButton = false
      setTimeout(() => {
        html2canvas(document.body, { useCORS: true })
          .then((canvas) => {
            // this.showButton = true
            let link = document.createElement('a')
            link.href = canvas.toDataURL('img/png')
            link.setAttribute('download', 'niutrans_poem_' + new Date().getTime() + '.png')
            link.style.display = 'none'
            document.body.appendChild(link)
            // console.log(link)
            link.click()
            link.remove()
            this.showInfo('已将生成结果保存为图片，请您下载后随意分享吧～')
          })
      }, 10)
    }
  },
  mounted () {
    this.textInput = this.textInputHistory
  }
}
</script>

<style scoped lang="stylus">
  @import '~@/styles/input-text-center'

  #wrapper
    background-image: url("~@/assets/poem/bg-text.png")
    background-repeat: no-repeat
    background-size: 100% 100%
    padding: 1rem 1.2rem

  #text-input-wrapper
    padding: 0 0 0.6rem 3rem

  #text-input
    font-size: 1.5rem

  #hr-line
    background-image: linear-gradient(to right, #d9d2cc, #d5c5b6, #d1b8a0, #cbab8b, #c59e76, #c59e76, #c59e76, #c59e76, #cbab8b, #d1b8a0, #d5c5b6, #d9d2cc);

  #panel-wrapper
    padding: 2rem 3rem 2rem 3rem

  .option
    transform: scale(1.2)

  .option-label
    transform: scale(0.7)
    margin-left: 0.3rem

  #result-mask
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, 0.5)
    z-index: 100

  #result-wrapper
    transform: translateX(5%)

  #result-closer
    position: absolute
    right: 1.2rem
    top: 2.9rem
    width: 3rem
    height: 3rem
    opacity: 0
    z-index: 200

  .poem-text
    font-size: 1.4rem
    font-weight: normal

  #result-text-wrapper
    padding: 8rem 8.6rem 6rem 4.5rem
</style>
