'use client';

import { useEffect, useState } from 'react';
import { Task } from '@/types/task';
import { taskService } from '@/services/taskService';
import TaskCard from './TaskCard';
import TaskFilters from './TaskFilters';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    deadline: '',
    search: '',
  });

  const fetchTasks = async () => {
    try {
      const response = await taskService.getTasks({
        status: filters.status,
        priority: filters.priority,
        deadline: filters.deadline,
      });
      setTasks(response.tasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters.status, filters.priority, filters.deadline]);

  useEffect(() => {
    let filtered = [...tasks];
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        task =>
          task.title.toLowerCase().includes(searchTerm) ||
          task.description.toLowerCase().includes(searchTerm)
      );
    }
    
    setFilteredTasks(filtered);
  }, [tasks, filters.search]);

  return (
    <div className="space-y-6">
      <TaskFilters onFilterChange={setFilters} />
      
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No tasks found matching your criteria
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onUpdate={fetchTasks}
              onDelete={fetchTasks}
            />
          ))
        )}
      </div>
    </div>
  );
}