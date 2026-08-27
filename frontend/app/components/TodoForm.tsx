"use client";

import { useState } from "react";

interface TodoFormProps {
  onAddTodo: (text: string, minutes: number) => void;
}

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [input, setInput] = useState("");
  const [minutesInput, setMinutesInput] = useState("2");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const parsedMinutes = parseFloat(minutesInput);
    const minutes = isNaN(parsedMinutes) || parsedMinutes <= 0 ? 2 : parsedMinutes;

    onAddTodo(input.trim(), minutes);
    setInput("");
    setMinutesInput("2");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Clean room..."
        className="flex-1 rounded-full border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-2 text-sm text-black dark:text-zinc-50 outline-none focus:border-black dark:focus:border-white transition-colors"
      />
      <div className="flex gap-2">
        <input
          type="number"
          min="0.1"
          step="any"
          value={minutesInput}
          onChange={(e) => setMinutesInput(e.target.value)}
          placeholder="Mins"
          className="w-20 rounded-full border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-center text-sm text-black dark:text-zinc-50 outline-none focus:border-black dark:focus:border-white transition-colors"
        />
        <button
          type="submit"
          className="rounded-full bg-black dark:bg-zinc-50 px-5 py-2 text-sm font-medium text-white dark:text-black transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200"
        >
          Add
        </button>
      </div>
    </form>
  );
}