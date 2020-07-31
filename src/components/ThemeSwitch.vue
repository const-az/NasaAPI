<template>
  <v-switch v-model="$vuetify.theme.dark" hide-details inset :color="onHome ? 'white' : 'indigo lighten-1'">
    <template v-slot:label>
      <v-icon>mdi-brightness-6</v-icon>
    </template>
  </v-switch>
</template>

<script>
  export default {
    props: {
      onHome: {
        type: Boolean,
        required: true
      }
    },
    data: vm => ({
      initialDark: vm.$vuetify
        ? vm.$vuetify.theme.dark
        : false,
    }),
    beforeDestroy () {
      if (!this.$vuetify) return

      this.$vuetify.theme.dark = this.initialDark
    },
  }
</script>