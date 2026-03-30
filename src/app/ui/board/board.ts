import {
  Component,
  computed,
  inject,
  input,
  output,
} from "@angular/core";
import {
  CdkDragDrop,
  DragDropModule,
} from "@angular/cdk/drag-drop";
import { TaskCard } from "../task-card/task-card";
import { Task, TaskStatus } from "../../shared/models/task.model";
import { TaskActions } from "../../app.globals";
import { IconPlus } from "../icons/icon-plus";
import { BoardService } from "../../core/services/board.service";

@Component({
  selector: "app-board",
  imports: [TaskCard, IconPlus, DragDropModule],
  templateUrl: "./board.html",
  styleUrl: "./board.scss",
})
export class Board {
  readonly TaskActions = TaskActions;
  readonly TaskStatus = TaskStatus;
  readonly connectedDropLists = ["todo-list", "progress-list", "done-list"];
  private readonly boardService = inject(BoardService);
  readonly openTaskModal = output<{
    mode: TaskActions;
    status: TaskStatus;
    task: Task | null;
  }>();

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

  dropTask(event: CdkDragDrop<Task[]>, targetStatus: TaskStatus) {
    const taskId = event.item.data as string | undefined;

    if (!taskId) {
      return;
    }

    this.boardService.moveTask(taskId, targetStatus, event.currentIndex);
  }
}
