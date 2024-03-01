<script setup lang="ts">
import { useTaskStore } from '../store/task'

const store = useTaskStore()

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

interface Props {
  id: number | undefined
  isDialogOpen: boolean
}

interface Emit {
  (e: 'update:isDialogOpen', value: boolean): void
  (e: 'deleteTask', value: boolean): void
}

const closeDelete = () => {
    emit('update:isDialogOpen', false)
}

const deleteItemConfirm = async () => {
    await store.destroy(props.id).then((r) => {
        emit('update:isDialogOpen', false)
        emit('deleteTask', true)
    }).catch(e => console.log(e))
}

</script>

<template>
    <v-dialog :model-value="$props.isDialogOpen" max-width="500px">
          <v-card>
            <v-card-title class="text-h6">Você tem certeza que deseja exluir essa tarefa?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">Sim</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
  </template>

<style scoped>

</style>