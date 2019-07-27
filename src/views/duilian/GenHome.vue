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
                    <p class="body-1 ma-0 simsun">类型</p>
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
                          <input id="check-shanglian" type="checkbox"
                                 v-model="isShanglian" @change="isKeyword = !isKeyword"
                          />
                        </v-flex>
                        <v-flex xs8>
                          <label class="simsun" for="check-shanglian">上联</label>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex xs-4>
                    <v-container fluid fill-height pa-0>
                      <v-layout row justify-start align-center>
                        <v-flex xs4>
                          <input id="check-keyword" type="checkbox"
                                 v-model="isKeyword" @change="isShanglian = !isShanglian"
                          />
                        </v-flex>
                        <v-flex xs8>
                          <label class="simsun" for="check-keyword">关键词</label>
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
                      tag="生成"
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
import { isChinese, isChineseAndPunc } from '@/helpers'
import {
  DUILIAN_SET_GEN_METHOD, DUILIAN_SET_TEXT_INPUT,
  DUILIAN_SET_PHOTO_FILE, DUILIAN_SET_IS_KEYWORD
} from '@/mutation-types'

export default {
  name: 'GenHome',
  data () {
    return {
      textInput: '',
      isShanglian: false,
      isKeyword: false
    }
  },
  computed: {
    ...mapState({
      textInputHistory: state => state.duilian.textInput,
      isKeywordHistory: state => state.duilian.isKeyword
    }),
    inputHint () {
      if (this.isShanglian) {
        return '输入上联（1-10个字）'
      } else {
        return '输入关键词（2-4个字）'
      }
    }
  },
  methods: {
    ...mapActions([
      'showInfo',
      'showError'
    ]),
    saveCommonSettings () {
      this.$store.commit(DUILIAN_SET_IS_KEYWORD, this.isKeyword)
    },
    onTextGoClick () {
      if (this.textInput.length === 0) {
        this.showError('请输入上联或关键词')
        return
      }
      if (this.isShanglian) { // 1-10
        if (this.textInput.length < 1 || this.textInput.length > 10) {
          this.showError('上联必须在 1-10 个字符之间')
          return
        }
        if (!isChineseAndPunc(this.textInput)) {
          this.showError('上联只能包含中文和中文标点')
          return
        }
      } else { // 2-4
        if (this.textInput.length < 2 || this.textInput.length > 4) {
          this.showError('关键词必须在 2-4 个字符之间')
          return
        }
        if (!isChinese(this.textInput)) {
          this.showError('关键词只能包含中文')
          return
        }
      }
      this.$store.commit(DUILIAN_SET_GEN_METHOD, 'text')
      this.$store.commit(DUILIAN_SET_TEXT_INPUT, this.textInput)
      this.saveCommonSettings()
      this.$router.push('/duilian/result')
    },
    onFileChange (e) {
      if (e.target.files.length !== 1) {
        return false
      }
      const file = e.target.files[0]
      this.$store.commit(DUILIAN_SET_GEN_METHOD, 'photo')
      this.$store.commit(DUILIAN_SET_PHOTO_FILE, file)
      this.saveCommonSettings()
      this.$router.push('/duilian/result')
    }
  },
  mounted () {
    this.textInput = this.textInputHistory
    this.isShanglian = !this.isKeywordHistory
    this.isKeyword = this.isKeywordHistory
  }
}
</script>

<style scoped lang="stylus">
  @import '~@/styles/input-text-fill-width'

  #wrapper
    background-image: url("~@/assets/duilian/bg.jpg")
    background-repeat: no-repeat
    background-size: 100% 100%
    padding: 1rem

  input[type=checkbox]
    transform: scale(1.5)
</style>
