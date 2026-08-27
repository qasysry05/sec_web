"use client";

import { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  onToggleTodo: (id: number) => void;
  onToggleTimer: (id: number) => void;
  onDeleteTodo: (id: number) => void;
}

export default function TodoItem({
  todo,
  onToggleTodo,
  onToggleTimer,
  onDeleteTodo,
}: TodoItemProps) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const progress = todo.totalTime > 0 ? todo.timeLeft / todo.totalTime : 0;
  const strokeDashoffset = circumference - progress * circumference;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <li className="flex items-center justify-between rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-3 transition-all">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleTodo(todo.id)}
          className="h-4 w-4 rounded accent-black dark:accent-white cursor-pointer"
        />
        <span
          className={`text-sm ${
            todo.completed
              ? "line-through text-zinc-400 dark:text-zinc-500"
              : "text-black dark:text-zinc-50"
          }`}
        >
          {todo.text}
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Circle Ring Timer */}
        <div className="relative flex items-center justify-center w-12 h-12">
          <svg className="w-12 h-12 -rotate-90 transform">
            <circle
              cx="24"
              cy="24"
              r={radius}
              stroke="currentColor"
              strokeWidth="3"
              className="text-zinc-200 dark:text-zinc-700"
              fill="transparent"
            />
            <circle
              cx="24"
              cy="24"
              r={radius}
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={`transition-all duration-1000 ease-linear ${
                todo.timeLeft === 0
                  ? "text-red-500"
                  : todo.completed
                  ? "text-zinc-400 dark:text-zinc-600"
                  : "text-black dark:text-white"
              }`}
              fill="transparent"
            />
          </svg>
          <span className="absolute text-[10px] font-mono font-medium text-black dark:text-white">
            {todo.timeLeft === 0 ? "00:00" : formatTime(todo.timeLeft)}
          </span>
        </div>

        {!todo.completed && todo.timeLeft > 0 && (
          <button
            onClick={() => onToggleTimer(todo.id)}
            className="text-xs px-2 py-1 rounded border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            {todo.isRunning ? "Pause" : "Start"}
          </button>
        )}

        <button
          onClick={() => onDeleteTodo(todo.id)}
          className="text-xs text-red-500 hover:text-red-700 dark:hover:text-red-400 font-medium"
        >
          Delete
        </button>
      </div>
    </li>
  );
}