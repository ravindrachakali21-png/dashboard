import { useState } from "react";
import { Star, Trash2, X, Plus } from "lucide-react";

const initialTasks = [
  { id: 1, title: "Meeting with CEO",         checked: false, starred: false },
  { id: 2, title: "Pick up kids from school",  checked: false, starred: true  },
  { id: 3, title: "Shopping with Brother",     checked: false, starred: false },
  { id: 4, title: "Review with HR",            checked: true,  starred: false },
  { id: 5, title: "Going to Dia's School",     checked: false, starred: false },
  { id: 6, title: "Check design files",        checked: false, starred: true  },
  { id: 7, title: "Update File",               checked: false, starred: false },
];

export default function ToDo() {
  const [tasks,     setTasks]     = useState(initialTasks);
  const [newTask,   setNewTask]   = useState("");
  const [showInput, setShowInput] = useState(false);

  const toggleCheck = (id) =>
    setTasks(prev => prev.map(t => t.id === id ? { ...t, checked: !t.checked } : t));

  const toggleStar = (id) =>
    setTasks(prev => prev.map(t => t.id === id ? { ...t, starred: !t.starred } : t));

  const deleteTask = (id) =>
    setTasks(prev => prev.filter(t => t.id !== id));

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks(prev => [
      ...prev,
      { id: Date.now(), title: newTask.trim(), checked: false, starred: false },
    ]);
    setNewTask("");
    setShowInput(false);
  };

  return (
    <section className="p-4 lg:p-6 space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">To-Do List</h1>
        <button
          onClick={() => setShowInput(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-sm"
        >
          <Plus size={16} />
          Add New Task
        </button>
      </div>

      {/* Inline Add Task Input */}
      {showInput && (
        <div className="bg-white rounded-2xl shadow-sm border border-blue-200 px-5 py-4 flex items-center gap-3">
          <input
            autoFocus
            type="text"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter")  addTask();
              if (e.key === "Escape") { setShowInput(false); setNewTask(""); }
            }}
            placeholder="Enter task name..."
            className="flex-1 text-sm text-gray-700 outline-none placeholder-gray-400"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors"
          >
            Add
          </button>
          <button
            onClick={() => { setShowInput(false); setNewTask(""); }}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Task List */}
      <div className="space-y-3">
        {tasks.map(task => (
          <div
            key={task.id}
            className={`flex items-center gap-4 px-5 py-4 rounded-2xl shadow-sm transition-colors
              ${task.checked ? "bg-blue-500" : "bg-white border border-gray-100"}`}
          >
            {/* Checkbox */}
            <button
              onClick={() => toggleCheck(task.id)}
              className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors
                ${task.checked
                  ? "bg-white border-white"
                  : "border-gray-300 bg-white hover:border-blue-400"}`}
            >
              {task.checked && (
                <svg className="w-3.5 h-3.5 text-blue-500" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>

            {/* Title */}
            <span className={`flex-1 text-sm font-medium
              ${task.checked ? "text-white line-through" : "text-gray-700"}`}>
              {task.title}
            </span>

            {/* Star — only on unchecked */}
            {!task.checked && (
              <button onClick={() => toggleStar(task.id)}
                className="shrink-0 transition-transform hover:scale-110">
                <Star size={20}
                  className={task.starred
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300 hover:text-yellow-300"} />
              </button>
            )}

            {/* Delete */}
            {task.checked ? (
              <button onClick={() => deleteTask(task.id)}
                className="w-8 h-8 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center shrink-0 transition-colors">
                <Trash2 size={16} className="text-white" />
              </button>
            ) : (
              <button onClick={() => deleteTask(task.id)}
                className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center shrink-0 hover:bg-gray-100 transition-colors">
                <X size={13} className="text-gray-400" />
              </button>
            )}
          </div>
        ))}

        {/* Empty state */}
        {tasks.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-16 flex flex-col items-center justify-center text-center">
            <p className="text-gray-400 font-medium">No tasks yet!</p>
            <p className="text-gray-300 text-sm mt-1">Click "Add New Task" to get started</p>
          </div>
        )}
      </div>
    </section>
  );
}