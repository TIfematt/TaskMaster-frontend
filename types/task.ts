export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'completed' | 'in_progress';

export interface Task {
    _id: string;
    title: string;
    description: string;
    deadline: Date;
    priority: TaskPriority;
    status: TaskStatus;
    createdAt: Date;
    userId: string;
  }