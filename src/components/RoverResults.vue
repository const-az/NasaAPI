<template>
  <v-main class="text-center">
    <!-- Loading -->
    <v-overlay absolute :value="loading" opacity="0" class="my-10 py-5">
      <v-progress-circular indeterminate color="indigo darken-3" size="64"></v-progress-circular>
    </v-overlay>
    <!-- No results message -->
    <div v-if="roverResult==false && !loading">
      <p class="text-h6 mt-5 text-md-h5">No se encontraron resultados. Intente nuevamente.</p>
    </div>
    <!-- Show results if there's any and it's not loading -->
    <div v-if="roverResult!=0 && !!roverResult && !loading">
      <!-- Pictures per camera counter -->
      <v-row class="align-center justify-center mb-3 mt-6">
        <!-- Counter title -->
        <v-col cols="12" md="6" class="py-0">
          <p class="mx-4 text-body-1 text-md-h6 font-weight-regular">Cantidad de fotos según cámara: <span v-if="counter.length==1" class="font-weight-bold">{{counter[0].total}}</span></p>
        </v-col>
        <!-- Counter per each camera -->
        <v-col cols="12" md="6" class="text-md-start py-0" v-if="counter.length!=1">
          <p v-if="counter.length==1" class="mx-4 text-body-1 text-md-h6 font-weight-bold">{{counter[0].total}}</p>
          <v-row v-else no-gutters class="align-center">
            <v-col cols="4" md="6" v-for="(camera, index) in counter" :key="index">
              <p class="text-caption text-md-body-2">{{camera.name}}: {{camera.total}}</p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-divider></v-divider>
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