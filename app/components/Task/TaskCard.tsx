"use client";

import { Task } from "@/types/task";
import { taskService } from "@/services/taskService";
import { useState } from "react";
import EditTaskModal from "./EditTaskModal";

interface TaskCardProps {
  task: Task;
  onUpdate: () => void;
  onDelete: () => void;
}

export default function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(task.status);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStatusChange = async (newStatus: Task["status"]) => {
    try {
      await taskService.updateTask(task._id, { status: newStatus });
      setStatus(newStatus);
      onUpdate();
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(task._id);
        onDelete();
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
          <p className="text-gray-600 mt-1">{task.description}</p>
        </div>
        <div className="flex space-x-2">
          <span
            className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(
              task.priority
            )}`}
          >
            {task.priority}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-4">
          <select
            value={status}
            onChange={(e) =>
              handleStatusChange(e.target.value as Task["status"])
            }
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <span className="text-sm text-gray-500">
            Due: {new Date(task.deadline).toLocaleDateString()}
          </span>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-900"
          >
            Delete
          </button>
          <EditTaskModal
            task={task}
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onUpdate={onUpdate}
          />
        </div>
      </div>
    </div>
  );
}
