import { TaskPriority, TaskStatus } from "../../shared/models/task.model";

export type TaskFormValues = {
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
};
