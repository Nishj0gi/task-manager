import React, { useState } from 'react';
import { Plus, Trash2, Check, Star, Search } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('personal');

  const categories = {
    personal: { name: 'Personal', color: 'bg-blue-500', icon: '👤' },
    work: { name: 'Work', color: 'bg-purple-500', icon: '💼' },
    shopping: { name: 'Shopping', color: 'bg-green-500', icon: '🛒' },
    health: { name: 'Health', color: 'bg-red-500', icon: '❤️' },
    study: { name: 'Study', color: 'bg-yellow-500', icon: '📚' }
  };

  const addTask = () => {
    if (taskInput.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: taskInput,
      completed: false,
      priority: priority,
      category: category,
      createdAt: new Date().toISOString(),
      starred: false
    };

    setTasks([newTask, ...tasks]);
    setTaskInput('');
    setPriority('medium');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleStar = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, starred: !task.starred } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'active' ? !task.completed :
      filter === 'completed' ? task.completed :
      filter === 'starred' ? task.starred :
      task.category === filter;

    const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
    starred: tasks.filter(t => t.starred).length
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Task Manager
          </h1>
          <p className="text-purple-200 text-lg">Organize your life, one task at a time</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all">
            <div className="text-purple-200 text-sm mb-1">Total Tasks</div>
            <div className="text-3xl font-bold text-white">{stats.total}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all">
            <div className="text-purple-200 text-sm mb-1">Active</div>
            <div className="text-3xl font-bold text-blue-300">{stats.active}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all">
            <div className="text-purple-200 text-sm mb-1">Completed</div>
            <div className="text-3xl font-bold text-green-300">{stats.completed}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all">
            <div className="text-purple-200 text-sm mb-1">Starred</div>
            <div className="text-3xl font-bold text-yellow-300">{stats.starred}</div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          
          <div className="p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-b border-white/10">
            <div className="flex flex-col md:flex-row gap-3 mb-4">
              <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                placeholder="What needs to be done?"
                className="flex-1 px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              />
              <button
                onClick={addTask}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Add Task
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                {Object.entries(categories).map(([key, cat]) => (
                  <option key={key} value={key} className="bg-gray-800">{cat.icon} {cat.name}</option>
                ))}
              </select>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="low" className="bg-gray-800">🟢 Low Priority</option>
                <option value="medium" className="bg-gray-800">🟡 Medium Priority</option>
                <option value="high" className="bg-gray-800">🔴 High Priority</option>
              </select>
            </div>
          </div>

          <div className="p-6 border-b border-white/10">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tasks..."
                  className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    filter === 'all' 
                      ? 'bg-white text-purple-900' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('active')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    filter === 'active' 
                      ? 'bg-white text-purple-900' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilter('completed')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    filter === 'completed' 
                      ? 'bg-white text-purple-900' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Completed
                </button>
                <button
                  onClick={() => setFilter('starred')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    filter === 'starred' 
                      ? 'bg-white text-purple-900' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <Star size={16} className="inline mr-1" />
                  Starred
                </button>
              </div>
            </div>

            <div className="flex gap-2 mt-3 overflow-x-auto">
              {Object.entries(categories).map(([key, cat]) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    filter === key 
                      ? `${cat.color} text-white` 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 max-h-96 overflow-y-auto">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-purple-200 text-lg">
                  {tasks.length === 0 ? 'No tasks yet. Add your first task!' : 'No tasks match your filter.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTasks.map(task => (
                  <div
                    key={task.id}
                    className={`group bg-white/10 backdrop-blur-md rounded-xl p-4 border-l-4 ${getPriorityColor(task.priority)} border border-white/20 hover:bg-white/15 transition-all transform hover:scale-[1.02] ${
                      task.completed ? 'opacity-60' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          task.completed
                            ? 'bg-green-500 border-green-500'
                            : 'border-white/30 hover:border-white/50'
                        }`}
                      >
                        {task.completed && <Check size={16} className="text-white" />}
                      </button>

                      <div className="flex-1 min-w-0">
                        <p className={`text-white text-lg ${task.completed ? 'line-through' : ''}`}>
                          {task.text}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2 items-center">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${categories[task.category].color} text-white`}>
                            {categories[task.category].icon} {categories[task.category].name}
                          </span>
                          <span className="text-xs text-purple-200">
                            {new Date(task.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleStar(task.id)}
                          className={`p-2 rounded-lg transition-all ${
                            task.starred 
                              ? 'text-yellow-400 hover:text-yellow-500' 
                              : 'text-white/30 hover:text-white/60'
                          }`}
                        >
                          <Star size={18} fill={task.starred ? 'currentColor' : 'none'} />
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-2 text-white/30 hover:text-red-400 rounded-lg hover:bg-red-500/20 transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-purple-200 text-sm">
            Press Enter to quickly add tasks • Click star to mark important
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;