import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// USER
// Saves user on storage
function setInStorage(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj))
}
// Gets user from storage
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}

// Base Url and api key for NASA api
const baseURL = 'https://api.nasa.gov'
const apiKey = 'api_key=Icy2uZKFNzefDVvJDYFdzZvNJfNhzI1dIrlTZc1p'


export default new Vuex.Store({
  state: {
    loading: false,
    currentUser: getFromStorage('user') || undefined,
    homeImg: 'https://apod.nasa.gov/apod/image/2007/NEOWISEBelowBigDipper-7-16-2020-TomMasterson1081.jpg',
    apodResult: null
  },
  mutations: {
    // Toggles loading state
    SHOW_LOADING(state){ state.loading = true },
    HIDE_LOADING(state){ state.loading = false },
    // Saves user information
    UPDATE_USER(state, user){
      state.currentUser = user
      setInStorage('user', user)
    },
    // Saves apod result
    SET_APOD(state, apod){
      state.apodResult = apod
    }
  },
  actions: {
    // Save user
    updateUser({commit}, user){ 
      return new Promise((resolve, reject) => {
        try{ 
          commit('UPDATE_USER', user)
          resolve(user)
        } catch(e) { reject(e) }
      })
    },
    // Gets all plays from Firebase
    getApod({commit, dispatch}, date){
      // Displays loading spinner while getting items
      commit('SHOW_LOADING')
      axios.get(`${baseURL}/planetary/apod?${apiKey}&date=${date}`, { headers: { "Content-type": "text/plain"}})
      .then((accept) => {
        // Saves info into state and hide spinner
        let data = accept.data
        dispatch('setApodResult', data)
        commit('HIDE_LOADING')
      })
    },
    setApodResult({commit}, data){
      commit('SET_APOD', data)
    }
  },
  getters: {
    // Gets log-in state from storage
    isLoggedIn: state => !!state.currentUser,
    // Gets current logged-in user from storage 
    currentUser: state => state.currentUser,
  }
})
