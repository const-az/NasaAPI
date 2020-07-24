<template>
  <v-container class="mt-15">
    <v-row>
      <v-col cols="12" md="4" class="text-end">
        <!-- Calendar on large devices -->
        <v-date-picker 
          :max="today" @click:date="setDate" v-model="date"
          max-width="290" color="indigo darken-3" class="mt-4 d-none d-md-block"
        ></v-date-picker>
        <!-- Calendar on small devices -->
        <v-date-picker
          :max="today" @click:date="setDate" v-model="date"
          color="indigo darken-3" full-width :landscape="$vuetify.breakpoint.smAndUp" class="mt-4 d-md-none"
        ></v-date-picker>
        <v-divider class="mt-15 mb-8 d-md-none"></v-divider>
      </v-col>
      <v-col cols="12" md="8">
        <v-card flat>
          <!-- Welcome message -->
          <div v-if="apodResult==null">
            <v-card-title>¡Descubre la imagen del día según la NASA!</v-card-title>
            <v-card-subtitle>Haz click en una fecha para seleccionarla.</v-card-subtitle>
          </div>
          <!-- Search results -->
          <div v-else>
            <v-card-title v-if="apodResult.error">{{apodResult.error}}</v-card-title>
            <div v-else>
              <!-- If result includes a picture -->
              <v-img v-if="apodResult.media_type=='image'" :src="apodResult.url"></v-img>
              <!-- If result its a video -->
              <div v-else class="iframe-container">
                <iframe class="iframe-responsive" :src="apodResult.url" frameborder="0"></iframe>
              </div>
              <!-- Image data -->
              <v-card-title>{{apodResult.title}}</v-card-title>
              <v-card-subtitle>{{apodResult.copyright}} | {{apodResult.date}}</v-card-subtitle>
              <v-card-text>{{apodResult.explanation}}</v-card-text>
              <!-- Loading -->
              <v-overlay absolute :value="loading" opacity="0" class="my-10 py-5">
                <v-progress-circular indeterminate color="indigo darken-3" size="64"></v-progress-circular>
              </v-overlay>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    today: ''
  }),
  methods: {
    setDate(date){
      this.getApod(date)
    },
    ...mapActions(['getApod','setApodResult'])
  },
  computed: mapState(['apodResult', 'loading']),
  created(){
    this.setApodResult(null)
    this.today = this.date
  }
}
</script>

<style>
.iframe-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
}

.iframe-responsive {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
</style>
