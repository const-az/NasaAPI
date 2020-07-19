<template>
  <v-main>
    <v-img height="100vh" :src="homeImg.url" class="white--text text-center align-center">
      <!-- If isn't loggedin -->
      <login-form v-if="!currentUser"></login-form>
      <!-- Else -->
      <div v-else class="mb-15">
        <p class="text-h4 text-md-h2 font-weight-medium">¡Bienvenidos!</p>
        <p>Descubre las últimas imágenes de las expediciones de la NASA</p>
      </div>
    </v-img>
    <!-- APOD Credits -->
    <v-footer absolute color="transparent" v-if="today">
      <p class="ml-auto text-caption text-right white--text">Foto del día: <span class="font-weight-bold">{{homeImg.title}}</span> | {{homeImg.copyright}}</p>
    </v-footer>
    <v-footer absolute color="transparent" v-else>
      <p class="ml-auto text-caption text-right white--text"><span class="font-weight-bold">{{homeImg.title}}</span> | {{homeImg.copyright}} | {{homeImg.date}}</p>
    </v-footer>
  </v-main>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import LoginForm from '../components/LoginForm'

export default {
  name: 'Home',
  components: {
    LoginForm
  },
  computed: mapState(['homeImg', 'currentUser','today']),
  methods: mapActions(['getApod','getHomeImage']),
  created(){
    this.getHomeImage()
  }
}
</script>
