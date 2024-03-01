<script setup lang="ts">
import { onMounted, ref, watch, watchEffect } from 'vue';
import AddNewTaskDialog from '../../components/AddNewTaskDialog.vue'
import type {TaskProperties} from '../../@types/task'
import { useTaskStore } from '../../store/task'
import RemoveTaskDialog from '@/components/RemoveTaskDialog.vue';
import EditTaskDialog from '@/components/EditTaskDialog.vue';

const store = useTaskStore()

const headers = ref([
    {title: 'Título', align: 'start', key: 'title'},
    {title: 'Descrição', align: 'start', key: 'description'},
    {title: 'Conteúdo', align: 'start', key: 'content'},
    {title: 'Atualizado em', align: 'start', key: 'updated_at'},
    {title: 'Criado em', align: 'start', key: 'created_at'},
    { title: 'Ações', key: 'actions', sortable: false }
] as const)
const items = ref<TaskProperties[]>([])
const item = ref<TaskProperties>()

const isRemoveDialogVisible = ref(false)
const isEditDialogVisible = ref(false)
const rowPerPage = ref(10)
const currentPage = ref(1)
const totalPages = ref(0)
const totalItems = ref(0)
const selectedItem = ref<number | undefined>(0)



const fetchItems = async () => {
    await store.fetchTasks({
        perPage: rowPerPage.value,
        currentPage: currentPage.value,
    }).then((r) => {
        items.value = r.data.tasks
        totalPages.value = r.data.totalPages
        totalItems.value = r.data.totalTasks
    }).catch(e => console.log(e))
}

const deleteItem = (id?: number) => {
    selectedItem.value = id
    isRemoveDialogVisible.value = true
}

const editItem = async (params?: any) => {
    item.value = params
    isEditDialogVisible.value = true

}

watch([currentPage, rowPerPage], async () => {
    await fetchItems()
})

onMounted(async () => {
    await fetchItems()
})

</script>

<template>
    <v-card-title>Tarefas</v-card-title>
    <v-card>
        <v-card-text class="d-flex flex-wrap gap-4">
            <div class="d-flex align-center justify-end w-100">
                <AddNewTaskDialog 
                    @create-task="fetchItems"
                />
            </div>

        </v-card-text>

        <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="rowPerPage"
        >
        
            <template v-slot:bottom>
                <v-card-text class="d-flex align-center flex-wrap justify-end gap-4 pa-2">
                    <div
                    class="d-flex align-center me-3"
                    >
                        <v-select
                        v-model="rowPerPage"
                        density="compact"
                        :items="[5, 10, 20, 30]"
                        >
                        </v-select>

                        <v-pagination
                        class="mb-6"
                        v-model="currentPage"
                        :length="totalPages"
                        :total-visible="1"
                        >
                        </v-pagination>
                </div>
                </v-card-text>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-icon
                    class="me-2"
                    size="small"
                    @click="editItem(item)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                    size="small"
                    @click="deleteItem(item.id)"
                >
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>

        <RemoveTaskDialog
         v-model:is-dialog-open="isRemoveDialogVisible"
         :id="selectedItem"
         @delete-task="fetchItems"
         />

         <EditTaskDialog
         v-if="isEditDialogVisible"
         v-model:is-dialog-edit-open="isEditDialogVisible"
         :task="item"
         @edit-task="fetchItems"
         />

    </v-card>
</template>

<style scoped>
.user-pagination-select {
  .v-field__input,
  .v-field__append-inner {
    padding-block-start: 0.3rem;
  }
}
</style>