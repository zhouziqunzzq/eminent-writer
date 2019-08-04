<template>
  <v-img src="~@/assets/common/stamp-small.png"
         :contain="true"
         width="2.5rem"
  >
    <v-container fluid fill-height pa-0 pt-3 pb-2>
      <v-layout column justify-center>
        <v-flex xs1
                v-for="(c, i) in text"
                :key="i"
        >
          <h5 class="stamp-text text-xs-center white--text xingkai"
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
  .stamp-text
    font-size: 16px
    line-height: 16px
    font-weight: normal

  .smaller
    font-size: 14px !important
    line-height: 14px !important
</style>
