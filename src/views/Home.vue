<template>
  <v-main>
    <v-img height="100vh" :src="homeImg">
      <login-form></login-form>
    </v-img>
  </v-main>
</template>

<script>
import { mapState } from 'vuex'
import LoginForm from '../components/LoginForm'
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    LoginForm
  },
  computed: mapState(['homeImg'])
}
</script>
