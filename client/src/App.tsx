import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { CheckCircle, Clock, ListTodo, Plus, Trash2 } from 'lucide-react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { fetchTasks } from './api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ListTodo className="h-8 w-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-800">Task Manager</h1>
            </div>
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              Add Task
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <h3 className="font-semibold text-gray-700">Total Tasks</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <h3 className="font-semibold text-gray-700">Pending Tasks</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {tasks.filter(task => !task.completed).length}
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Trash2 className="h-5 w-5 text-red-500" />
              <h3 className="font-semibold text-gray-700">Completed Tasks</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {tasks.filter(task => task.completed).length}
            </p>
          </div>
        </div>

        <main>
          <TaskList 
            tasks={tasks} 
            setTasks={setTasks} 
            loading={loading} 
          />
        </main>
      </div>

      <TaskForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onTaskAdded={(newTask) => {
          setTasks([...tasks, newTask]);
          setIsFormOpen(false);
        }}
      />
      <footer style={{display:"flex", justifyContent:"center",alignItems:"center",marginTop:"10%"}}>
        Done By Bose🐺
      </footer>
    </div>
    
  );
}

export default App;