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
            <v-flex :class="{ 'xs7': numberOfWords === 5, 'xs9': numberOfWords === 7 }">
                <v-container fluid fill-height class="poem-wrapper">
                  <v-layout row justify-center align-center reverse>
                    <v-flex
                      xs1
                      v-for="(v, i) in myPoem"
                      :key="i"
                      ml-3 mr-3
                    >
                      <v-container fluid fill-height pa-0>
                        <v-layout column justify-center>
                          <v-flex
                            xs1
                            v-for="(c, ii) in v"
                            :key="ii"
                          >
                            <h5 class="headline text-xs-center kaiti">{{c}}</h5>
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
            :class="{'justify-space-between': genMethod === 'text',
                     'justify-end': genMethod === 'photo'}"
          >
            <template v-if="genMethod === 'text'">
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
import { poemKeyURL, poemAcrosticURL, poemPictureURL } from '@/config'
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
      myPoem: [
        '千山鸟飞绝',
        '万径人踪灭',
        '孤舟蓑笠翁',
        '独钓寒江雪'
      ],
      isReady: false
    }
  },
  computed: {
    ...mapState({
      genMethod: state => state.poem.genMethod,
      textInput: state => state.poem.textInput,
      photoFile: state => state.poem.photoFile,
      isCangtou: state => state.poem.isCangtou,
      numberOfWords: state => state.poem.numberOfWords
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
    // console.log(this.isCangtou)
    // console.log(this.numberOfWords)
    if (this.genMethod === 'text') {
      const apiURL = this.isCangtou ? poemAcrosticURL : poemKeyURL
      try {
        const response = await postJson(apiURL, {
          input: this.textInput,
          type: Number(this.numberOfWords)
        })
        if (response.parsedBody.result) {
          this.showInfo(response.parsedBody.msg)
          this.myPoem = response.parsedBody.data
          this.isReady = true
        } else {
          this.showError(response.parsedBody.msg)
        }
      } catch (e) {
        this.showError(e)
      }
    } else if (this.genMethod === 'photo') {
      try {
        const response = await postForm(poemPictureURL, {
          'photo': this.photoFile,
          'type': String(this.numberOfWords)
        })
        if (response.parsedBody.result) {
          this.showInfo(response.parsedBody.msg)
          this.myPoem = response.parsedBody.data
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
    background-image: url("~@/assets/home/bg.jpg")
    background-repeat: no-repeat
    background-size: 100% 100%
    padding: 1rem

  .poem-wrapper
    padding: 0
    background-color: rgba(255, 255, 255, 0.6)
</style>
