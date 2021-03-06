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
  SET_SHOW_MUSIC_CONTROL,
  RESET_HISTORY
} from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    duilian: {
      textInput: '',
      photoFile: null,
      genMethod: 'text',
      isKeyword: true
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
      direction: 2 // 1:classic -> modern; 2: modern -> classic
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
    },
    [RESET_HISTORY] (state) {
      state.duilian.textInput = ''
      state.duilian.photoFile = null
      state.duilian.genMethod = 'text'
      state.duilian.isKeyword = true

      state.poem.textInput = ''
      state.poem.photoFile = null
      state.poem.genMethod = 'text'
      state.poem.isCangtou = false
      state.poem.numberOfWords = 5

      state.guwen.textInput = ''
      state.guwen.photoFile = null
      state.guwen.genMethod = 'text'
      state.guwen.direction = 2
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
