import Vue from 'vue'
import Vuex from 'vuex'
import {
  DUILIAN_SET_GEN_METHOD,
  DUILIAN_SET_TEXT_INPUT,
  DUILIAN_SET_PHOTO_FILE,
  DUILIAN_SET_IS_KEYWORD,
  POEM_SET_GEN_METHOD,
  POEM_SET_TEXT_INPUT,
  POEM_SET_PHOTO_FILE,
  POEM_SET_IS_CANGTOU,
  POEM_SET_NUM_WORDS,
  GUWEN_SET_GEN_METHOD,
  GUWEN_SET_TEXT_INPUT,
  GUWEN_SET_PHOTO_FILE,
  GUWEN_SET_DIRECTION,
  SHOW_SNACKBAR,
  HIDE_SNACKBAR,
  SET_SNACKBAR_MSG,
  SET_SNACKBAR_COLOR,
  SET_SHOW_MUSIC_CONTROL
} from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    duilian: {
      textInput: '',
      photoFile: null,
      genMethod: 'text',
      isKeyword: false
    },
    poem: {
      textInput: '',
      photoFile: null,
      genMethod: 'text',
      isCangtou: false,
      numberOfWords: 5
    },
    guwen: {
      textInput: '',
      photoFile: null,
      genMethod: 'text',
      direction: 1 // 1:classic -> modern; 2: modern -> classic
    },
    snackbar: {
      show: false,
      msg: '',
      color: 'blue'
    },
    app: {
      showMusicControl: true
    }
  },
  mutations: {
    // duilian
    [DUILIAN_SET_GEN_METHOD] (state, method) {
      state.duilian.genMethod = method
    },
    [DUILIAN_SET_TEXT_INPUT] (state, input) {
      state.duilian.textInput = input
    },
    [DUILIAN_SET_PHOTO_FILE] (state, file) {
      state.duilian.photoFile = file
    },
    [DUILIAN_SET_IS_KEYWORD] (state, isKeyword) {
      state.duilian.isKeyword = isKeyword
    },
    // poem
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
    },
    // guwen
    [GUWEN_SET_GEN_METHOD] (state, method) {
      state.guwen.genMethod = method
    },
    [GUWEN_SET_TEXT_INPUT] (state, input) {
      state.guwen.textInput = input
    },
    [GUWEN_SET_PHOTO_FILE] (state, file) {
      state.guwen.photoFile = file
    },
    [GUWEN_SET_DIRECTION] (state, direction) {
      state.guwen.direction = direction
    },
    // snackbar
    [SHOW_SNACKBAR] (state) {
      state.snackbar.show = true
    },
    [HIDE_SNACKBAR] (state) {
      state.snackbar.show = false
    },
    [SET_SNACKBAR_MSG] (state, msg) {
      state.snackbar.msg = msg
    },
    [SET_SNACKBAR_COLOR] (state, color) {
      state.snackbar.color = color
    },
    // app
    [SET_SHOW_MUSIC_CONTROL] (state, v) {
      state.app.showMusicControl = v
    }
  },
  actions: {
    showInfo (context, msg) {
      context.commit(SET_SNACKBAR_MSG, msg)
      context.commit(SET_SNACKBAR_COLOR, 'blue')
      context.commit(SHOW_SNACKBAR)
    },
    showError (context, msg) {
      context.commit(SET_SNACKBAR_MSG, msg)
      context.commit(SET_SNACKBAR_COLOR, 'red')
      context.commit(SHOW_SNACKBAR)
    },
    showMusicControl (context) {
      context.commit(SET_SHOW_MUSIC_CONTROL, true)
    },
    hideMusicControl (context) {
      context.commit(SET_SHOW_MUSIC_CONTROL, false)
    }
  }
})
