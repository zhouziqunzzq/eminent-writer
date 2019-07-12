<template>
  <v-container fluid fill-height id="wrapper">
    <v-layout column justify-center>
      <v-flex xs3>
        <v-container fluid fill-height pt-0 pb-1 pl-4 pr-4>
          <v-layout row justify-center align-end>
            <v-img src="~@/assets/duilian/bg-duilian-row.png">
              <v-container fluid fill-height pa-4>
                <v-layout row justify-center align-center>
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
                <v-img src="~@/assets/duilian/button-back-to-home.png"></v-img>
              </router-link>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="js">
import { mapState } from 'vuex'

export default {
  name: 'GenResult',
  data () {
    return {
      hengpi: '辞旧迎新',
      shanglian: '旧岁又添几个喜',
      xialian: '新年更上一层楼'
    }
  },
  computed: {
    ...mapState({
      genMethod: state => state.duilian.genMethod,
      textInput: state => state.duilian.textInput,
      photoFile: state => state.duilian.photoFile
    })
  },
  mounted () {
    console.log(this.genMethod)
    console.log(this.textInput)
    console.log(this.photoFile)
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
