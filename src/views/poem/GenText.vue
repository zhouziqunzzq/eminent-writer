<template>
  <v-container fluid fill-height id="wrapper">
    <v-layout column>
      <v-flex xs4>
        <v-container fluid fill-height pa-0>
          <v-layout column justify-end>
            <v-flex xs4>
              <v-container fluid fill-height pa-0>
                <v-layout row justify-center>
                  <v-flex xs12 md8 lg5>
                    <v-img src="~@/assets/poem/bg-text-input.png">
                      <v-container fluid fill-height id="text-input-wrapper">
                        <v-layout row wrap justify-center align-center>
                          <v-flex xs8>
                            <label for="text-input"></label>
                            <input type="text" id="text-input"
                                   placeholder="请输入关键词"
                                   v-model="textInput"
                            />
                            <v-icon large
                                    id="text-input-cleaner"
                                    v-show="textInput.length !== 0"
                                    @click="textInput = ''"
                            >close</v-icon>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-img>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs8>
        <v-container fluid fill-height pa-0>
          <v-layout column justify-begin>
            <v-flex xs4>
              <v-container fluid fill-height pa-0>
                <v-layout row justify-center>
                  <v-flex xs12 md8 lg5>
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
                                <v-flex xs4 cursor-pointer @click="onTextGoClick">
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
        <v-layout column justify-center
                  v-show="isReady"
                  style="position: relative">
          <v-flex xs6>
            <v-container fluid fill-height pa-0>
              <v-layout row justify-center>
                <v-flex xs12 md8 lg7>
                  <v-img src="~@/assets/poem/bg-result.png"
                         id="result-wrapper"
                         :contain="true">
                    <v-container fluid fill-height id="result-text-wrapper">
                      <v-layout column justify-center>
                        <v-flex xs1
                                v-for="(v, i) in myPoems[poemPtr]"
                                :key="v + i.toString()"
                        >
                          <v-container fluid fill-height pa-0>
                            <v-layout row justify-center>
                              <v-flex xs1
                                      v-for="(c, j) in v"
                                      :key="c + j.toString()"
                                      :class="{
                                  'poem-text-wrapper-5': numberOfWords === 5,
                                  'poem-text-wrapper-7': numberOfWords === 7,
                                  'poem-text-cangtou': isCangtou && i < textInput.length && j === 0
                                }"
                              >
                                <h5 class="poem-text text-xs-center xingkai">{{c}}</h5>
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </v-flex>
                        <v-img src="~@/assets/poem/button-close.png"
                               :width="45"
                               :height="45"
                               :contain="true"
                               id="result-closer"
                               class="cursor-pointer"
                               @click="showResult = false"></v-img>
                      </v-layout>
                    </v-container>
                  </v-img>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
          <v-flex xs2 id="result-button-wrapper">
            <v-container fluid fill-height pa-0>
              <v-layout row justify-center>
                <v-flex xs1 mr-4 @click="share" class="cursor-pointer">
                  <v-img src="~@/assets/poem/button-share.png"></v-img>
                </v-flex>
                <v-flex xs1 ml-4 @click="onRegenerateClick" class="cursor-pointer">
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
    padding: 5% 12% 8% 26.5%
    position: relative

  #text-input
    font-size: 2.6rem

  #text-input-cleaner
    position: absolute
    right: 14%
    top: 35.5%
    color: #BC8E5A

  #hr-line
    background-image: linear-gradient(to right, #d9d2cc, #d5c5b6, #d1b8a0, #cbab8b, #c59e76, #c59e76, #c59e76, #c59e76, #cbab8b, #d1b8a0, #d5c5b6, #d9d2cc);

  #panel-wrapper
    padding: 10% 12% 10% 12%

  .option
    transform: scale(1.0)
    cursor: pointer

  .option-label
    transform: scale(0.6)
    margin-left: 0.3rem

  #result-mask
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    background-color: #313131BB
    z-index: 100

  #result-wrapper
    transform: translateX(8%)

  #result-closer
    position: absolute
    right: 16.6%
    top: 18%
    width: 3rem
    height: 3rem
    z-index: 200

  .poem-text
    font-size: 3.2rem
    font-weight: normal

  .poem-text-wrapper-5
    margin-right: -0.2rem

  .poem-text-wrapper-7
    margin-right: -0.6rem

  .poem-text-cangtou
    color: red

  #result-text-wrapper
    padding: 20% 26.5% 38.5% 10%
    position: relative

  #result-button-wrapper
    position: absolute
    width: 100%
    bottom: 25%

  .cursor-pointer
    cursor: pointer
</style>
