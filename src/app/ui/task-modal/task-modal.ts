import {
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from "@angular/core";
import { Task, TaskPriority, TaskStatus } from "../../shared/models/task.model";
import { TaskModalMode } from "../../app.globals";
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { TaskFormValues, TaskModalState } from "./task-modal.type";
import { IconClose } from "../icons/icon-close";

@Component({
  selector: "app-task-modal",
  imports: [ReactiveFormsModule, IconClose],
  templateUrl: "./task-modal.html",
  styleUrl: "./task-modal.scss",
})
export class TaskModal {
  readonly state = input<TaskModalState>({ open: false });
  readonly close = output<void>();
  readonly formSubmit = output<TaskFormValues>();

  readonly isEditMode = computed(() => {
    const state = this.state();
    return state.open && state.mode === TaskModalMode.EDIT;
  });

  readonly titleLabel = computed(() =>
    this.isEditMode() ? "Edit task" : "Add task",
  );
  readonly submitLabel = computed(() => (this.isEditMode() ? "Edit" : "Add"));

  tasksForm = new FormGroup({
    title: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(60)],
    }),
    description: new FormControl("", { nonNullable: true }),
    status: new FormControl(TaskStatus.TODO, { nonNullable: true }),
    priority: new FormControl(TaskPriority.MEDIUM, { nonNullable: true }),
  });

  constructor() {
    effect(() => {
      const state = this.state();
      if (!state.open) return;

      if (state.mode === TaskModalMode.EDIT && state.task) {
        this.tasksForm.patchValue({
          title: state.task.title,
          description: state.task.description ?? "",
          status: state.task.status,
          priority: state.task.priority,
        });
        return;
      }

      this.tasksForm.reset({
        title: "",
        description: "",
        status: state.status,
        priority: TaskPriority.MEDIUM,
      });
    });
  }

  onSubmit() {
    if (this.tasksForm.invalid) return;

    const state = this.state();

    if (!state.open) return;

    this.tasksForm.controls.status.setValue(state.status ?? TaskStatus.TODO);
    this.formSubmit.emit(this.tasksForm.getRawValue());
  }
}
