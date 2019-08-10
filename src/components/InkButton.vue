<template>
  <a @click="disable ? '' : $emit('click')">
    <v-img :src="buttonImage" ref="btn"
           :contain="true" :width="width"
           class="float-top"
           :class="{'animation-zoom-3': animationNumber === '3',
                    'animation-zoom-4': animationNumber === '4'}"
           :style="{ animationDelay: animationDelay }"
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
    },
    // animation
    animationNumber: {
      type: String,
      default: ''
    },
    animationDelay: {
      type: String,
      default: '0s'
    }
  },
  data () {
    return {
      animationStartTime: Date.now(),
      animationPauseTime: Date.now()
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
  },
  watch: {
    disable (newValue, oldValue) {
      if (this.animationNumber.length === 0) {
        return
      }
      const myBtn = this.$refs.btn.$el
      if (newValue === true) {
        myBtn.style.animationPlayState = 'paused'
        this.animationPauseTime = Date.now()
      } else {
        const period = (Number.parseInt(this.animationNumber) + 1) * 1000
        const delay = (this.animationPauseTime - this.animationStartTime) % period
        const now = (Date.now() - this.animationStartTime) % period
        setTimeout(() => {
          myBtn.style.animationPlayState = 'running'
        }, (period - now + delay) % period)
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '~@/styles/zoom-animation.styl'
  a
    text-decoration: none

  .float-top
    z-index: 10

  animation-zoom(3)
  animation-zoom(4)
</style>
