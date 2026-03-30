import { Component, computed, inject } from "@angular/core";
import { BoardService } from "../../core/services/board.service";
import { TaskStatus } from "../../shared/models/task.model";

@Component({
  selector: "app-user-profile",
  imports: [],
  templateUrl: "./user-profile.html",
  styleUrl: "./user-profile.scss",
})
export class UserProfile {
  readonly boardService = inject(BoardService);

  readonly totalTasks = computed(() => this.boardService.tasks().length);
  readonly doneTasks = computed(
    () =>
      this.boardService
        .tasks()
        .filter((task) => task.status === TaskStatus.DONE).length,
  );

  readonly progressPercent = computed(() => {
    const total = this.totalTasks();
    const done = this.doneTasks();

    if (total === 0) return 0;

    return Math.round((done / total) * 100);
  });
}
