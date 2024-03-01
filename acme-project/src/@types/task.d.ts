// Tipagem de todos as propriedades de TASK

export interface TaskFilterParams {
    currentPage?: number;
    perPage?: number;
    orderBy?: string;
    direction?: string;
  }

export interface TaskProperties {
    id?: number;
    title?: string;
    description?: string;
    content?: string;
    created_at?: string;
    updated_at?: string
}

export interface TaskResponse {
    tasks: TaskProperties[];
    totalPages: number;
    totalTasks: number;
    perPage: number;
    currentPage: number;
}


export interface TaskCreate {
    title: string
    description: string
    content: string
}

export interface TaskEdit {
    title?: string
    description?: string
    content?: string
}