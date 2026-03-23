import { Component, input, output } from "@angular/core";
import { TaskCard } from "../task-card/task-card";
import { TaskStatus } from "../../shared/models/task.model";
import { TaskModalMode } from "../../app.globals";

@Component({
  selector: "app-board",
  imports: [TaskCard],
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
}
