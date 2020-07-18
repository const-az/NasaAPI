<template>
  <div>
    <v-app-bar :color="onHome ? 'transparent' : 'blue-grey darken-3'" absolute dense dark flat>
      <!-- Brand name, redirects to home -->
      <router-link to="/" class="text-decoration-none white--text">
        <!-- On any page -->
        <v-toolbar-title class="font-weight-medium">NASA.app</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <!-- Menu on large devices -->
      <div class="d-none d-md-flex">
        <!-- If it's logged in -->
        <div v-if="currentUser" class="my-auto">
          <!-- Apod page -->
          <v-btn rounded small text to="/apod">
            APOD
          </v-btn>
          <!-- Rover page -->
          <v-btn rounded small text to="/rover">
            ROVER
          </v-btn>
          <!-- Logout -->
          <v-btn rounded small text @click="logout">
            Cerrar sesión
          </v-btn>
        </div>
      </div>
      <!-- Menu on small devices -->
      <v-menu rounded v-if="currentUser"> 
        <!-- Button activator  -->
        <template v-slot:activator="{ attrs, on }">
          <v-btn class="d-md-none white--text" icon v-bind="attrs" v-on="on" depressed>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <!-- Dropdown list items -->
        <v-list flat elevation="0">
          <!-- Only if it's logged in -->
          <div>
            <!-- Apod page -->
            <v-list-item link to="/apod">
              <v-list-item-title>
                Apod
              </v-list-item-title>
            </v-list-item>
            <!-- Rover page -->
            <v-list-item link to="/rover">
              <v-list-item-title>
                Rover
              </v-list-item-title>
            </v-list-item>
            <!-- Logout -->
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
import Firebase from 'firebase'
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    // Changes logo color
    onHome: true,
  }),
  methods: {
    // Logout from Firebase / resets current user to false
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
  // Checks on routes to change appbar colors depending on them
  watch: {
    '$route' (){
      if(this.$route.path == '/' || this.$route.path == '/home'){
        // Changes appbar color to transparent
        this.onHome = true
      } else{
        // Changes appbar color to dark blue
        this.onHome = false
      }
    }
  }
}
</script>