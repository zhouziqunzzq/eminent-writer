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
      <v-flex xs3>
        <v-container fluid fill-height pt-0 pb-1 pl-4 pr-4>
          <v-layout row justify-center align-end>
            <v-img src="~@/assets/duilian/bg-duilian-row.png">
              <v-container fluid fill-height pa-4>
                <v-layout row justify-center align-center reverse>
                  <h5 v-for="(c, i) in hengpi"
                      class="ma-1 headline font-weight-bold" :key="i">
                    {{c}}
                  </h5>
                </v-layout>
              </v-container>
            </v-img>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs6>
        <v-container fluid fill-height pa-0>
          <v-layout row align-center reverse>
            <v-flex xs4>
              <v-img src="~@/assets/duilian/bg-duilian-column.png">
                <v-container fluid fill-height class="duilian-column">
                  <v-layout column justify-center align-center>
                    <h5 v-for="(c, i) in shanglian"
                        class="ma-1 headline font-weight-bold" :key="i">
                      {{c}}
                    </h5>
                  </v-layout>
                </v-container>
              </v-img>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs4>
              <v-img src="~@/assets/duilian/bg-duilian-column.png">
                <v-container fluid fill-height class="duilian-column">
                  <v-layout column justify-center align-center>
                    <h5 v-for="(c, i) in xialian"
                        class="ma-1 headline font-weight-bold" :key="i">
                      {{c}}
                    </h5>
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
import { duilianKeyURL, duilianPictureURL } from '@/config'
import singleLoader from '@/components/SingleLoader'

export default {
  name: 'GenResult',
  components: {
    singleLoader
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
      photoFile: state => state.duilian.photoFile
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
        const response = await postJson(duilianKeyURL, {
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
    background-image: url("~@/assets/duilian/bg-result.png")
    background-repeat: no-repeat
    background-size: 100% 100%
    padding: 15% 3em 1em 3em

  .duilian-column
    padding: 32% 5% 40% 5%
</style>
