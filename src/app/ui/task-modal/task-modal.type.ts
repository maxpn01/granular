import { TaskModalMode } from "../../app.globals";
import { Task, TaskStatus } from "../../shared/models/task.model";

export type TaskModalState =
  | { open: false }
  | {
      open: true;
      mode: TaskModalMode;
      status: TaskStatus;
      task: Task | null;
    };

export type TaskFormValues = Omit<
  Task,
  "id" | "subtasks" | "createdAt" | "updatedAt"
>;
