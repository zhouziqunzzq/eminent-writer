<template>
  <a @click="$emit('click')">
    <v-img src="~@/assets/common/button-ink.png" :contain="true">
      <v-container fluid fill-height pa-0>
        <v-layout row justify-center align-center>
          <v-flex xs12>
            <h6
              class="text-xs-center white--text pr-3"
              :style="buttonStyle"
            >{{tag}}</h6>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
  </a>
</template>

<script lang="js">
export default {
  name: 'InkButton',
  props: {
    fontFamily: {
      type: String,
      default: 'SimSun'
    },
    fontSize: {
      type: String,
      default: '20px'
    },
    fontWeight: {
      type: String,
      default: 'normal'
    },
    tag: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      //
    }
  },
  computed: {
    buttonStyle () {
      return {
        fontFamily: this.fontFamily,
        fontSize: this.fontSize,
        fontWeight: this.fontWeight
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  a
    text-decoration: none
</style>
