<template>
  <v-container fluid fill-height id="wrapper">
    <v-layout column>
      <v-flex xs8>
        <v-container fluid fill-height pa-0 pl-4 pr-4>
          <v-layout column justify-center >
            <v-flex xs2>
              <label for="text-input"></label>
              <div style="position: relative">
                <a
                  class="input-cleaner"
                  v-show="textInput != null && textInput.length > 0"
                  @click="textInput = ''"
                >
                  <v-icon>close</v-icon>
                </a>
                <input type="text" id="text-input"
                       :placeholder="inputHint"
                       v-model="textInput"
                />
              </div>
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
                    <p class="ma-0 simsun" style="font-size: 16px">类型</p>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
            <v-flex xs1>
              <v-container fluid fill-height pa-0 pl-4 pr-4>
                <v-layout row wrap justify-space-between align-center>
                  <v-flex xs-4>
                    <v-checkbox
                      v-model="isKeyword"
                      color="gray"
                      class="pa-0 ma-0"
                    >
                      <template v-slot:label>
                        <label class="simsun black--text">关键词</label>
                      </template>
                    </v-checkbox>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex xs-4>
                    <v-checkbox
                      v-model="isShanglian"
                      color="gray"
                      class="pa-0 ma-0"
                    >
                      <template v-slot:label>
                        <label class="simsun black--text">上联</label>
                      </template>
                    </v-checkbox>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs2>
        <v-container fluid fill-height pa-0>
          <v-layout row justify-space-between align-end>
            <v-flex xs2 pb-2>
              <v-img src="~@/assets/common/niutrans_logo.png"
                     :contain="true"
                     width="3rem"
              ></v-img>
            </v-flex>
            <v-flex xs4>
              <v-container fluid fill-height pa-0>
                <v-layout column justify-center align-end>
                  <v-flex xs4 pa-2 style="width: 75%">
                    <ink-button
                      tag="生成"
                      @click="onTextGoClick()"
                    ></ink-button>
                  </v-flex>
                  <v-flex xs4 pa-2 style="width: 75%">
                    <ink-button
                      tag="拍照"
                      @click="$refs.photo_file.click()"
                    ></ink-button>
                  </v-flex>
                  <v-flex xs4 pa-2 style="width: 75%">
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
      <v-spacer></v-spacer>
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
  watch: {
    isShanglian (newValue, oldValue) {
      const desiredValue = !newValue
      if (this.isKeyword !== desiredValue) {
        this.isKeyword = desiredValue
      }
    },
    isKeyword (newValue, oldValue) {
      const desiredValue = !newValue
      if (this.isShanglian !== desiredValue) {
        this.isShanglian = desiredValue
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
  @import '~@/styles/input-cleaner'

  #wrapper
    background-image: url("~@/assets/duilian/bg.jpg")
    background-repeat: no-repeat
    background-size: 100% 100%
    padding: 1rem

  input[type=checkbox]
    transform: scale(1.5)
</style>
