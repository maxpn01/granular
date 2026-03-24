import {
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from "@angular/core";
import { TaskCard } from "../task-card/task-card";
import { Task, TaskStatus } from "../../shared/models/task.model";
import { TaskActions } from "../../app.globals";
import { IconPlus } from "../icons/icon-plus";
import { TaskFormValues } from "../task-modal/task-modal.type";
import { BoardService } from "../../core/services/board.service";

@Component({
  selector: "app-board",
  imports: [TaskCard, IconPlus],
  templateUrl: "./board.html",
  styleUrl: "./board.scss",
})
export class Board {
  readonly TaskActions = TaskActions;
  readonly TaskStatus = TaskStatus;
  private readonly boardService = inject(BoardService);
  readonly openTaskModal = output<{
    mode: TaskActions;
    status: TaskStatus;
    task: Task | null;
  }>();
  readonly editTask = output<TaskFormValues>();

  tasks = input<Task[]>();

  todoTasks = computed(
    () => this.tasks()?.filter((task) => task.status === TaskStatus.TODO) ?? [],
  );
  progressTasks = computed(
    () =>
      this.tasks()?.filter((task) => task.status === TaskStatus.PROGRESS) ?? [],
  );
  doneTasks = computed(
    () => this.tasks()?.filter((task) => task.status === TaskStatus.DONE) ?? [],
  );

  removeTask(taskId: string | undefined) {
    if (!taskId) return;
    this.boardService.removeTask(taskId);
  }
}
