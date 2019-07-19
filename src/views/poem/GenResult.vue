<template>
  <v-container fluid fill-height id="wrapper">
<!--    loader-->
    <v-layout row justify-center align-center v-if="!isReady">
      <v-flex xs3>
        <v-img src="~@/assets/loading.gif"></v-img>
      </v-flex>
    </v-layout>
<!--    result-->
    <v-layout column justify-center v-else>
      <v-flex xs8>
        <v-container fluid fill-height pa-0>
          <v-layout column justify-end>
            <v-flex xs8>
              <v-img src="~@/assets/poem/bg-poem-area.png">
                <v-container fluid fill-height class="poem-wrapper">
                  <v-layout column justify-center>
                    <v-flex
                      xs1
                      v-for="(v, i) in myPoem"
                      :key="i"
                      mb-1
                    >
                      <h5 class="headline text-xs-center">{{v}}</h5>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-img>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs4>
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
import { poemKeyURL, poemAcrosticURL, poemPictureURL } from '@/config'

export default {
  name: 'GenResult',
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
    console.log(this.genMethod)
    console.log(this.textInput)
    console.log(this.photoFile)
    console.log(this.isCangtou)
    console.log(this.numberOfWords)
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
    background-image: url("~@/assets/poem/bg-result.png")
    background-repeat: no-repeat
    background-size: 100% 100%
    padding: 15% 3em 1em 3em

  .poem-wrapper
    padding: 8% 6% 0 18%
</style>
