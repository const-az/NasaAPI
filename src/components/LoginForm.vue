<template>
  <v-main>
    <!-- Alert on errors -->
    <v-snackbar elevation="0" top color="red" v-model="alert.state" timeout="3000">
      {{ alert.text }}
      <template v-slot:action="{ attrs }">
        <v-btn icon small color="white" v-bind="attrs" @click="alert.state = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <!-- Login card -->
    <v-card flat max-width="350" class="text-center rounded-lg mx-auto py-4 px-3">
      <v-card-text>
        <p class="text-h4 text-md-h3 mb-0 font-weight-medium indigo--text text--darken-3">¡Bienvenido!</p>
        <p class="text-h6 text-md-h6 mb-2">Ingresa tus datos</p>
      </v-card-text>
      <v-card-text>
        <v-form>
          <v-text-field color="indigo darken-4" label="Correo electrónico" prepend-icon="mdi-account" v-model="credentials.email"/>
          <v-text-field color="indigo darken-4" :type="showPassword ? 'text' : 'password'" label="Contraseña"
            prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword" v-model="credentials.password"/>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn depressed small dark class="mx-auto mt-5 px-3" color="indigo darken-4" @click="login">Iniciar sesión</v-btn>
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
    credentials: {
      email: "",
      password: ""
    },
    showPassword: false,
    alert: {
      text: "",
      state: false,
    }
  }),
  methods: {
    login() {
      if (this.credentials.email != "" && this.credentials.password != "") {
        Firebase.auth()
          .signInWithEmailAndPassword(
            this.credentials.email,
            this.credentials.password
          )
          .then(() => {
            let user = this.credentials.email;
            this.updateUser(user);
            this.$router.push("/apod");
          })
          .catch(error => {
            this.alert.state = true;
            if(error.code == "auth/user-not-found"){
              this.alert.text = "Usuario no encontrado.";
            } else{
              this.alert.text = "Usuario o contraseña incorrectos. Intente nuevamente.";
            }
          });
      } else {
        this.alert.state = true;
        this.alert.text = "Todos los campos son obligatorios.";
      }
    },
    ...mapActions(['updateUser'])
  }
};
</script>