<template>
  <div>
    <v-app-bar :color="onHome ? 'transparent' : 'indigo darken-4'" absolute dense dark flat>
      <router-link to="/" class="text-decoration-none white--text">
        <v-img contain width="50" src="../assets/nasa-logo.png"></v-img>
      </router-link>
      <v-spacer></v-spacer>
      <theme-switch :onHome="onHome"></theme-switch>
      <v-divider vertical class="mx-5" v-if="currentUser"></v-divider>
      <div class="d-none d-md-flex">
        <div v-if="currentUser" class="my-auto">
          <v-btn small text to="/apod">
            APOD
          </v-btn>
          <v-btn small text to="/rover">
            ROVER
          </v-btn>
          <v-btn small text @click="logout">
            Cerrar sesión
          </v-btn>
        </div>
      </div>
      <v-menu v-if="currentUser"> 
        <template v-slot:activator="{ attrs, on }">
          <v-btn class="d-md-none white--text" icon v-bind="attrs" v-on="on" depressed>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list flat elevation="0">
          <div>
            <v-list-item link to="/apod">
              <v-list-item-title>
                Apod
              </v-list-item-title>
            </v-list-item>
            <v-list-item link to="/rover">
              <v-list-item-title>
                Rover
              </v-list-item-title>
            </v-list-item>
            <v-list-item link @click="logout">
              <v-list-item-title>
                Cerrar sesión
              </v-list-item-title>
            </v-list-item>
          </div>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import ThemeSwitch from '../components/ThemeSwitch'
import Firebase from 'firebase'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    ThemeSwitch
  },
  data: () => ({
    onHome: true,
  }),
  methods: {
    logout(){
      Firebase.auth().signOut().then( () => {
        this.updateUser(false)
        this.$router.push('/home')
      })
    },
    ...mapActions(['updateUser'])
  },
  computed: {
    ...mapState(['currentUser']),
  },
  watch: {
    '$route' (){
      if(this.$route.path == '/' || this.$route.path == '/home'){
        this.onHome = true
      } else{
        this.onHome = false
      }
    }
  }
}
</script>