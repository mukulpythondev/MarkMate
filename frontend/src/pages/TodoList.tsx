
import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { X, Star, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
  starred: boolean;
};

const TodoList = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, text: 'Meeting with CEO', completed: false, starred: false },
    { id: 2, text: 'Pick up kids from school', completed: false, starred: true },
    { id: 3, text: 'Shopping with Brother', completed: false, starred: false },
    { id: 4, text: 'Review with HR', completed: true, starred: false },
    { id: 5, text: 'Going to Dia\'s School', completed: false, starred: false },
    { id: 6, text: 'Check design files', completed: false, starred: true },
    { id: 7, text: 'Update File', completed: false, starred: false },
  ]);

  const [newTodo, setNewTodo] = useState('');

  // Toggle todo completion
  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Toggle star status
  const toggleStar = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, starred: !todo.starred } : todo
    ));
  };

  // Delete todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
    toast.success('Task deleted');
  };

  // Add new todo
  const addTodo = () => {
    if (newTodo.trim() === '') return;
    
    const newTodoItem = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      starred: false,
    };
    
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
    toast.success('New task added');
  };

  // Key press handler for adding todos
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">To-Do List</h1>
            <Button onClick={addTodo} className="bg-blue-500 hover:bg-blue-600">
              Add New Task
            </Button>
          </div>

          {/* Add new todo input */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Add a new task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Todo list */}
          <div className="space-y-4">
            {todos.map((todo) => (
              <div 
                key={todo.id} 
                className={`bg-white rounded-lg p-4 flex items-center shadow-sm border ${
                  todo.completed ? 'bg-blue-50' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  className="h-5 w-5 rounded border-gray-300 mr-4"
                />
                <div className="flex-grow">
                  <span className={todo.completed ? 'line-through text-gray-500' : ''}>{todo.text}</span>
                </div>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1"
                    onClick={() => toggleStar(todo.id)}
                  >
                    <Star className={`h-5 w-5 ${todo.starred ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-red-500 p-1"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TodoList;
