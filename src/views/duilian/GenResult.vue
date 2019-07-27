<template>
  <v-container fluid fill-height id="wrapper">
    <!--    loader-->
    <v-layout row justify-center align-center v-if="!isReady">
      <v-flex xs3>
        <single-loader></single-loader>
      </v-flex>
    </v-layout>
<!--    result-->
    <v-layout column v-else>
      <v-flex xs8>
        <v-container fluid fill-height style="padding: 10% 15%">
          <v-layout column justify-end>
            <v-flex xs10>
              <v-container fluid fill-height class="duilian-wrapper">
                <v-layout column justify-center>
                  <v-flex xs3>
                    <v-container fluid fill-height pa-0 pt-4>
                      <v-layout row justify-center align-center reverse>
                        <h5 v-for="(c, i) in hengpi"
                            class="headline kaiti" :key="i">
                          {{c}}
                        </h5>
                      </v-layout>
                    </v-container>
                  </v-flex>
                  <v-flex xs9>
                    <v-container fluid fill-height pa-0 pl-4 pr-4 pb-4>
                      <v-layout row justify-space-between align-center reverse>
                        <v-flex xs4>
                          <v-container fluid fill-height pa-0>
                            <v-layout column justify-center align-center>
                              <h5 v-for="(c, i) in shanglian"
                                  class="headline kaiti" :key="i">
                                {{c}}
                              </h5>
                            </v-layout>
                          </v-container>
                        </v-flex>
                        <v-flex xs4>
                          <v-container fluid fill-height pa-0>
                            <v-layout column justify-center align-center>
                              <h5 v-for="(c, i) in xialian"
                                  class="headline kaiti" :key="i">
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
      <v-flex xs4>
        <v-container fluid fill-height pa-0>
          <v-layout row align-end
                    :class="{'justify-space-between': genMethod === 'text' && isKeyword,
                     'justify-end': genMethod === 'photo' || !isKeyword}"
          >
            <template v-if="genMethod === 'text' && isKeyword">
              <v-flex xs2 align-self-end v-if="textInput.length <= 3">
                <small-stamp :text="textInput"></small-stamp>
              </v-flex>
              <v-flex xs3 align-self-end v-else>
                <big-stamp :text="textInput"></big-stamp>
              </v-flex>
            </template>
            <v-flex xs4>
              <v-container fluid fill-height pa-0>
                <v-layout column justify-center>
                  <v-flex xs4 pa-2>
                    <ink-button
                      tag="重新生成"
                      font-size="16px"
                      @click="$router.go(-1)"
                    ></ink-button>
                  </v-flex>
                  <v-flex xs4 pa-2>
                    <ink-button
                      tag="分享"
                      @click="showInfo('暂未实现，敬请期待...')"
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
import { postForm, postJson } from '@/helpers'
import { duilianDuiURL, duilianKeyURL, duilianPictureURL } from '@/config'
import singleLoader from '@/components/SingleLoader'
import smallStamp from '@/components/SmallStamp.vue'
import bigStamp from '@/components/BigStamp.vue'

export default {
  name: 'GenResult',
  components: {
    singleLoader,
    smallStamp,
    bigStamp
  },
  data () {
    return {
      hengpi: '小牛雅颂',
      shanglian: '旧岁又添几个喜',
      xialian: '新年更上一层楼',
      isReady: false
    }
  },
  computed: {
    ...mapState({
      genMethod: state => state.duilian.genMethod,
      textInput: state => state.duilian.textInput,
      photoFile: state => state.duilian.photoFile,
      isKeyword: state => state.duilian.isKeyword
    })
  },
  methods: {
    ...mapActions([
      'showInfo',
      'showError'
    ])
  },
  async mounted () {
    if (this.genMethod === 'text') {
      try {
        const apiURL = this.isKeyword ? duilianKeyURL : duilianDuiURL
        const response = await postJson(apiURL, {
          input: this.textInput
        })
        if (response.parsedBody.result) {
          this.showInfo(response.parsedBody.msg)
          this.shanglian = response.parsedBody.data.shanglian
          this.xialian = response.parsedBody.data.xialian
          this.hengpi = '小牛雅颂'
          this.isReady = true
        } else {
          this.showError(response.parsedBody.msg)
        }
      } catch (e) {
        this.showError(e)
      }
    } else if (this.genMethod === 'photo') {
      try {
        const response = await postForm(duilianPictureURL, {
          'photo': this.photoFile
        })
        if (response.parsedBody.result) {
          this.showInfo(response.parsedBody.msg)
          this.shanglian = response.parsedBody.data.shanglian
          this.xialian = response.parsedBody.data.xialian
          this.hengpi = '小牛雅颂'
          this.isReady = true
        } else {
          this.showError(response.parsedBody.msg)
        }
      } catch (e) {
        this.showError(e)
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  #wrapper
    background-image: url("~@/assets/duilian/bg-result.jpg")
    background-repeat: no-repeat
    background-size: 100% 100%
    padding: 1rem

  .duilian-wrapper
    padding: 0
    background-color: rgba(255, 255, 255, 0.6)
</style>
