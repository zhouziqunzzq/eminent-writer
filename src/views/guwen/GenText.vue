<template>
  <v-container fluid fill-height id="wrapper">
    <v-layout column>
      <v-flex xs7>
        <v-container fluid fill-height pt-4 pb-0 pl-4 pr-4>
          <v-layout column justify-end>
            <v-flex xs2>
              <v-img src="~@/assets/guwen/bg-text-input.png">
                <v-container fluid fill-height pa-0>
                  <v-layout row wrap justify-center align-center>
                    <v-flex xs8 style="padding-right: 2.7%">
                      <v-textarea
                        label="待翻译的原文"
                        v-model="textInput"
                        :no-resize="true"
                        :clearable="true"
                        :rows="14"
                      ></v-textarea>
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
                <v-img src="~@/assets/guwen/button-text-go.png"></v-img>
              </a>
            </v-flex>
            <v-flex xs4 sm2 pl-1 pr-4>
              <router-link to="/guwen/photo">
                <v-img src="~@/assets/guwen/button-switch-to-photo.png"></v-img>
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
  GUWEN_SET_GEN_METHOD, GUWEN_SET_TEXT_INPUT
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
      this.$store.commit(GUWEN_SET_GEN_METHOD, 'text')
      this.$store.commit(GUWEN_SET_TEXT_INPUT, this.textInput)
      this.$router.push('/guwen/result')
    }
  }
}
</script>

<style scoped lang="stylus">
  #wrapper
    background-image: url("~@/assets/guwen/bg-text.png")
    background-repeat: no-repeat
    background-size: 100% 100%
    padding: 1em 3em
</style>
