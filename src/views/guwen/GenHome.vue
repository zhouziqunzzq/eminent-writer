<template>
  <v-container fluid fill-height id="wrapper">
    <v-layout column justify-center>
      <v-flex xs8>
        <v-container fluid fill-height pa-0 pl-4 pr-4>
          <v-layout column justify-start align-center>
            <v-flex xs8 style="width: 95%">
              <v-img src="~@/assets/guwen/bg-text-input.png" :contain="true">
                <v-container fluid fill-height class="textarea-wrapper">
                  <v-layout row wrap justify-center align-center>
                    <v-flex xs9 fill-height>
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
      <v-flex xs4 pb-4>
        <v-container fluid fill-height pa-0>
          <v-layout row justify-space-between align-end>
            <v-flex xs2 pb-2>
              <v-img src="~@/assets/common/niutrans_logo.png"
                     :contain="true"
                     width="3rem"
              ></v-img>
            </v-flex>
            <v-flex xs4 fill-height>
              <v-container fluid fill-height pa-0>
                <v-layout column justify-end align-end>
                  <v-flex xs2 pa-1 style="width: 78%">
                    <ink-button
                      :tag="buttonHint"
                      @click="direction = (direction === 1 ? 2 : 1)"
                      animation-number="4" animation-delay="0s"
                    ></ink-button>
                  </v-flex>
                  <v-flex xs2 pa-1 style="width: 78%">
                    <ink-button
                      tag="翻译"
                      @click="onTextGoClick()"
                      animation-number="4" animation-delay="1s"
                    ></ink-button>
                  </v-flex>
                  <v-flex xs2 pa-1 style="width: 78%">
                    <ink-button
                      tag="拍照"
                      @click="$refs.photo_file.click()"
                      animation-number="4" animation-delay="2s"
                    ></ink-button>
                  </v-flex>
                  <v-flex xs2 pa-1 style="width: 78%">
                    <ink-button
                      tag="返回"
                      @click="$router.push('/')"
                      animation-number="4" animation-delay="3s"
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
import { postForm } from '@/helpers'
import { guwenPictureURL } from '@/config'
import {
  GUWEN_SET_TEXT_INPUT, GUWEN_SET_DIRECTION
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
      this.$store.commit(GUWEN_SET_TEXT_INPUT, this.textInput)
      this.saveCommonSettings()
      this.$router.push('/guwen/result')
    },
    async onFileChange (e) {
      if (e.target.files.length !== 1) {
        return false
      }
      const file = e.target.files[0]
      this.textInput = '正在识别，请稍等...'
      try {
        const response = await postForm(guwenPictureURL, {
          'photo': file,
          'type': '1'
        })
        if (!response.parsedBody.result) {
          this.textInput = ''
          this.showError(response.parsedBody.msg)
        } else {
          this.textInput = response.parsedBody.data
        }
      } catch (e) {
        this.textInput = ''
        this.showError(e)
      }
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
