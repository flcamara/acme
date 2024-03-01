<script setup lang="ts">

</script>

<template>

      <v-navigation-drawer
        expand-on-hover
        rail
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
            subtitle="jondoe@gmailcom"
            title="Jon Doe"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-folder" title="Tarefas" value="tasks" to="/tasks"></v-list-item>

        </v-list>
      </v-navigation-drawer>
</template>
<style scoped>

</style>