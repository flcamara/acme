<script setup lang="ts">
import { TaskProperties } from '@/@types/task';
import { useTaskStore } from '../store/task'
import { ref } from 'vue';

const store = useTaskStore()
const props = defineProps<Props>()
const emit = defineEmits<Emit>()

interface Props {
  task: TaskProperties | undefined
  isDialogEditOpen: boolean
}

const currentTitle = ref(props.task?.title)
const currentDescription = ref(props.task?.description)
const currentContent = ref(props.task?.content)

interface Emit {
  (e: 'update:isDialogEditOpen', value: boolean): void
  (e: 'editTask', value: boolean): void
}

const requiredValidator = (value: unknown) => {
  if (value) return true;

  return 'Este campo é obrigatório';
};

const onSubmit = async () => {
    await store.edit({
        title: currentTitle.value,
        content: currentContent.value,
        description: currentDescription.value
    }, props.task?.id).then((r) => {
        emit('editTask', true)
        emit('update:isDialogEditOpen', false)
    }).catch(e => console.log(e))
}

console.log(props.task)

</script>

<template>
<div class="text-center">
      <v-dialog
        :model-value="$props.isDialogEditOpen"
        max-width="600"
      >
        <v-card
          prepend-icon="mdi-file-alert-outline"
          title="Editar Tarefa"
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
                  v-model="currentTitle"
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
                  v-model="currentDescription"
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
                  v-model="currentContent"
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
              @click="emit('update:isDialogEditOpen', false)"
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