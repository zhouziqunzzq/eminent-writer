<template>
  <v-container
    fluid
    fill-height
    id="wrapper">
    <v-layout
      row wrap
      justify-end
      align-end
    >
      <v-flex xs4>
        <v-container fluid fill-height pa-0>
          <v-layout column justify-center>
            <v-flex xs4 sm2 pa-2>
              <ink-button
                tag="对联"
                @click="$router.push('/duilian/text')"
              ></ink-button>
            </v-flex>
            <v-flex xs4 sm2 pa-2>
              <ink-button
                tag="古诗"
                @click="$router.push('/poem/text')"
              ></ink-button>
            </v-flex>
            <v-flex xs4 sm2 pa-2>
              <ink-button
                tag="古文"
                @click="$router.push('/guwen/text')"
              ></ink-button>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import InkButton from '../components/InkButton'

export default {
  components: { InkButton },
  data () {
    return {}
  },
  methods: {
    ...mapActions([
      'showInfo',
      'showError'
    ])
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
</style>
