"use client";

import { useState, useEffect } from "react";
import { Todo } from "./types";
import Calendar from "./components/Calendar";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import MusicPlayer from "./components/MusicPlayer";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.isRunning && todo.timeLeft > 0) {
            return { ...todo, timeLeft: todo.timeLeft - 1 };
          }
          if (todo.timeLeft === 0 && todo.isRunning) {
            return { ...todo, isRunning: false };
          }
          return todo;
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddTodo = (text: string, minutes: number) => {
    const initialSeconds = Math.round(minutes * 60);

    const newTodo: Todo = {
      id: Date.now(),
      text,
      totalTime: initialSeconds,
      timeLeft: initialSeconds,
      completed: false,
      isRunning: false,
      date: selectedDate,
    };

    setTodos([...todos, newTodo]);
  };

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          const isCompleted = !todo.completed;
          return {
            ...todo,
            completed: isCompleted,
            isRunning: isCompleted ? false : todo.isRunning,
          };
        }
        return todo;
      })
    );
  };

  const handleToggleTimer = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id && todo.timeLeft > 0
          ? { ...todo, isRunning: !todo.isRunning }
          : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleChangeMonth = (offset: number) => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1)
    );
  };

  const filteredTodos = todos.filter((todo) => todo.date === selectedDate);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black py-12 px-6">
      
      {/* Side-by-side Flex Wrapper */}
      <div className="flex flex-col lg:flex-row items-start justify-center gap-6 w-full max-w-5xl">
        
        {/* Main Todo Container */}
        <main className="flex-1 w-full flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-sm dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <h1 className="font-display text-4xl font-normal tracking-tight text-black dark:text-zinc-50">
              My Timed Tasks
            </h1>
          </div>

          <Calendar
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            todos={todos}
            onSelectDate={setSelectedDate}
            onChangeMonth={handleChangeMonth}
          />

          <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Tasks for: <span className="font-semibold text-black dark:text-zinc-200">{selectedDate}</span>
          </div>

          <TodoForm onAddTodo={handleAddTodo} />

          <ul className="flex flex-col gap-2">
            {filteredTodos.length === 0 ? (
              <li className="py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
                No tasks for this date.
              </li>
            ) : (
              filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggleTodo={handleToggleTodo}
                  onToggleTimer={handleToggleTimer}
                  onDeleteTodo={handleDeleteTodo}
                />
              ))
            )}
          </ul>
        </main>

        {/* Music Player Sidebar */}
        <MusicPlayer />
        
      </div>
    </div>
  );
}