<template>
  <v-img src="~@/assets/common/stamp-small.png" :contain="true">
    <v-container fluid fill-height pa-0 pt-3 pb-2>
      <v-layout column justify-center>
        <v-flex xs1
                v-for="(c, i) in text"
                :key="i"
        >
          <h5 class="headline text-xs-center white--text xingkai"
              :class="{ 'smaller': text.length === 3 }"
          >
            {{c}}
          </h5>
        </v-flex>
      </v-layout>
    </v-container>
  </v-img>
</template>

<script lang="js">
export default {
  name: 'SmallStamp',
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="stylus">
  .smaller
    font-size: 18px !important
    line-height: 18px !important
</style>
