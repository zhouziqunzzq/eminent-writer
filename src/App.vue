<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
    >
      {{ snackbar.msg }}
      <v-btn
        dark
        flat
        @click="hideSnackbar()"
      >
        关闭
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script lang="js">
import { mapState } from 'vuex'
import { HIDE_SNACKBAR } from '@/mutation-types'

export default {
  name: 'App',
  components: {},
  data () {
    return {
      //
    }
  },
  methods: {
    hideSnackbar () {
      this.$store.commit(HIDE_SNACKBAR)
    }
  },
  computed: {
    ...mapState([
      'snackbar'
    ])
  }
}
</script>

<style lang="stylus" scoped>

</style>
