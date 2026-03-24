import { Component, input, output, signal } from "@angular/core";
import { Task, TaskStatus } from "../../shared/models/task.model";
import { TaskActions } from "../../app.globals";
import { IconEllipsis } from "../icons/icon-ellipsis";
import { IconPen } from "../icons/icon-pen";
import { IconTrashCan } from "../icons/icon-trash-can";

@Component({
  selector: "app-task-card",
  imports: [IconEllipsis, IconPen, IconTrashCan],
  templateUrl: "./task-card.html",
  styleUrl: "./task-card.scss",
})
export class TaskCard {
  readonly TaskActions = TaskActions;
  readonly TaskStatus = TaskStatus;

  readonly task = input<Task>();
  readonly edit = output<void>();
  readonly delete = output<string | undefined>();

  readonly isDropdownOpen = signal<boolean>(false);

  toggleDropdown() {
    this.isDropdownOpen.update((prev) => !prev);
  }
}
