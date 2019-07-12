import Vue from 'vue'
import Vuex from 'vuex'
import {
  DUILIAN_SET_GEN_METHOD,
  DUILIAN_SET_TEXT_INPUT,
  DUILIAN_SET_PHOTO_FILE,
  POEM_SET_GEN_METHOD,
  POEM_SET_TEXT_INPUT,
  POEM_SET_PHOTO_FILE,
  POEM_SET_IS_CANGTOU,
  POEM_SET_NUM_WORDS
} from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    duilian: {
      textInput: '',
      photoFile: null,
      genMethod: 'text'
    },
    poem: {
      textInput: '',
      photoFile: null,
      genMethod: 'text',
      isCangtou: false,
      numberOfWords: 5
    }
  },
  mutations: {
    [DUILIAN_SET_GEN_METHOD] (state, method) {
      state.duilian.genMethod = method
    },
    [DUILIAN_SET_TEXT_INPUT] (state, input) {
      state.duilian.textInput = input
    },
    [DUILIAN_SET_PHOTO_FILE] (state, file) {
      state.duilian.photoFile = file
    },
    [POEM_SET_GEN_METHOD] (state, method) {
      state.poem.genMethod = method
    },
    [POEM_SET_TEXT_INPUT] (state, input) {
      state.poem.textInput = input
    },
    [POEM_SET_PHOTO_FILE] (state, file) {
      state.poem.photoFile = file
    },
    [POEM_SET_IS_CANGTOU] (state, v) {
      state.poem.isCangtou = v
    },
    [POEM_SET_NUM_WORDS] (state, n) {
      state.poem.numberOfWords = n
    }
  },
  actions: {

  }
})
