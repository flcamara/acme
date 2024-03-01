<template>
  <v-app>
    <DefaultBar />
    <NavBar />

    <DefaultView class="ma-4" />
  </v-app>
</template>

<script lang="ts" setup>
  import NavBar from '@/components/NavBar.vue';
import DefaultBar from './default/AppBar.vue'
  import DefaultView from './default/View.vue'
</script>
