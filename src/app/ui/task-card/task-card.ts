import { Component, input, output } from "@angular/core";
import { Task, TaskStatus } from "../../shared/models/task.model";
import { TaskModalMode } from "../../app.globals";

@Component({
  selector: "app-task-card",
  imports: [],
  templateUrl: "./task-card.html",
  styleUrl: "./task-card.scss",
})
export class TaskCard {
  readonly TaskModalMode = TaskModalMode;
  readonly TaskStatus = TaskStatus;

  readonly task = input<Task>();
  readonly edit = output<void>();
}
