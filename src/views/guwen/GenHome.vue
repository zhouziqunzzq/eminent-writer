<template>
  <v-container fluid fill-height id="wrapper">
    <v-layout column justify-center>
      <v-flex xs9>
        <v-container fluid fill-height pa-0 pl-4 pr-4>
          <v-layout column justify-start align-center>
            <v-flex xs8 style="width: 95%">
              <v-img src="~@/assets/guwen/bg-text-input.png" :contain="true">
                <v-container fluid fill-height class="textarea-wrapper">
                  <v-layout row wrap justify-center align-center>
                    <v-flex xs9>
                      <a
                        style="position: absolute; bottom: 6%; right: 8%;"
                        v-show="textInput != null && textInput.length > 0"
                        @click="textInput = ''"
                      >
                        <v-icon>close</v-icon>
                      </a>
                      <label for="text-input"></label>
                      <textarea
                        id="text-input"
                        v-model="textInput"
                        rows="15"
                        :placeholder="inputHint"
                      ></textarea>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-img>
              <input id="photo-file" ref="photo_file"
                     type="file" accept="image/*"
                     style="display: none"
                     @change="onFileChange"
              >
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
            <v-flex xs4 fill-height>
              <v-container fluid fill-height pa-0>
                <v-layout column justify-end align-end>
                  <v-flex xs2 pa-0 style="width: 75%">
                    <ink-button
                      :tag="buttonHint"
                      font-size="14px"
                      @click="direction = (direction === 1 ? 2 : 1)"
                    ></ink-button>
                  </v-flex>
                  <v-flex xs2 pa-0 style="width: 75%">
                    <ink-button
                      tag="翻译"
                      font-size="14px"
                      @click="onTextGoClick()"
                    ></ink-button>
                  </v-flex>
                  <v-flex xs2 pa-0 style="width: 75%">
                    <ink-button
                      tag="拍照"
                      font-size="14px"
                      @click="$refs.photo_file.click()"
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
import { isChineseAndPunc } from '@/helpers'
import {
  GUWEN_SET_GEN_METHOD, GUWEN_SET_TEXT_INPUT,
  GUWEN_SET_PHOTO_FILE, GUWEN_SET_DIRECTION
} from '@/mutation-types'

export default {
  name: 'GenHome',
  data () {
    return {
      textInput: '',
      direction: 1
    }
  },
  computed: {
    ...mapState({
      textInputHistory: state => state.guwen.textInput,
      directionHistory: state => state.guwen.direction
    }),
    inputHint () {
      if (this.direction === 1) {
        return '请输入待翻译的古文...'
      } else {
        return '请输入待翻译的现代文...'
      }
    },
    buttonHint () {
      if (this.direction === 1) {
        return '现代文'
      } else {
        return '古文'
      }
    }
  },
  methods: {
    ...mapActions([
      'showInfo',
      'showError'
    ]),
    saveCommonSettings () {
      this.$store.commit(GUWEN_SET_DIRECTION, this.direction)
    },
    onTextGoClick () {
      if (this.textInput.length === 0) {
        this.showError('请输入待翻译的文章')
        return
      }
      if (!isChineseAndPunc(this.textInput)) {
        this.showError('文章只能包含中文和中文标点')
        return
      }
      this.$store.commit(GUWEN_SET_GEN_METHOD, 'text')
      this.$store.commit(GUWEN_SET_TEXT_INPUT, this.textInput)
      this.saveCommonSettings()
      this.$router.push('/guwen/result')
    },
    onFileChange (e) {
      if (e.target.files.length !== 1) {
        return false
      }
      const file = e.target.files[0]
      this.$store.commit(GUWEN_SET_GEN_METHOD, 'photo')
      this.$store.commit(GUWEN_SET_PHOTO_FILE, file)
      this.saveCommonSettings()
      this.$router.push('/guwen/result')
    }
  },
  mounted () {
    this.textInput = this.textInputHistory
    this.direction = this.directionHistory
  }
}
</script>

<style scoped lang="stylus">
  @import '~@/styles/textarea-center'

  #wrapper
    background-image: url("~@/assets/poem/bg.jpg")
    background-repeat: no-repeat
    background-size: 100% 100%
    padding: 1rem

  .textarea-wrapper
    position: relative
    padding: 10% 0
</style>
