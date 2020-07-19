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
    // User
    currentUser: getFromStorage('user') || undefined,
    // Home data
    homeImg: {
      // Default img url
      url: 'https://apod.nasa.gov/apod/image/2007/NEOWISEBelowBigDipper-7-16-2020-TomMasterson1081.jpg',
      title: 'Finding NEOWISE',
      date: '2020-07-18',
      copyright: 'Tom Masterson'
    },
    today: false,
    // APOD
    apodResult: null,
    // ROVER
    roverSearch: {
      sol: null,
      camera: ''
    },
    roverResult: null,
    counter: []
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
    SET_APOD(state, apod){ state.apodResult = apod },
    // Sets Rover search
    // Sets Martian sol
    UPDATE_ROVER_SOL(state, sol){ state.roverSearch.sol = sol},
    // Sets Rover camera
    UPDATE_ROVER_CAMERA(state, camera){ state.roverSearch.camera = camera },
    // Saves data result in state
    SET_ROVER(state, rover){ state.roverResult = rover },
    // Resets counter
    RESET_COUNTER(state){ state.counter = [] },
    // Count every camera name for each object in Rover result
    ADD_COUNTER(state, p){
      let targetCounter = state.counter.find(x => x.name == p.camera.name)
      if(targetCounter==undefined){
        let obj = { name: p.camera.name, total: 1}
        state.counter.push(obj)
      }else{
        targetCounter.total++
      }
    },
    // Saves APOD for Home Page
    SET_HOME_IMAGE(state, img){ state.homeImg = img },
    // Sets today boolean
    SET_TODAY(state, value){ state.today = value}
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
    getHomeImage({commit}){
      // Sets date to today
      let today = new Date().toISOString().substr(0, 10)
      axios.get(`${baseURL}/planetary/apod?${apiKey}&date=${today}`)
      .then((accept) => {
        // Saves info into state only if data is a image
        let data = accept.data
        if(data.media_type == 'image'){
          commit('SET_HOME_IMAGE', data)
          commit('SET_TODAY', true)
        }
      })
    },
    // Gets all plays from Firebase
    getApod({commit, dispatch}, date){
      // Displays loading spinner while getting items
      commit('SHOW_LOADING')
      axios.get(`${baseURL}/planetary/apod?${apiKey}&date=${date}`)
      .then((accept) => {
        // Saves info into state and hide spinner
        let data = accept.data
        dispatch('setApodResult', data)
        commit('HIDE_LOADING')
      })
    },
    // Saves APOD result
    setApodResult({commit}, data){ commit('SET_APOD', data) },
    // Rover search
    // Sets Martian sol
    updateRoverSol({commit}, sol){ commit('UPDATE_ROVER_SOL', sol) },
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
      // Displays loading spinner while getting items
      commit('SHOW_LOADING')
      // Resets state counter
      commit('RESET_COUNTER')
      // Sets camera value depeding on content
      let camera = state.roverSearch.camera ? `&camera=${state.roverSearch.camera}` : ''
      // Gets pictures from Api
      axios.get(`${baseURL}/mars-photos/api/v1/rovers/curiosity/photos?sol=${state.roverSearch.sol}${camera}&${apiKey}`)
      .then((accept) => {
        // Saves info into state
        let data = accept.data.photos
        // if data has information
        if(data.length!=0){
          dispatch('setRoverResult', data)
          // Counts camera name for each result
          data.forEach(element => 
            commit('ADD_COUNTER', element)
          )
        } else{
          // if data is an empty array
          dispatch('setRoverResult', false)
        }
        // Hide spinner
        commit('HIDE_LOADING')
      })
    },
    // Saves Rover Search result
    setRoverResult({commit}, data){ commit('SET_ROVER', data) },
  },
})
