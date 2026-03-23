import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Board } from "./ui/board/board";
import { UserProfile } from "./ui/user-profile/user-profile";
import { TaskModal } from "./ui/task-modal/task-modal";
import { APP_TITLE, TaskModalMode } from "./app.globals";
import { TaskStatus } from "./shared/models/task.model";

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

  openTaskModal(event: { mode: TaskModalMode; status?: TaskStatus }) {
    this.isTaskModalOpen.set(true);
    this.taskModalMode.set(event.mode);

    if (event?.status) this.taskModalStatus.set(event.status);
  }

  closeTaskModal() {
    this.isTaskModalOpen.set(false);
  }
}
