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
      <img src="~@/assets/home/boat.gif"
             width="60%" class="boat-animator"
             ref="boatAnimator"
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
    // const url = this.$refs.boatAnimator.src
    // this.$refs.boatAnimator.src = ''
  }
}
</script>

<style lang="stylus" scoped>
  #wrapper
    background-image: url("~@/assets/home/bg-clean.jpg")
    background-repeat: no-repeat
    background-size: 100% 100%
    padding: 1rem

  .sink
    transform: translateY(6em)

  .float
    transform: translateY(-6em)

  .boat-animator
    position: absolute
    bottom: 20%
    right: 40%
    z-index: 0
</style>
