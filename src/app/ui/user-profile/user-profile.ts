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

  exportToJson() {
    const tasks = this.boardService.exportTasks();
    const json = JSON.stringify(tasks, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "tasks.json";
    link.click();

    URL.revokeObjectURL(url);
  }

  async importFromFile(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const text = await file.text();
    const parsed = JSON.parse(text);

    this.boardService.importTasks(parsed);

    input.value = "";
  }
}
