<template>
  <v-main class="mt-15 text-center">
    <p class="font-weight-medium text-h5 mb-0">¡Revisa fotografías de Marte!</p>
    <p class="text-body-2">Selecciona el día y la cámara para tu búsqueda.</p>
    <v-container>
      <v-row class="align-center">
        <v-col cols='12' md="5">
          <v-text-field :rules="rules" :value="roverSearch.sol" @input="updateRoverSol" color="blue-grey darken-3" label="SOL" hint="Ingresa un valor numérico."></v-text-field>
        </v-col>
        <v-col cols='12' md="5">
          <v-select :value="roverSearch.camera" @input="updateRoverCamera" cols='12' md="6" v-model="select" :items="cameras" label="Cámaras" color="blue-grey darken-3"
          ></v-select>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn small depressed dark color="blue-grey darken-3" @click="searchRover">Buscar</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="mb-8"></v-divider>
    <!-- Alert on errors -->
    <v-snackbar elevation="0" top color="blue-grey darken-3" v-model="alert.state" timeout="3000">
      {{ alert.text }}
      <template v-slot:action="{ attrs }">
        <!-- To close alert -->
        <v-btn icon small color="white" v-bind="attrs" @click="alert.state = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-main>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: () => ({
    cameras: ['FHAZ','RHAZ','MAST','CHECKCAM','MAHLI','MARDI','NAVCAM','PANCAM','MINITES'],
    select: null,
    rules: [
      v => !!v || '* Este campo es obligatorio',
      v => !isNaN(parseFloat(v)) || '* Debes ingresar un valor numérico'
    ],
    // Alert
    alert: {
      text: "",
      state: false,
    }
  }),
  computed: mapState(['roverSearch']),
  methods: {
    searchRover(){
      if(this.roverSearch.sol != null){
        this.getRover()
      } else{
        this.alert.state = true
        this.alert.text = "El campo SOL es obligatorio."
      }
    },
    ...mapActions(['updateRoverSol','updateRoverCamera','getRover'])
  }
}
</script>