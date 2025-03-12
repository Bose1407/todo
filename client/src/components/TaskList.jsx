import React from 'react';
import { format } from 'date-fns';
import { Pencil, Trash } from 'lucide-react';
import { deleteTask, updateTask } from '../api/tasks';
import toast from 'react-hot-toast';

function TaskList({ tasks, setTasks, loading }) {
  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task._id !== taskId));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const updatedTask = await updateTask(task._id, {
        ...task,
        completed: !task.completed
      });
      setTasks(tasks.map(t => t._id === task._id ? updatedTask : t));
      toast.success('Task updated successfully');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-600">No tasks found</h3>
        <p className="text-gray-500 mt-2">Start by adding a new task</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`bg-white rounded-lg p-6 shadow-md transition-all ${
            task.completed ? 'opacity-75' : ''
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task)}
                  className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <h3 className={`text-lg font-medium ${
                  task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                }`}>
                  {task.title}
                </h3>
              </div>
              <p className="mt-2 text-gray-600">{task.description}</p>
              <div className="mt-3 flex items-center gap-4">
                <span className="text-sm text-gray-500">
                  Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
                </span>
                <span className={`text-sm ${
                  task.completed ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {task.completed ? 'Completed' : 'Pending'}
                </span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => handleDelete(task._id)}
                className="p-2 text-gray-500 hover:text-red-600 transition-colors"
              >
                <Trash className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;