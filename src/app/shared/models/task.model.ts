export enum TaskStatus {
  TODO = "todo",
  PROGRESS = "progress",
  DONE = "done",
}
export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  subtasks: Task[];
  createdAt: string;
  updatedat: string;
};
