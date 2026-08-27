"use client";

import { Todo } from "../types";

interface CalendarProps {
  currentMonth: Date;
  selectedDate: string;
  todos: Todo[];
  onSelectDate: (date: string) => void;
  onChangeMonth: (offset: number) => void;
}

export default function Calendar({
  currentMonth,
  selectedDate,
  todos,
  onSelectDate,
  onChangeMonth,
}: CalendarProps) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50/50 dark:bg-zinc-800/30">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => onChangeMonth(-1)}
          className="px-2 py-1 text-xs font-semibold rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 text-black dark:text-zinc-50 transition-colors"
        >
          &lt; Prev
        </button>
        <span className="text-sm font-semibold text-black dark:text-zinc-50">
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button
          onClick={() => onChangeMonth(1)}
          className="px-2 py-1 text-xs font-semibold rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 text-black dark:text-zinc-50 transition-colors"
        >
          Next &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-zinc-400 mb-2">
        <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isSelected = dateString === selectedDate;
          const hasTasks = todos.some((t) => t.date === dateString);

          return (
            <button
              key={day}
              onClick={() => onSelectDate(dateString)}
              className={`relative flex h-8 w-8 items-center justify-center rounded-full mx-auto text-xs transition-colors ${
                isSelected
                  ? "bg-black text-white dark:bg-white dark:text-black font-bold"
                  : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              {day}
              {hasTasks && !isSelected && (
                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-red-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}