<template>
  <v-img src="~@/assets/common/stamp-big.png" :contain="true">
    <v-container fluid fill-height pa-0>
      <v-layout row justify-center align-center reverse>
        <v-flex xs4>
          <v-container fluid fill-height pa-0>
            <v-layout column justify-start align-center>
              <v-flex xs1 v-for="(c, i) in text.slice(0, 2)" :key="i">
                <h5 class="headline text-xs-center white--text xingkai">{{c}}</h5>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs4>
          <v-container fluid fill-height pa-0>
            <v-layout column justify-start align-center>
              <v-flex xs1 v-for="(c, i) in text.slice(2, text.length)" :key="i">
                <h5 class="headline text-xs-center white--text xingkai">{{c}}</h5>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </v-img>
</template>

<script lang="js">
export default {
  name: 'BigStamp',
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
