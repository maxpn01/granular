import { Injectable, signal } from "@angular/core";
import { Task } from "../../shared/models/task.model";
import { TaskFormValues } from "../../ui/task-modal/task-modal.type";

@Injectable({
  providedIn: "root",
})
export class BoardService {
  readonly tasks = signal<Task[]>([]);

  addTask(form: TaskFormValues) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: form.title,
      description: form.description,
      priority: form.priority,
      status: form.status,
      subtasks: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  editTask(taskId: string, form: TaskFormValues) {
    const updatedTask = {
      ...form,
      updatedAt: new Date().toISOString(),
    };

    this.tasks.update((tasks) =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task,
      ),
    );
  }

  removeTask(taskId: string) {
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== taskId));
  }
}
