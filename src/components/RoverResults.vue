<template>
  <v-main class="text-center">
    <!-- Loading -->
    <v-overlay absolute :value="loading" opacity="0" class="my-10 py-5">
      <v-progress-circular indeterminate color="blue-grey darken-3" size="64"></v-progress-circular>
    </v-overlay>
    <div v-if="roverResult==false">
      <p class="text-medium text-h5">No se encontraron resultados. Intente nuevamente.</p>
    </div>
    <div v-if="roverResult!=0 && !!roverResult">
      <p class="mb-0">Cantidad de fotos según cámara:</p>
      <span class="text-caption mx-5" v-for="(camera, index) in counter" :key="index">{{camera.name}}: {{camera.total}}</span>
      <v-divider class="mt-5"></v-divider>
      <v-row>
        <!-- Cards -->
        <v-col cols="12" md="4" v-for="result in roverResult" :key="result.id">
          <v-img :src="result.img_src"></v-img>
          <p class="text-caption mb-0">Rover: {{result.rover.name}} | Cámara: {{result.camera.full_name}}</p>
          <p class="text-caption mb-0">Día en la Tierra: {{result.earth_date}}</p>
        </v-col>
      </v-row>
    </div>
  </v-main>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: mapState(['roverResult','loading','counter']),
  methods: mapActions(['setRoverResult']),
  created(){
    this.setRoverResult(null)
  }
}
</script>