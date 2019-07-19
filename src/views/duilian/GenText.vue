<template>
  <v-container fluid fill-height id="wrapper">
    <v-layout column>
      <v-flex xs6>
        <v-container fluid fill-height pa-0>
          <v-layout column justify-end>
            <v-flex xs2>
              <v-img src="~@/assets/duilian/bg-text-input.png">
                <v-container fluid fill-height pa-0>
                  <v-layout row wrap justify-center align-center>
                    <v-flex xs5 style="margin-top: 15%">
                      <label for="text-input"></label>
                      <input type="text" id="text-input"
                             placeholder="关键词或上联"
                             style="width: 100%"
                             v-model="textInput"
                      />
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-img>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs4>
        <v-container fluid fill-height>
          <v-layout row wrap justify-center align-center>
            <v-flex xs4 sm2 pl-4 pr-1>
              <router-link to="/">
                <v-img src="~@/assets/common/button-back.png"></v-img>
              </router-link>
            </v-flex>
            <v-flex xs4 sm2 pa-0>
              <a @click="onTextGoClick()">
                <v-img src="~@/assets/common/button-text-go.png"></v-img>
              </a>
            </v-flex>
            <v-flex xs4 sm2 pl-1 pr-4>
              <router-link to="/duilian/photo">
                <v-img src="~@/assets/common/button-switch-to-photo.png"></v-img>
              </router-link>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="js">
import {
  DUILIAN_SET_GEN_METHOD, DUILIAN_SET_TEXT_INPUT
} from '@/mutation-types'

export default {
  name: 'GenText',
  data () {
    return {
      textInput: ''
    }
  },
  methods: {
    onTextGoClick () {
      this.$store.commit(DUILIAN_SET_GEN_METHOD, 'text')
      this.$store.commit(DUILIAN_SET_TEXT_INPUT, this.textInput)
      this.$router.push('/duilian/result')
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '~@/styles/input-text-center'

  #wrapper
    background-image: url("~@/assets/duilian/bg-text.png")
    background-repeat: no-repeat
    background-size: 100% 100%
    padding: 1em 3em
</style>
