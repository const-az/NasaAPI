import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

function setInStorage(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj))
}
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}

const baseURL = 'https://api.nasa.gov'
const apiKey = 'api_key=Icy2uZKFNzefDVvJDYFdzZvNJfNhzI1dIrlTZc1p'

export default new Vuex.Store({
  state: {
    loading: false,
    currentUser: getFromStorage('user') || undefined,
    homeImg: {
      url: 'https://apod.nasa.gov/apod/image/2007/NEOWISEBelowBigDipper-7-16-2020-TomMasterson1081.jpg',
      title: 'Finding NEOWISE',
      date: '2020-07-18',
      copyright: 'Tom Masterson'
    },
    today: false,
    apodResult: null,
    roverSearch: {
      sol: null,
      camera: '',
      rover: ''
    },
    roverResult: null,
    counter: []
  },
  mutations: {
    SHOW_LOADING(state){ state.loading = true },
    HIDE_LOADING(state){ state.loading = false },
    UPDATE_USER(state, user){
      state.currentUser = user
      setInStorage('user', user)
    },
    SET_APOD(state, apod){ state.apodResult = apod },
    UPDATE_ROVER_SOL(state, sol){ state.roverSearch.sol = sol},
    UPDATE_ROVER_CAMERA(state, camera){ state.roverSearch.camera = camera },
    UPDATE_ROVER_NAME(state, rover){ state.roverSearch.rover = rover },
    SET_ROVER(state, rover){ state.roverResult = rover },
    RESET_COUNTER(state){ state.counter = [] },
    ADD_COUNTER(state, p){
      let targetCounter = state.counter.find(x => x.name == p.camera.name)
      if(targetCounter==undefined){
        let obj = { name: p.camera.name, total: 1}
        state.counter.push(obj)
      }else{
        targetCounter.total++
      }
    },
    SET_HOME_IMAGE(state, img){ state.homeImg = img },
    SET_TODAY(state, value){ state.today = value}
  },
  actions: {
    updateUser({commit}, user){ 
      return new Promise((resolve, reject) => {
        try{ 
          commit('UPDATE_USER', user)
          resolve(user)
        } catch(e) { reject(e) }
      })
    },
    getHomeImage({commit}){
      axios.get(`${baseURL}/planetary/apod?${apiKey}`)
      .then((accept) => {
        let data = accept.data
        if(data.media_type == 'image'){
          commit('SET_HOME_IMAGE', data)
          commit('SET_TODAY', true)
        }
      })
      .catch(() => {
        commit('SET_TODAY', false)
      })
    },
    getApod({commit, dispatch}, date){
      commit('SHOW_LOADING')
      axios.get(`${baseURL}/planetary/apod?${apiKey}&date=${date}`)
      .then((accept) => {
        let data = accept.data
        dispatch('setApodResult', data)
        commit('HIDE_LOADING')
      })
      .catch(() => {
        let error = { error: '¡Ups! La foto de hoy aún no se carga.'}
        dispatch('setApodResult', error)
        commit('HIDE_LOADING')
      })
    },
    setApodResult({commit}, data){ commit('SET_APOD', data) },
    updateRoverSol({commit}, sol){ commit('UPDATE_ROVER_SOL', sol) },
    updateRoverCamera({commit}, camera){
      let lowerCamera = camera.toLowerCase()
      if(camera=='Todas'){
        lowerCamera = ''
      }
      commit('UPDATE_ROVER_CAMERA', lowerCamera)
    },
    updateRoverName({commit}, rover){
      let lowerRover = rover.toLowerCase()
      commit('UPDATE_ROVER_NAME', lowerRover)
    },
    getRover({commit, dispatch, state}){
      commit('SHOW_LOADING')
      commit('RESET_COUNTER')
      let camera = state.roverSearch.camera ? `&camera=${state.roverSearch.camera}` : ''
      axios.get(`${baseURL}/mars-photos/api/v1/rovers/${state.roverSearch.rover}/photos?sol=${state.roverSearch.sol}${camera}&page=1&${apiKey}`)
      .then((accept) => {
        let data = accept.data.photos
        if(data.length!=0){
          dispatch('setRoverResult', data)
          data.forEach(element => 
            commit('ADD_COUNTER', element)
          )
        } else{
          dispatch('setRoverResult', false)
        }
        commit('HIDE_LOADING')
      })
    },
    setRoverResult({commit}, data){ commit('SET_ROVER', data) },
  },
})
