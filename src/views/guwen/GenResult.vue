<template>
  <v-container fluid fill-height id="wrapper">
    <!--    loader-->
    <v-layout row justify-center align-center v-if="!isReady">
      <v-flex xs3>
        <single-loader></single-loader>
      </v-flex>
    </v-layout>
<!--    result-->
    <v-layout column justify-center v-else>
      <v-flex xs9>
        <v-container fluid fill-height pa-0>
          <v-layout column justify-end>
            <v-flex xs1>
              <h5 class="headline text-xs-center
                font-weight-bold brown--text text--darken-2"
              >- 以下是生成的译文 -</h5>
            </v-flex>
            <v-flex xs8 pa-4>
              <v-img src="~@/assets/guwen/bg-text-input.png">
                <v-container fluid fill-height class="guwen-wrapper">
                  <v-layout row wrap justify-center align-center>
                    <v-flex xs8>
<!--                      <v-textarea-->
<!--                        :value="transResult"-->
<!--                        :no-resize="true"-->
<!--                        :rows="13"-->
<!--                        :readonly="true"-->
<!--                      ></v-textarea>-->
                      <label for="trans-result"></label>
                      <textarea
                        id="trans-result"
                        v-model="transResult"
                        rows="14"
                        readonly
                      ></textarea>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-img>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs3>
        <v-container fluid fill-height pa-0>
          <v-layout row justify-center>
            <v-flex xs4>
              <router-link to="/">
                <v-img src="~@/assets/common/button-back-to-home.png"></v-img>
              </router-link>
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
import { guwenTextURL, guwenPictureURL } from '@/config'
import singleLoader from '@/components/SingleLoader'

export default {
  name: 'GenResult',
  components: {
    singleLoader
  },
  data () {
    return {
      transResult: '庆历四年春，滕子京谪守巴陵郡。' +
        '越明年，政通人和，百废具兴。' +
        '乃重修岳阳楼，增其旧制，刻唐贤今人诗赋于其上。属予作文以记之。',
      isReady: false
    }
  },
  computed: {
    ...mapState({
      genMethod: state => state.guwen.genMethod,
      textInput: state => state.guwen.textInput,
      photoFile: state => state.guwen.photoFile
    })
  },
  methods: {
    ...mapActions([
      'showInfo',
      'showError'
    ])
  },
  async mounted () {
    // console.log(this.genMethod)
    // console.log(this.textInput)
    // console.log(this.photoFile)
    if (this.genMethod === 'text') {
      try {
        const response = await postJson(guwenTextURL, {
          input: this.textInput,
          type: 1
        })
        if (response.parsedBody.result) {
          this.showInfo(response.parsedBody.msg)
          this.transResult = response.parsedBody.data
          this.isReady = true
        } else {
          this.showError(response.parsedBody.msg)
        }
      } catch (e) {
        this.showError(e)
      }
    } else if (this.genMethod === 'photo') {
      try {
        const response = await postForm(guwenPictureURL, {
          'photo': this.photoFile,
          'type': String(1)
        })
        if (response.parsedBody.result) {
          this.showInfo(response.parsedBody.msg)
          this.transResult = response.parsedBody.data
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
  @import '~@/styles/textarea-center'

  #wrapper
    background-image: url("~@/assets/guwen/bg-result.png")
    background-repeat: no-repeat
    background-size: 100% 100%
    padding: 15% 3em 1em 3em

  .guwen-wrapper
    padding: 10% 3% 13.5% 0

  .guwen-container
    overflow: scroll
</style>
