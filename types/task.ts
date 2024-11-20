export interface Task {
    _id: string;
    title: string;
    description: string;
    deadline: Date;
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'completed' | 'in_progress';
    createdAt: Date;
    userId: string;
  }