import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { TaskService, Task } from './services/task.service';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { StatusLabelPipe } from './pipes/status-label.pipe';
import { PriorityHighlightDirective } from './directives/priority-highlight.directive';
import { CompletedStrikethroughDirective } from './directives/completed-strikethrough.directive';

/**
 * AppComponent is the root component of the Task Tracker application
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DateFormatPipe,
    TruncateTextPipe,
    StatusLabelPipe,
    PriorityHighlightDirective,
    CompletedStrikethroughDirective
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Task Tracker Pro';

  /** Observable stream of tasks from the service */
  tasks$: Observable<Task[]>;

  /** Task list populated by manual subscription */
  taskList: Task[] = [];

  /** Subscription reference for cleanup */
  private taskSubscription?: Subscription;

  /** Form model properties */
  newTaskTitle: string = '';
  newTaskDescription: string = '';
  newTaskDueDate: string = '';
  newTaskPriority: 'high' | 'medium' | 'low' = 'medium';

  /** UI state properties */
  showAddForm: boolean = false;
  filterCompleted: boolean = false;

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.tasks$;
  }

  /** Initialize component and set up manual subscription */
  ngOnInit(): void {
    this.taskSubscription = this.tasks$.subscribe({
      next: (tasks) => {
        this.taskList = tasks;
        console.log('Tasks updated:', tasks.length);
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
      },
      complete: () => {
        console.log('Task stream completed');
      }
    });
  }

  /** Clean up subscriptions to prevent memory leaks */
  ngOnDestroy(): void {
    if (this.taskSubscription) {
      this.taskSubscription.unsubscribe();
      console.log('Task subscription cleaned up');
    }
  }

  /** Add a new task */
  addTask(): void {
    if (!this.newTaskTitle.trim() || !this.newTaskDueDate) {
      alert('Please fill in all required fields');
      return;
    }

    this.taskService.addTask(
      this.newTaskTitle,
      this.newTaskDescription,
      new Date(this.newTaskDueDate),
      this.newTaskPriority
    );

    this.resetForm();
    this.showAddForm = false;
  }

  /** Toggle task completion status */
  toggleTaskCompletion(taskId: number): void {
    this.taskService.toggleTask(taskId);
  }

  /** Delete a task with confirmation */
  deleteTask(taskId: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId);
    }
  }

  /** Reset the add task form */
  resetForm(): void {
    this.newTaskTitle = '';
    this.newTaskDescription = '';
    this.newTaskDueDate = '';
    this.newTaskPriority = 'medium';
  }

  /** Toggle the visibility of the add task form */
  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  /** Get filtered tasks based on completion status */
  getFilteredTasks(tasks: Task[]): Task[] {
    if (!this.filterCompleted) {
      return tasks;
    }
    return tasks.filter(task => !task.completed);
  }

  /** Check if a task is overdue */
  isOverdue(dueDate: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    return due < today;
  }

  /** Get count of completed tasks */
  getCompletedCount(tasks: Task[]): number {
    return tasks.filter(task => task.completed).length;
  }

  /** Get count of pending tasks */
  getPendingCount(tasks: Task[]): number {
    return tasks.filter(task => !task.completed).length;
  }
}
