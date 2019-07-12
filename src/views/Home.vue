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

export default {
  data () {
    return {}
  }
}
</script>

<style lang="stylus" scoped>
  #wrapper
    background-image: url("~@/assets/home/bg.png")
    background-repeat: no-repeat
    background-size: 100% 100%
    padding: 1em 3em

  .sink
    transform: translateY(6em)

  .float
    transform: translateY(-6em)
</style>
