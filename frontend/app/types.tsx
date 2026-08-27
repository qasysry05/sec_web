export interface Todo {
  id: number;
  text: string;
  totalTime: number;
  timeLeft: number;
  completed: boolean;
  isRunning: boolean;
  date: string;
}