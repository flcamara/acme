// Utilities
import { AxiosPromise } from 'axios';
import axios from '@/plugins/axios'
import { defineStore } from 'pinia'
import type { TaskFilterParams, TaskResponse, TaskCreate, TaskProperties, TaskEdit } from '@/@types/task';

export const useTaskStore = defineStore('task', {
  state: () => ({
    //
  }),
  actions: {
    async fetchTasks(params: TaskFilterParams): AxiosPromise<TaskResponse> {
      return axios.get('/tasks', { params });
    },
    async create(params: TaskCreate): AxiosPromise<{success: true}> {
      return axios.post('/tasks', { ...params });
    },
    async destroy(id?: number): AxiosPromise<{success: true}> {
      return axios.delete(`/tasks/${id}`);
    },
    async fetchById(id?: number): AxiosPromise<TaskProperties> {
      return axios.get(`/tasks/${id}`);
    },
    async edit(params?: TaskEdit, id?: number): AxiosPromise<{success: true}> {
      return axios.put(`/tasks/${id}`, { ...params });
    },
  }
})
