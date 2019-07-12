<template>
  <v-container fluid fill-height id="wrapper">
    <v-layout column>
      <v-flex xs6>
        <v-container fluid fill-height pa-0>
          <v-layout column justify-end>
            <v-flex xs4>
              <v-container fill-height pa-0>
                <v-layout row justify-center>
                  <v-flex xs11>
                    <v-img :src="photoURL" width="100%">
                      <v-container fluid fill-height pa-4 v-if="showPhotoPlaceholder">
                        <v-layout column justify-center>
                          <v-flex xs2 style="margin-top: 25%; margin-left: 3%">
                            <h5 class="text-xs-center headline
                             font-weight-bold brown--text text--darken-2">
                              拍 照 区 域
                            </h5>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-img>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs4>
        <v-container fluid fill-height>
          <v-layout row wrap justify-center align-center>
            <v-flex xs4 sm2 pl-4 pr-1>
              <router-link to="/">
                <v-img src="~@/assets/guwen/button-back.png"></v-img>
              </router-link>
            </v-flex>
            <v-flex xs4 sm2 pa-0>
              <input id="photo-file" ref="photo_file"
                     type="file" accept="image/*"
                     style="display: none"
                     @change="onFileChange"
              >
              <a @click="$refs.photo_file.click()">
                <v-img src="~@/assets/guwen/button-photo-go.png"></v-img>
              </a>
            </v-flex>
            <v-flex xs4 sm2 pl-1 pr-4>
              <router-link to="/guwen/text">
                <v-img src="~@/assets/guwen/button-switch-to-text.png"></v-img>
              </router-link>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="js">
import {
  GUWEN_SET_GEN_METHOD, GUWEN_SET_PHOTO_FILE
} from '@/mutation-types'

export default {
  name: 'GenPhoto',
  data () {
    return {
      photoURL: require('@/assets/guwen/bg-photo-area.png'),
      showPhotoPlaceholder: true
    }
  },
  methods: {
    onFileChange (e) {
      if (e.target.files.length !== 1) {
        return false
      }
      const file = e.target.files[0]
      this.photoURL = URL.createObjectURL(file)
      this.showPhotoPlaceholder = false

      this.$store.commit(GUWEN_SET_GEN_METHOD, 'photo')
      this.$store.commit(GUWEN_SET_PHOTO_FILE, file)
      this.$router.push('/guwen/result')
    }
  }
}
</script>

<style scoped lang="stylus">
  #wrapper
    background-image: url("~@/assets/guwen/bg-photo.png")
    background-repeat: no-repeat
    background-size: 100% 100%
    padding: 1em 3em
</style>
