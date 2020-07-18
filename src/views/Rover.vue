<template>
  <v-container>
    <rover-form></rover-form>
    <rover-results></rover-results>
  </v-container>
</template>

<script>
import RoverForm from '../components/RoverForm'
import RoverResults from '../components/RoverResults'

export default {
  components: {
    RoverForm,
    RoverResults
  }
}
</script>