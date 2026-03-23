import { Component, computed, input, output, signal } from "@angular/core";
import { TaskCard } from "../task-card/task-card";
import { Task, TaskStatus } from "../../shared/models/task.model";
import { TaskModalMode } from "../../app.globals";
import { IconPlus } from "../icons/icon-plus";

@Component({
  selector: "app-board",
  imports: [TaskCard, IconPlus],
  templateUrl: "./board.html",
  styleUrl: "./board.scss",
})
export class Board {
  readonly TaskModalMode = TaskModalMode;
  readonly TaskStatus = TaskStatus;
  readonly openTaskModal = output<{
    mode: TaskModalMode;
    status: TaskStatus;
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
}
