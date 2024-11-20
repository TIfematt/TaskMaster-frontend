import { Task } from '@/types/task';

const BASE_URL = 'http://localhost:3001/api';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export const taskService = {
  async createTask(task: Partial<Task>) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/task/create-task`, {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        Authorization: `Bearer ${token}`,
      },
      // credentials: 'include',
      body: JSON.stringify(task),
    });
    return response.json();
  },

  async getTasks(filters?: { status?: string; priority?: string; deadline?: string }) {
    const token = localStorage.getItem('token');
    const queryParams = new URLSearchParams(filters as Record<string, string>);
    const response = await fetch(`${BASE_URL}/task/tasks?${queryParams}`, {
      headers: {
        ...defaultHeaders,
        Authorization: `Bearer ${token}`,
      },
      // credentials: 'include',
    });
    return response.json();
  },

  async updateTask(id: string, updates: Partial<Task>) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/task/update-task/${id}`, {
      method: 'PUT',
      headers: {
        ...defaultHeaders,
        Authorization: `Bearer ${token}`,
      },
      // credentials: 'include',
      body: JSON.stringify(updates),
    });
    return response.json();
  },

  async deleteTask(id: string) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/task/delete-task/${id}`, {
      method: 'DELETE',
      headers: {
        ...defaultHeaders,
        Authorization: `Bearer ${token}`,
      },
      // credentials: 'include',
    });
    return response.json();
  },
};