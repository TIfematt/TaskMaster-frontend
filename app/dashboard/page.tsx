'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import ProtectedRoute from '../components/Auth/ProtectedRoute';
import CreateTaskForm from '../components/Task/CreateTaskForm';
import TaskList from '../components/Task/TaskList';

export default function Dashboard() {
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Your Tasks</h1>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              {showCreateForm ? 'Close Form' : 'Create New Task'}
            </button>
          </div>

          {showCreateForm && (
            <CreateTaskForm onTaskCreated={() => setShowCreateForm(false)} />
          )}

          <TaskList />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}