<template>
  <v-container fluid fill-height id="wrapper">
    <v-layout column>
      <v-flex xs7>
        <v-container fluid fill-height pa-0>
          <v-layout column justify-end>
            <v-flex xs1>
              <h5 class="text-xs-center headline
              font-weight-bold brown--text text--darken-2">是否生成藏头诗</h5>
            </v-flex>
            <v-flex xs2 mt-2>
              <v-container fluid fill-height pa-0>
                <v-layout row justify-center>
                  <v-flex xs6 pl-4 pr-2>
                    <a @click="onYesClick()"
                       v-show="isCangtou === false">
                      <v-img src="~@/assets/poem/button-yes.png"></v-img>
                    </a>
                    <v-img src="~@/assets/poem/button-yes-chosen.png"
                           v-show="isCangtou === true"></v-img>
                  </v-flex>
                  <v-flex xs6 pl-2 pr-4>
                    <a @click="onNoClick()"
                       v-show="isCangtou === true">
                      <v-img src="~@/assets/poem/button-no.png"></v-img>
                    </a>
                    <v-img src="~@/assets/poem/button-no-chosen.png"
                           v-show="isCangtou === false"></v-img>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
            <v-flex xs1 mt-2>
              <h5 class="text-xs-center headline
            font-weight-bold brown--text text--darken-2">输入生成诗歌字数</h5>
            </v-flex>
            <v-flex xs2>
              <v-container fluid fill-height pa-0>
                <v-layout row justify-center>
                  <v-flex xs6 pa-3>
                    <v-img src="~@/assets/poem/bg-number-of-words-area.png">
                      <v-container fluid fill-height pa-0>
                        <v-layout row wrap justify-center align-center>
                          <v-flex xs2>
                            <v-text-field
                              label=""
                              v-model="numberOfWords"
                            ></v-text-field>
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
      <v-flex xs4>
        <v-container fluid fill-height>
          <v-layout row wrap justify-center align-center>
            <v-flex xs4 sm2 pl-4 pr-1>
              <a @click="$router.go(-1)">
                <v-img src="~@/assets/common/button-back.png"></v-img>
              </a>
            </v-flex>
            <v-flex xs4 sm2 pa-0>
              <a @click="onGoClick()">
                <v-img src="~@/assets/poem/button-go.png"></v-img>
              </a>
            </v-flex>
            <v-flex xs4 sm2 pl-1 pr-4>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="js">
import { mapState, mapActions } from 'vuex'
import {
  POEM_SET_IS_CANGTOU,
  POEM_SET_NUM_WORDS
} from '@/mutation-types'

export default {
  name: 'GenSettings',
  data () {
    return {
      numberOfWords: 5
    }
  },
  computed: {
    ...mapState({
      genMethod: state => state.poem.genMethod,
      textInput: state => state.poem.textInput,
      isCangtou: state => state.poem.isCangtou,
      numberOfWordsHistory: state => state.poem.numberOfWords
    })
  },
  methods: {
    ...mapActions([
      'showInfo',
      'showError'
    ]),
    onYesClick () {
      this.$store.commit(POEM_SET_IS_CANGTOU, true)
    },
    onNoClick () {
      this.$store.commit(POEM_SET_IS_CANGTOU, false)
    },
    onGoClick () {
      if (this.genMethod === 'text' && !this.isCangtou) {
        if (this.textInput.length < 2) {
          this.showError('关键词生成绝句时，关键词至少包含两个字，请返回修改')
          return
        }
      }
      if (this.numberOfWords !== '5' && this.numberOfWords !== '7' &&
          this.numberOfWords !== 5 && this.numberOfWords !== 7) {
        console.log(this.numberOfWords)
        this.showError('诗歌字数只能为 5 或 7')
        return
      }
      this.$store.commit(POEM_SET_NUM_WORDS, this.numberOfWords)
      this.$router.push('/poem/result')
    }
  },
  mounted () {
    this.numberOfWords = this.numberOfWordsHistory
  }
}
</script>

<style scoped lang="stylus">
  #wrapper
    background-image: url("~@/assets/poem/bg-settings.png")
    background-repeat: no-repeat
    background-size: 100% 100%
    padding: 1em 3em
</style>
