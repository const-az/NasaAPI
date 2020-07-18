<template>
  <v-main>
    <!-- Alert on errors and success -->
    <v-snackbar elevation="0" top color="blue-grey darken-3" v-model="alert.state" timeout="3000">
      {{ alert.text }}
      <template v-slot:action="{ attrs }">
        <!-- To close alert -->
        <v-btn icon small color="white" v-bind="attrs" @click="alert.state = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <!-- Login card -->
    <v-card flat max-width="320" class="text-center rounded-xl mx-auto mt-16 pa-2">
      <v-card-text>
        <p class="text-h4 text-md-h3 mb-0 font-weight-medium blue-grey--text text--darken-3">¡Bienvenido!</p>
        <p class="text-h6 text-md-h5 mb-2">Ingresa</p>
      </v-card-text>
      <!-- Log-in form -->
      <v-card-text>
        <v-form>
          <v-text-field
            color="blue-grey darken-3"
            label="Correo electrónico"
            prepend-icon="mdi-account"
            v-model="credentials.email"
          />
          <v-text-field
            color="blue-grey darken-3"
            :type="showPassword ? 'text' : 'password'"
            label="Contraseña"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            v-model="credentials.password"
          />
        </v-form>
      </v-card-text>
      <!-- Send form -->
      <v-card-actions>
        <v-btn
          depressed
          rounded
          small
          dark
          class="mx-auto mt-5 px-3"
          color="blue-grey darken-3"
          @click="login"
        >Iniciar sesión</v-btn>
      </v-card-actions>
    </v-card>
  </v-main>
</template>

<script>
import Firebase from "firebase";
import { mapActions } from 'vuex';

export default {
  name: "App",
  data: () => ({
    // Form
    credentials: {
      email: "",
      password: ""
    },
    showPassword: false,
    // Alert
    alert: {
      text: "",
      state: false,
      type: ""
    }
  }),
  methods: {
    login() {
      // If all inputs are filled
      if (this.credentials.email != "" && this.credentials.password != "") {
        Firebase.auth()
          .signInWithEmailAndPassword(
            this.credentials.email,
            this.credentials.password
          )
          .then(() => {
            let user = this.credentials.email;
            this.updateUser(user);
            // Redirect to APOD view
            this.$router.push("/apod");
          })
          // Error alert
          .catch(error => {
            this.alert.state = true;
            // If user is not registered
            if(error.code == "auth/user-not-found"){
              this.alert.text = "Usuario no encontrado.";
            // If credentials arent valid
            } else{
              this.alert.text = "Usuario o contraseña incorrectos. Intente nuevamente.";
            }
          });
      } else {
        // If any input is empty
        this.alert.state = true;
        this.alert.text = "Todos los campos son obligatorios.";
      }
    },
    ...mapActions(['updateUser'])
  }
};
</script>