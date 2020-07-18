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

const defaultCounter = [
  { name: 'FHAZ', total: 0 },
  { name: 'RHAZ', total: 0 },
  { name: 'MAST', total: 0 },
  { name: 'CHEMCAM', total: 0 },
  { name: 'MAHLI', total: 0 },
  { name: 'MARDI', total: 0 },
  { name: 'NAVCAM', total: 0 },
  { name: 'PANCAM', total: 0 },
  { name: 'MINITES', total: 0 },
]

export default new Vuex.Store({
  state: {
    loading: false,
    currentUser: getFromStorage('user') || undefined,
    homeImg: 'https://apod.nasa.gov/apod/image/2007/NEOWISEBelowBigDipper-7-16-2020-TomMasterson1081.jpg',
    apodResult: null,
    roverSearch: {
      sol: null,
      camera: ''
    },
    roverResult: null,
    counter: [
      { name: 'FHAZ', total: 0 },
      { name: 'RHAZ', total: 0 },
      { name: 'MAST', total: 0 },
      { name: 'CHEMCAM', total: 0 },
      { name: 'MAHLI', total: 0 },
      { name: 'MARDI', total: 0 },
      { name: 'NAVCAM', total: 0 },
      { name: 'PANCAM', total: 0 },
      { name: 'MINITES', total: 0 },
    ]
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
    // Saves APOD result
    SET_APOD(state, apod){
      state.apodResult = apod
    },
    // Sets Rover search
    // Sets Martian sol
    UPDATE_ROVER_SOL(state, sol){
      state.roverSearch.sol = sol
    },
    // Sets Rover camera
    UPDATE_ROVER_CAMERA(state, camera){
      state.roverSearch.camera = camera
    },
    SET_ROVER(state, rover){
      state.roverResult = rover
    },
    ADD_COUNTER(state, p){
      let counter = state.counter.find(x => x.name == p.camera.name)
      counter.total++
    },
    RESET_COUNTER(state){
      state.counter = defaultCounter
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
    // Saves APOD result
    setApodResult({commit}, data){
      commit('SET_APOD', data)
    },
    // Sets Rover search
    // Sets Martian sol
    updateRoverSol({commit}, sol){
      commit('UPDATE_ROVER_SOL', sol)
    },
    // Sets Rover camera
    updateRoverCamera({commit}, camera){
      let lowerCamera = camera.toLowerCase()
      if(camera=='Todas'){
        lowerCamera = ''
      }
      commit('UPDATE_ROVER_CAMERA', lowerCamera)
    },
    // Gets all plays from Firebase
    getRover({commit, dispatch, state}){
      commit('RESET_COUNTER')
      // Displays loading spinner while getting items
      commit('SHOW_LOADING')
      // Sets camera value depeding on content
      let camera = state.roverSearch.camera ? `&camera=${state.roverSearch.camera}` : ''
      // Gets pictures from Api
      axios.get(`${baseURL}/mars-photos/api/v1/rovers/curiosity/photos?sol=${state.roverSearch.sol}${camera}&${apiKey}`)
      .then((accept) => {
        // Saves info into state and hide spinner
        let data = accept.data.photos
        dispatch('setRoverResult', data)
        commit('HIDE_LOADING')
        data.forEach(element => 
          commit('ADD_COUNTER', element)
        )
      })
    },
    // Saves Rover Search result
    setRoverResult({commit}, data){
      commit('SET_ROVER', data)
    },
  },
  getters: {
    // Gets log-in state from storage
    isLoggedIn: state => !!state.currentUser,
    // Gets current logged-in user from storage 
    currentUser: state => state.currentUser,
  }
})
