import { Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "../../shared/models/task.model";
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

  moveTask(taskId: string, targetStatus: TaskStatus, targetIndex: number) {
    this.tasks.update((tasks) => {
      const taskToMove = tasks.find((task) => task.id === taskId);

      if (!taskToMove) {
        return tasks;
      }

      const remainingTasks = tasks.filter((task) => task.id !== taskId);
      const tasksByStatus = {
        [TaskStatus.TODO]: remainingTasks.filter(
          (task) => task.status === TaskStatus.TODO,
        ),
        [TaskStatus.PROGRESS]: remainingTasks.filter(
          (task) => task.status === TaskStatus.PROGRESS,
        ),
        [TaskStatus.DONE]: remainingTasks.filter(
          (task) => task.status === TaskStatus.DONE,
        ),
      };

      const updatedTask: Task = {
        ...taskToMove,
        status: targetStatus,
        updatedAt: new Date().toISOString(),
      };
      const bucket = tasksByStatus[targetStatus];
      const boundedIndex = Math.max(0, Math.min(targetIndex, bucket.length));

      bucket.splice(boundedIndex, 0, updatedTask);

      return [
        ...tasksByStatus[TaskStatus.TODO],
        ...tasksByStatus[TaskStatus.PROGRESS],
        ...tasksByStatus[TaskStatus.DONE],
      ];
    });
  }

  exportTasks() {
    return this.tasks();
  }

  importTasks(tasks: Task[]) {
    this.tasks.set(tasks);
  }
}
