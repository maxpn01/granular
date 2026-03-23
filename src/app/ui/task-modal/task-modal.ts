import { Component, input, output } from "@angular/core";
import { TaskPriority, TaskStatus } from "../../shared/models/task.model";
import { TaskModalMode } from "../../app.globals";
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { TaskFormValues } from "./task-modal.type";
import { IconClose } from "../icons/icon-close";

@Component({
  selector: "app-task-modal",
  imports: [ReactiveFormsModule, IconClose],
  templateUrl: "./task-modal.html",
  styleUrl: "./task-modal.scss",
})
export class TaskModal {
  readonly isOpen = input(false);
  readonly mode = input<TaskModalMode>(TaskModalMode.CREATE);
  readonly status = input<TaskStatus>();
  readonly close = output<void>();
  readonly formSubmit = output<TaskFormValues>();

  tasksForm = new FormGroup({
    title: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(120)],
    }),
    description: new FormControl("", { nonNullable: true }),
    priority: new FormControl(TaskPriority.MEDIUM, { nonNullable: true }),
    status: new FormControl(TaskStatus.TODO, { nonNullable: true }),
  });

  onSubmit() {
    if (this.tasksForm.invalid) return;

    this.tasksForm.controls.status.setValue(this.status() ?? TaskStatus.TODO);
    this.formSubmit.emit(this.tasksForm.getRawValue());
    this.tasksForm.reset();
  }
}
