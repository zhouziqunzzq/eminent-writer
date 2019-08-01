<template>
  <a @click="$emit('click')">
    <v-img src="~@/assets/common/button-ink.png" :contain="true" :width="width">
      <v-container fluid fill-height pa-0>
        <v-layout row justify-center align-center>
          <v-flex xs12>
            <h6
              class="text-xs-center white--text simsun"
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
    width: {
      type: String,
      default: '100%'
    },
    fontFamily: {
      type: String,
      default: 'SimSun'
    },
    fontSize: {
      type: String,
      default: '14px'
    },
    fontWeight: {
      type: String,
      default: 'normal'
    },
    tag: {
      type: String,
      default: ''
    },
    paddingRight: {
      type: String,
      default: '16%'
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
        fontWeight: this.fontWeight,
        paddingRight: this.paddingRight
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  a
    text-decoration: none
</style>
