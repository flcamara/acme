<script setup lang="ts">
import { ref } from 'vue';
import { useTaskStore } from '../store/task'

const store = useTaskStore()
const emit = defineEmits<Emit>()

interface Emit {
    (e: 'createTask', value: boolean): void
}

const dialog = ref(false)

const title = ref<string>('')
const description = ref<string>('')
const content = ref<string>('')


const requiredValidator = (value: unknown) => {
  if (value) return true;

  return 'Este campo é obrigatório';
};

const onSubmit = async () => {
    await store.create({
        title: title.value,
        content: content.value,
        description: description.value
    }).then((r) => {
        emit('createTask', true)
        dialog.value = false
        title.value = ''
        content.value = ''
        description.value = ''
    }).catch(e => console.log(e))
}

</script>

<template>
    <div class="text-center">
      <v-dialog
        v-model="dialog"
        max-width="600"
      >
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            prepend-icon="mdi-file-alert-outline"
            text="Adicionar Task"
            variant="outlined"
            v-bind="activatorProps"
          ></v-btn>
        </template>
  
        <v-card
          prepend-icon="mdi-file-alert-outline"
          title="Nova Tarefa"
        >
        <v-form @submit.prevent="onSubmit">
          <v-card-text>
            <v-row dense>
              <v-col
                cols="12"
                md="6"
                sm="6"
              >
                <v-text-field
                  v-model="title"
                  label="Título*"
                  :rules="[requiredValidator]"
                ></v-text-field>
              </v-col>
  
              <v-col
                cols="12"
                md="6"
                sm="6"
              >
                <v-text-field
                  v-model="description"
                  hint="seja claro e objetivo"
                  label="Descrição*"
                  :rules="[requiredValidator]"
                ></v-text-field>
              </v-col>
  
              <v-col
                cols="12"
                md="12"
                sm="12"
              >
                <v-textarea
                  v-model="content"
                  hint="explique a tarefa"
                  label="Conteúdo*"
                  :rules="[requiredValidator]"
                ></v-textarea>
              </v-col>
            </v-row>
  
            <small class="text-caption text-medium-emphasis">*indica campos obrigatórios</small>
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
  
            <v-btn
              text="Fechar"
              variant="plain"
              @click="dialog = false"
            ></v-btn>
  
            <v-btn
              color="primary"
              text="Criar"
              variant="tonal"
              type="submit"
            ></v-btn>
        </v-card-actions>
    </v-form>
        </v-card>
      </v-dialog>
    </div>
</template>

<style scoped>

</style>