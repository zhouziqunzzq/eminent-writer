<template>
  <v-container fluid fill-height id="wrapper">
    <v-layout column>
      <v-flex xs8></v-flex>
      <v-flex xs4 pb-4>
        <v-container fluid fill-height pa-0>
          <v-layout row justify-end align-end>
            <v-flex xs4>
              <v-container fluid fill-height pa-0>
                <v-layout column justify-center align-end>
                  <v-flex xs4 sm2 pa-2 style="width: 85%">
                    <ink-button
                      tag="对联"
                      @click="$router.push('/duilian/home')"
                      animation-number="3" animation-delay="0s"
                    ></ink-button>
                  </v-flex>
                  <v-flex xs4 sm2 pa-2 style="width: 85%">
                    <ink-button
                      tag="古诗"
                      @click="$router.push('/poem/home')"
                      animation-number="3" animation-delay="1s"
                    ></ink-button>
                  </v-flex>
                  <v-flex xs4 sm2 pa-2 style="width: 85%">
                    <ink-button
                      tag="古文"
                      @click="$router.push('/guwen/home')"
                      animation-number="3" animation-delay="2s"
                    ></ink-button>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <img src="~@/assets/home/bird1.png"
           width="3%" class="birds-animator-1"
      />
      <img src="~@/assets/home/bird2.png"
           width="3%" class="birds-animator-2"
      />
      <img src="~@/assets/home/boat.png"
             width="20%" class="boat-animator"
      />
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import InkButton from '@/components/InkButton'
import { RESET_HISTORY } from '@/mutation-types'

export default {
  components: {
    InkButton
  },
  data () {
    return {}
  },
  methods: {
    ...mapActions([
      'showInfo',
      'showError'
    ])
  },
  mounted () {
    this.$store.commit(RESET_HISTORY)
  }
}
</script>

<style lang="stylus" scoped>
  #wrapper
    background-image: url("~@/assets/home/bg.jpg")
    background-repeat: no-repeat
    background-size: 100% 100%
    padding: 1rem

  .sink
    transform: translateY(6em)

  .float
    transform: translateY(-6em)

  $boat-animation-time = 20s
  .boat-animator
    position: absolute
    bottom: 40%
    left: 20%
    z-index: 0
    animation: boat-h $boat-animation-time infinite cubic-bezier(.2,.08,.5,-0.01) forwards,\
      boat-v $boat-animation-time infinite ease-out forwards,\
      boat-zoom $boat-animation-time infinite forwards,\
      boat-fade-in $boat-animation-time infinite forwards

  @keyframes boat-h {
    0% { left: 20% }
    87.5% { left: 100% }
    100% { left: 100% }
  }

  @keyframes boat-v {
    0% { bottom: 40% }
    43.75% { bottom: 25% }
    58.3% { bottom: 23% }
    87.5% { bottom: 22% }
    100% { bottom: 22% }
  }

  @keyframes boat-zoom {
    0% { transform: scale(0.8) }
    87.5% { transform: scale(1.0) }
    100% { transform: scale(1.0) }
  }

  @keyframes boat-fade-in {
    0% { opacity: 0 }
    50% { opacity: 1 }
    100% { opacity: 1 }
  }

  $birds-move-time = 10s
  $birds-delay = 0.2s
  $birds-flap-time = 2s
  .birds-animator-1
    position: absolute
    top: 30%
    right: 0
    z-index: 0
    transform: rotate3d(1, 0, 0, 0deg)
    animation: birds-flap $birds-flap-time infinite ease-in-out forwards,\
      birds-h $birds-move-time infinite linear forwards

  .birds-animator-2
    position: absolute
    top: 32%
    right: 0
    z-index: 0
    transform: rotate3d(1, 0, 0, 0deg)
    animation: birds-flap $birds-flap-time infinite ease-in-out forwards,\
      birds-h $birds-move-time $birds-delay infinite linear forwards

  @keyframes birds-h {
    0% { right: -10% }
    87.5% { right: 100% }
    100% { right: 100% }
  }

  @keyframes birds-flap {
    0% { transform: rotate3d(1, 0, 0, 0deg) }
    50% { transform: rotate3d(1, 0, 0, 50deg) }
    100% { transform: rotate3d(1, 0, 0, 0deg) }
  }
</style>
