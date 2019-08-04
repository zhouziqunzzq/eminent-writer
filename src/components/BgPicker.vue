<template>
  <div v-show="show">
    <div id="panel-wrapper">
      <a
        id="panel-closer"
        @click="$emit('close')"
      >
        <v-icon>close</v-icon>
      </a>
      <v-container fluid fill-height pt-4 pb-3>
        <v-layout row justify-start>
          <v-flex mr-2 class="bg-elem"
                  v-for="n in bgCount"
                  :key="n"
                  @click="onBgClick(n)"
          >
            <v-img :src="bgBasePath + n.toString() + '.jpg'" :contain="true" height="100%"></v-img>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <div id="mask" @click="$emit('close')"></div>
  </div>
</template>

<script lang="js">
import { bgBasePath, bgCount } from '@/config'

export default {
  name: 'BgPicker',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      bgBasePath: bgBasePath,
      bgCount: bgCount
    }
  },
  methods: {
    testLog (s) {
      console.log(s)
    },
    onBgClick (n) {
      this.$emit('change-bg', this.bgBasePath + n.toString() + '.jpg')
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="stylus">
  #panel-wrapper
    z-index: 2
    position: fixed
    height: 30%
    width: 100%
    bottom: 0
    left: 0
    background: white
    overflow-x: scroll
    overflow-y: hidden
    border-radius: 0.5rem 0.5rem 0 0

  #panel-closer
    position: fixed
    bottom: 26%
    right: 0

  #mask
    z-index: 1
    position: fixed
    width: 100%
    height: 100%
    bottom: 0
    left: 0
    background-color: rgba(0, 0, 0, 0.5)

  .bg-elem
    flex-shrink: 0
    flex-grow: 0
    width: 8rem
</style>
