<template>
  <v-container fluid fill-height id="wrapper">
    <v-layout column>
      <v-flex xs8>
        <v-container fluid fill-height pa-0 pl-4 pr-4>
          <v-layout column justify-center >
            <v-flex xs2>
              <label for="text-input"></label>
              <input type="text" id="text-input"
                     :placeholder="inputHint"
                     v-model="textInput"
              />
              <input id="photo-file" ref="photo_file"
                     type="file" accept="image/*"
                     style="display: none"
                     @change="onFileChange"
              >
            </v-flex>
            <v-flex xs1>
              <v-container fluid fill-height pa-0>
                <v-layout row justify-center align-center>
                  <v-flex xs12>
                    <p class="body-1 ma-0">格式</p>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
            <v-flex xs1>
              <v-container fluid fill-height pa-0 pl-4 pr-4>
                <v-layout row wrap justify-space-between align-center>
                  <v-flex xs-4>
                    <v-container fluid fill-height pa-0>
                      <v-layout row justify-start align-center>
                        <v-flex xs4>
                          <input id="check-five" type="checkbox"
                                 v-model="isFive" @change="isSeven = !isSeven"
                          />
                        </v-flex>
                        <v-flex xs8>
                          <label for="check-five">五言</label>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex xs-4>
                    <v-container fluid fill-height pa-0>
                      <v-layout row justify-start align-center>
                        <v-flex xs4>
                          <input id="check-seven" type="checkbox"
                                 v-model="isSeven" @change="isFive = !isFive"
                          />
                        </v-flex>
                        <v-flex xs8>
                          <label for="check-seven">七言</label>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
            <v-flex xs1>
              <v-container fluid fill-height pa-0>
                <v-layout row justify-center align-center>
                  <v-flex xs12>
                    <p class="body-1 ma-0">类型</p>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
            <v-flex xs1>
              <v-container fluid fill-height pa-0 pl-4 pr-4>
                <v-layout row wrap justify-space-between align-center>
                  <v-flex xs-4>
                    <v-container fluid fill-height pa-0>
                      <v-layout row justify-start align-center>
                        <v-flex xs4>
                          <input id="check-jueju" type="checkbox"
                                 v-model="isJueju" @change="isCangtou = !isCangtou"
                          />
                        </v-flex>
                        <v-flex xs8>
                          <label for="check-jueju">绝句</label>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex xs-4>
                    <v-container fluid fill-height pa-0>
                      <v-layout row justify-start align-center>
                        <v-flex xs4>
                          <input id="check-cangtou" type="checkbox"
                                 v-model="isCangtou" @change="isJueju = !isJueju"
                          />
                        </v-flex>
                        <v-flex xs8>
                          <label for="check-cangtou">藏头</label>
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
      <v-flex xs4>
        <v-container fluid fill-height pa-0>
          <v-layout row justify-end align-end>
            <v-flex xs4>
              <v-container fluid fill-height pa-0>
                <v-layout column justify-center>
                  <v-flex xs4 pa-2>
                    <ink-button
                      tag="作诗"
                      @click="onTextGoClick()"
                    ></ink-button>
                  </v-flex>
                  <v-flex xs4 pa-2>
                    <ink-button
                      tag="拍照"
                      @click="$refs.photo_file.click()"
                    ></ink-button>
                  </v-flex>
                  <v-flex xs4 pa-2>
                    <ink-button
                      tag="返回"
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
import { isChinese } from '@/helpers'
import {
  POEM_SET_GEN_METHOD, POEM_SET_TEXT_INPUT,
  POEM_SET_IS_CANGTOU, POEM_SET_NUM_WORDS,
  POEM_SET_PHOTO_FILE
} from '@/mutation-types'

export default {
  name: 'GenHome',
  data () {
    return {
      textInput: '',
      isFive: false,
      isSeven: false,
      isJueju: false,
      isCangtou: false
    }
  },
  computed: {
    ...mapState({
      textInputHistory: state => state.poem.textInput,
      numberOfWordsHistory: state => state.poem.numberOfWords,
      isCangtouHistory: state => state.poem.isCangtou
    }),
    inputHint () {
      if (this.isJueju) {
        return '输入关键词（2-4个字）'
      } else {
        return '输入关键词（1-4个字）'
      }
    }
  },
  methods: {
    ...mapActions([
      'showInfo',
      'showError'
    ]),
    saveCommonSettings () {
      this.$store.commit(POEM_SET_IS_CANGTOU, this.isCangtou)
      if (this.isFive) {
        this.$store.commit(POEM_SET_NUM_WORDS, 5)
      } else {
        this.$store.commit(POEM_SET_NUM_WORDS, 7)
      }
    },
    onTextGoClick () {
      if (this.textInput.length === 0) {
        this.showError('请输入关键词')
        return
      }
      if (this.isJueju) { // 2-4
        if (this.textInput.length < 2 || this.textInput.length > 4) {
          this.showError('关键词必须在 2-4 个字符之间')
          return
        }
      } else { // 1-4
        if (this.textInput.length < 1 || this.textInput.length > 4) {
          this.showError('关键词必须在 1-4 个字符之间')
          return
        }
      }
      if (!isChinese(this.textInput)) {
        this.showError('关键词只能包含中文')
        return
      }
      this.$store.commit(POEM_SET_GEN_METHOD, 'text')
      this.$store.commit(POEM_SET_TEXT_INPUT, this.textInput)
      this.saveCommonSettings()
      this.$router.push('/poem/result')
    },
    onFileChange (e) {
      if (e.target.files.length !== 1) {
        return false
      }
      const file = e.target.files[0]
      this.$store.commit(POEM_SET_GEN_METHOD, 'photo')
      this.$store.commit(POEM_SET_PHOTO_FILE, file)
      this.saveCommonSettings()
      this.$router.push('/poem/result')
    }
  },
  mounted () {
    this.textInput = this.textInputHistory
    if (this.numberOfWordsHistory === 5) {
      this.isFive = true
    } else {
      this.isSeven = true
    }
    this.isCangtou = this.isCangtouHistory
    this.isJueju = !this.isCangtouHistory
  }
}
</script>

<style scoped lang="stylus">
  @import '~@/styles/input-text-fill-width'

  #wrapper
    background-image: url("~@/assets/poem/bg.jpg")
    background-repeat: no-repeat
    background-size: 100% 100%
    padding: 1rem

  input[type=checkbox]
    transform: scale(1.5)
</style>
