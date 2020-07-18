<template>
  <v-main>
    <v-img height="100vh" :src="homeImg" class="white--text text-center align-center">
      <!-- If isn't loggedin -->
      <login-form v-if="!currentUser"></login-form>
      <!-- Else -->
      <div v-else class="mb-15">
        <p class="text-h4 text-md-h2 font-weight-medium">¡Bienvenidos!</p>
        <p>Descubre las últimas imágenes de las expediciones de la NASA</p>
      </div>
    </v-img>
  </v-main>
</template>

<script>
import { mapState } from 'vuex'
import LoginForm from '../components/LoginForm'

export default {
  name: 'Home',
  components: {
    LoginForm
  },
  computed: mapState(['homeImg', 'currentUser'])
}
</script>
