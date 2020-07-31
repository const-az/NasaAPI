<template>
  <v-main>
    <v-img height="100vh" :src="homeImg.url" class="white--text text-center align-center">
      <div class="mb-15">
        <p class="text-h4 text-md-h2 font-weight-medium">¡Ups!</p>
        <p>La página que buscas no existe</p>
        <v-btn small depressed dark color="indigo darken-4" to="/">Volver al home</v-btn>
      </div>
      <v-footer absolute color="transparent" v-if="today">
        <p class="ml-auto text-caption text-right white--text">Foto del día: <span class="font-weight-bold">{{homeImg.title}}</span> | {{homeImg.copyright}}</p>
      </v-footer>
      <v-footer absolute color="transparent" v-else>
        <p class="ml-auto text-caption text-right white--text"><span class="font-weight-bold">{{homeImg.title}}</span> | {{homeImg.copyright}} | {{homeImg.date}}</p>
      </v-footer>
    </v-img>
  </v-main>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  computed: mapState(['homeImg','today']),
  methods: mapActions(['getHomeImage']),
  created(){
    this.getHomeImage()
  }
}
</script>