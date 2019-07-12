<template>
  <v-container fluid fill-height id="wrapper">
    <v-layout column justify-center>
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
                <v-img src="~@/assets/poem/button-back-to-home.png"></v-img>
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
      myPoem: [
        '千山鸟飞绝',
        '万径人踪灭',
        '孤舟蓑笠翁',
        '独钓寒江雪'
      ]
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
  mounted () {
    console.log(this.genMethod)
    console.log(this.textInput)
    console.log(this.photoFile)
    console.log(this.isCangtou)
    console.log(this.numberOfWords)
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
