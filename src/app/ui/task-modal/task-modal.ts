import { Component, input, output } from "@angular/core";
import { TaskStatus } from "../../shared/models/task.model";
import { TaskModalMode } from "../../app.globals";

@Component({
  selector: "app-task-modal",
  imports: [],
  templateUrl: "./task-modal.html",
  styleUrl: "./task-modal.scss",
})
export class TaskModal {
  readonly isOpen = input(false);
  readonly mode = input<TaskModalMode>(TaskModalMode.CREATE);
  readonly status = input<TaskStatus>();
  readonly close = output<void>();
}
