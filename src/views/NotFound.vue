<template>
  <v-main>
    <v-img height="100vh" :src="homeImg" class="white--text text-center align-center">
      <div class="mb-15">
        <p class="text-h4 text-md-h2 font-weight-medium">¡Ups!</p>
        <p>La página que buscas no existe</p>
        <v-btn small depressed dark color="indigo darken-3" to="/">Volver al home</v-btn>
      </div>
    </v-img>
  </v-main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  computed: mapState(['homeImg'])
}
</script>