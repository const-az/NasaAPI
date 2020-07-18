<template>
  <v-container class="mt-15">
    <v-row>
      <v-col cols="12" md="4" class="text-end">
        <!-- Calendar on large devices -->
        <v-date-picker
          :max="today"
          @dblclick:date="setDate"
          color="blue-grey darken-3"
          v-model="date"
          max-width="290"
          class="mt-4 d-none d-md-block"
        ></v-date-picker>
        <!-- Calendar on small devices -->
        <v-date-picker
          :max="today"
          @dblclick:date="setDate"
          color="blue-grey darken-3"
          v-model="date"
          full-width
          :landscape="$vuetify.breakpoint.smAndUp"
          class="mt-4 d-md-none"
        ></v-date-picker>
        <v-btn small depressed dark color="blue-grey darken-3" @click="setDate(date)">Buscar</v-btn>
        <v-divider class="mt-15 mb-8 d-md-none"></v-divider>
      </v-col>
      <v-col cols="12" md="8">
        <v-card flat>
          <div v-if="apodResult==null">
            <v-card-title>¡Descubre la imagen del día según la NASA!</v-card-title>
            <v-card-subtitle>Haz doble click para elegir una fecha</v-card-subtitle>
          </div>
          <div v-else>
            <!-- If result includes a picture -->
            <v-img v-if="apodResult.media_type=='image'" :src="apodResult.url"></v-img>
            <!-- If result its a video -->
            <iframe v-else :src="apodResult.url"  width="640" height="360" frameborder="0"></iframe>
            <!-- Image data -->
            <v-card-title class="">{{apodResult.title}}</v-card-title>
            <v-card-subtitle>{{apodResult.copyright}} | {{apodResult.date}}</v-card-subtitle>
            <v-card-text>{{apodResult.explanation}}</v-card-text>
            <!-- Loading -->
            <v-overlay absolute :value="loading" opacity="0" class="my-10 py-5">
              <v-progress-circular indeterminate color="blue-grey darken-3" size="64"></v-progress-circular>
            </v-overlay>
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
    done: [false, false, false],
    today: ''
  }),
  methods: {
    setDate(date){
      this.$set(this.done, 0, true)
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
