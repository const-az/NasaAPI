<template>
  <v-main class="mt-15 text-center">
    <p class="font-weight-medium text-h5 text-md-h4 mb-0">¡Revisa fotografías de Marte!</p>
    <p class="text-body-2">Selecciona el día y la cámara para tu búsqueda.</p>
    <v-container>
      <v-row class="align-center">
        <v-col cols='12' md="3">
          <v-text-field :rules="rules" :value="roverSearch.sol" @input="updateRoverSol" color="indigo darken-4" label="SOL" hint="Ingresa un valor numérico."></v-text-field>
        </v-col>
        <v-col cols='12' md="3">
          <v-select :value="roverSearch.rover" @input="updateRoverName" cols='12' md="6" v-model="roverSelected" :items="rovers" label="Rover" color="indigo darken-4"
          ></v-select>
        </v-col>
        <v-col cols='12' md="3">
          <v-select :value="roverSearch.camera" @input="updateRoverCamera" cols='12' md="6" v-model="cameraSelected" :items="cameras" label="Cámaras" color="indigo darken-4"
          ></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-btn small depressed dark color="red" @click="searchRover">Buscar</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <v-snackbar elevation="0" top color="red" v-model="alert.state" timeout="3000">
      {{ alert.text }}
      <template v-slot:action="{ attrs }">
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
    cameras: ['Todas','FHAZ','RHAZ','MAST','CHECKCAM','MAHLI','MARDI','NAVCAM','PANCAM','MINITES'],
    rovers: ['Curiosity', 'Spirit', 'Opportunity'],
    cameraSelected: null,
    roverSelected: null,
    rules: [
      v => !!v || '* Este campo es obligatorio',
      v => !isNaN(parseFloat(v)) || '* Debes ingresar un valor numérico'
    ],
    alert: {
      text: "",
      state: false,
    }
  }),
  computed: mapState(['roverSearch']),
  methods: {
    searchRover(){
      if(this.roverSearch.sol!=null && this.roverSearch.rover!=''){
        this.getRover()
      } else{
        this.alert.state = true
        this.alert.text = "Los campo SOL y Rover son obligatorios."
      }
    },
    ...mapActions(['updateRoverSol','updateRoverCamera','updateRoverName','getRover'])
  }
}
</script>