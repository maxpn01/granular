import { Component, inject, signal } from "@angular/core";
import { Board } from "./ui/board/board";
import { UserProfile } from "./ui/user-profile/user-profile";
import { TaskModal } from "./ui/task-modal/task-modal";
import { APP_TITLE, TaskActions } from "./app.globals";
import { Task, TaskStatus } from "./shared/models/task.model";
import {
  TaskFormValues,
  TaskModalState,
} from "./ui/task-modal/task-modal.type";
import { BoardService } from "./core/services/board.service";

@Component({
  selector: "app-root",
  imports: [Board, UserProfile, TaskModal],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  protected readonly title = signal(APP_TITLE);

  readonly taskModalState = signal<TaskModalState>({ open: false });

  readonly boardService = inject(BoardService);

  openTaskModal(event: {
    mode: TaskActions;
    status: TaskStatus;
    task: Task | null;
  }) {
    this.taskModalState.set({
      open: true,
      mode: event.mode,
      status: event.status,
      task: event.task,
    });
  }

  closeTaskModal() {
    this.taskModalState.set({ open: false });
  }

  handleTaskSubmit(form: TaskFormValues) {
    const state = this.taskModalState();

    if (state.open && state.mode === TaskActions.EDIT && state.task) {
      this.boardService.editTask(state.task.id, form);
      this.closeTaskModal();
      return;
    }

    this.boardService.addTask(form);
    this.closeTaskModal();
  }
}
