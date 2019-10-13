<template>
  <v-container
    fluid
    fill-height
    id="wrapper">
    <v-layout
      row wrap
      justify-center
      align-center
    >
      <v-flex xs4 sm2 pa-1 sink>
        <router-link to="/duilian/text">
          <v-img src="~@/assets/home/button-duilian.png"></v-img>
        </router-link>
      </v-flex>
      <v-flex xs4 sm2 pa-1>
        <router-link to="/poem/text">
        <v-img src="~@/assets/home/button-poem.png"></v-img>
      </router-link>
      </v-flex>
      <v-flex xs4 sm2 pa-1 float>
        <router-link to="/guwen/text">
          <v-img src="~@/assets/home/button-guwen.png"></v-img>
        </router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { RESET_HISTORY } from '@/mutation-types'

export default {
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
    background-image: url("~@/assets/home/bg.png")
    background-repeat: no-repeat
    background-size: 100% 100%
    padding: 1rem 2rem 4rem 2rem

  .sink
    transform: translateY(3.5rem)

  .float
    transform: translateY(-3.5rem)
</style>
