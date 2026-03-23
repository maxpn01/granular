import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Board } from "./ui/board/board";
import { UserProfile } from "./ui/user-profile/user-profile";
import { TaskModal } from "./ui/task-modal/task-modal";
import { APP_TITLE, TaskModalMode } from "./app.globals";
import { Task, TaskStatus } from "./shared/models/task.model";
import { TaskFormValues } from "./ui/task-modal/task-modal.type";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, Board, UserProfile, TaskModal],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  protected readonly title = signal(APP_TITLE);
  readonly isTaskModalOpen = signal(false);
  readonly taskModalMode = signal<TaskModalMode>(TaskModalMode.CREATE);
  readonly taskModalStatus = signal<TaskStatus>(TaskStatus.TODO);
  readonly currentlyEditedTask = signal<Task | null>(null);

  readonly tasks = signal<Task[]>([]);

  openTaskModal(event: {
    mode: TaskModalMode;
    status: TaskStatus;
    task: Task | null;
  }) {
    this.isTaskModalOpen.set(true);
    this.taskModalMode.set(event.mode);
    this.taskModalStatus.set(event.status);
    this.currentlyEditedTask.set(event.task);
  }

  closeTaskModal() {
    this.isTaskModalOpen.set(false);
    this.currentlyEditedTask.set(null);
  }

  addTask(form: TaskFormValues) {
    const newTask: Task = {
      id: form.id,
      title: form.title,
      description: form.description,
      priority: form.priority,
      status: form.status,
      subtasks: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.tasks.update((tasks) => [...tasks, newTask]);
    this.closeTaskModal();
  }

  editTask(form: TaskFormValues) {
    const updatedTask: Task = {
      id: form.id,
      title: form.title,
      description: form.description,
      priority: form.priority,
      status: form.status,
      subtasks: [],
      createdAt: form.createdAt,
      updatedAt: new Date().toISOString(),
    };

    this.tasks.update((tasks) =>
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
    this.closeTaskModal();
  }

  handleTaskSubmit(form: TaskFormValues) {
    if (this.taskModalMode() === TaskModalMode.EDIT) {
      this.editTask(form);
      return;
    }

    this.addTask(form);
  }
}
