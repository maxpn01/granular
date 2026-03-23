import { Component, effect, input, output } from "@angular/core";
import { Task, TaskPriority, TaskStatus } from "../../shared/models/task.model";
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
  readonly task = input<Task | null>();
  readonly close = output<void>();
  readonly formSubmit = output<TaskFormValues>();

  tasksForm = new FormGroup({
    id: new FormControl("", { nonNullable: true }),
    title: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(120)],
    }),
    description: new FormControl("", { nonNullable: true }),
    priority: new FormControl(TaskPriority.MEDIUM, { nonNullable: true }),
    status: new FormControl(TaskStatus.TODO, { nonNullable: true }),
    subtasks: new FormControl([] as Task[], { nonNullable: true }),
    createdAt: new FormControl("", { nonNullable: true }),
    updatedAt: new FormControl("", { nonNullable: true }),
  });

  constructor() {
    effect(() => {
      const task = this.task();
      const mode = this.mode();
      const status = this.status() ?? TaskStatus.TODO;

      if (mode === TaskModalMode.EDIT && task) {
        this.tasksForm.patchValue({
          id: task.id,
          title: task.title,
          description: task.description ?? "",
          priority: task.priority,
          status: task.status,
          subtasks: task.subtasks,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
        });
        return;
      }

      this.tasksForm.reset({
        id: crypto.randomUUID(),
        title: "",
        description: "",
        priority: TaskPriority.MEDIUM,
        status,
        subtasks: [],
        createdAt: "",
        updatedAt: "",
      });
    });
  }

  onSubmit() {
    if (this.tasksForm.invalid) return;

    this.tasksForm.controls.status.setValue(this.status() ?? TaskStatus.TODO);
    this.formSubmit.emit(this.tasksForm.getRawValue());
  }
}
