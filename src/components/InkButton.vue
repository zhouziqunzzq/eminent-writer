<template>
  <a @click="disable ? '' : $emit('click')">
    <v-img :src="buttonImage"
           :contain="true" :width="width"
    >
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
      default: '12px'
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
    },
    disable: {
      type: Boolean,
      default: false
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
    },
    buttonImage () {
      return this.disable
        ? require('@/assets/common/button-ink-disabled.png')
        : require('@/assets/common/button-ink.png')
    }
  }
}
</script>

<style scoped lang="stylus">
  a
    text-decoration: none
</style>
