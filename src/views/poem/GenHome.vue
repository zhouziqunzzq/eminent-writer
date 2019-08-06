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
                    <p class="ma-0 simsun" style="font-size: 16px">格式</p>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
            <v-flex xs1>
              <v-container fluid fill-height pa-0 pl-4 pr-4>
                <v-layout row wrap justify-space-between align-center>
                  <v-flex xs-4>
                    <v-checkbox
                      v-model="isFive"
                      color="gray"
                      class="pa-0 ma-0"
                    >
                      <template v-slot:label>
                        <label class="simsun black--text">五言</label>
                      </template>
                    </v-checkbox>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex xs-4>
                    <v-checkbox
                      v-model="isSeven"
                      color="gray"
                      class="pa-0 ma-0"
                    >
                      <template v-slot:label>
                        <label class="simsun black--text">七言</label>
                      </template>
                    </v-checkbox>
                  </v-flex>
                </v-layout>
              </v-container>
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
                      v-model="isJueju"
                      color="gray"
                      class="pa-0 ma-0"
                    >
                      <template v-slot:label>
                        <label class="simsun black--text">绝句</label>
                      </template>
                    </v-checkbox>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex xs-4>
                    <v-checkbox
                      v-model="isCangtou"
                      color="gray"
                      class="pa-0 ma-0"
                    >
                      <template v-slot:label>
                        <label class="simsun black--text">藏头</label>
                      </template>
                    </v-checkbox>
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
                      tag="作诗"
                      @click="onTextGoClick()"
                    ></ink-button>
                  </v-flex>
                  <v-flex xs4 pa-2 style="width: 75%">
                    <ink-button
                      tag="拍照"
                      @click="$refs.photo_file.click()"
                      :disable="disablePhoto"
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
        return '输入藏头（1-4个字）'
      }
    },
    disablePhoto () {
      return this.isCangtou
    }
  },
  watch: {
    isFive (newValue, oldValue) {
      const desiredValue = !newValue
      if (this.isSeven !== desiredValue) {
        this.isSeven = desiredValue
      }
    },
    isSeven (newValue, oldValue) {
      const desiredValue = !newValue
      if (this.isFive !== desiredValue) {
        this.isFive = desiredValue
      }
    },
    isJueju (newValue, oldValue) {
      const desiredValue = !newValue
      if (this.isCangtou !== desiredValue) {
        this.isCangtou = desiredValue
      }
    },
    isCangtou (newValue, oldValue) {
      const desiredValue = !newValue
      if (this.isJueju !== desiredValue) {
        this.isJueju = desiredValue
      }
    }
  },
  methods: {
    ...mapActions([
      'showInfo',
      'showError'
    ]),
    testLog (s) {
      console.log(s)
    },
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
  @import '~@/styles/input-cleaner'

  #wrapper
    background-image: url("~@/assets/poem/bg.jpg")
    background-repeat: no-repeat
    background-size: 100% 100%
    padding: 1rem

  input[type=checkbox]
    transform: scale(1.5)
</style>
