import { Task } from "../../shared/models/task.model";

export type TaskFormValues = Omit<Task, "updatedAt">;
