import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

// Import custom services, pipes, and directives
import { TaskService, Task } from './services/task.service';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { StatusLabelPipe } from './pipes/status-label.pipe';
import { PriorityHighlightDirective } from './directives/priority-highlight.directive';
import { CompletedStrikethroughDirective } from './directives/completed-strikethrough.directive';

/**
 * AppComponent - Root component of the Task Tracker application
 * Demonstrates:
 * - Dependency injection of TaskService
 * - Observable subscription patterns (both async pipe and manual)
 * - Integration of custom pipes and directives
 * - Reactive state management
 * 
 * Following patterns from Learning Angular Ch. 4-6
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
  // Application title
  title = 'Task Tracker Pro';

  /**
   * Observable stream of tasks from the service
   * Used with async pipe in template for automatic subscription management
   * This demonstrates the reactive pattern from Chapter 6
   */
  tasks$: Observable<Task[]>;

  /**
   * Alternative: Manual subscription for demonstration
   * This array is populated by manually subscribing to tasks$
   * Shows both subscription patterns as per assignment requirements
   */
  taskList: Task[] = [];

  /**
   * Subscription reference for manual subscription management
   * Important for proper cleanup in ngOnDestroy to prevent memory leaks
   */
  private taskSubscription?: Subscription;

  /**
   * Form model properties for adding new tasks
   * Bound to form inputs using ngModel (two-way data binding)
   */
  newTaskTitle: string = '';
  newTaskDescription: string = '';
  newTaskDueDate: string = '';
  newTaskPriority: 'high' | 'medium' | 'low' = 'medium';

  /**
   * UI state properties
   */
  showAddForm: boolean = false;
  filterCompleted: boolean = false;

  /**
   * Constructor with dependency injection
   * TaskService is injected as a singleton (provided in root)
   * This demonstrates proper use of Angular's DI system (Chapter 5)
   * 
   * @param taskService - Injected TaskService instance
   */
  constructor(private taskService: TaskService) {
    // Initialize the observable stream
    this.tasks$ = this.taskService.tasks$;
  }

  /**
   * OnInit lifecycle hook
   * Called after component initialization
   * Sets up manual subscription to demonstrate subscription patterns
   */
  ngOnInit(): void {
    // Manual subscription example (as per assignment requirements)
    // This demonstrates explicit subscription management
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

  /**
   * OnDestroy lifecycle hook
   * Called before component is destroyed
   * CRITICAL: Unsubscribe from manual subscriptions to prevent memory leaks
   * This demonstrates proper subscription cleanup (Chapter 6)
   */
  ngOnDestroy(): void {
    // Unsubscribe from manual subscription to prevent memory leaks
    if (this.taskSubscription) {
      this.taskSubscription.unsubscribe();
      console.log('Task subscription cleaned up');
    }
  }

  /**
   * Add a new task using the service
   * Validates input and delegates to TaskService
   * Service handles state update and notifies all subscribers
   */
  addTask(): void {
    // Validate required fields
    if (!this.newTaskTitle.trim() || !this.newTaskDueDate) {
      alert('Please fill in all required fields');
      return;
    }

    // Call service method to add task
    this.taskService.addTask(
      this.newTaskTitle,
      this.newTaskDescription,
      new Date(this.newTaskDueDate),
      this.newTaskPriority
    );

    // Reset form
    this.resetForm();
    this.showAddForm = false;
  }

  /**
   * Toggle task completion status
   * Delegates to service which updates state reactively
   * 
   * @param taskId - ID of task to toggle
   */
  toggleTaskCompletion(taskId: number): void {
    this.taskService.toggleTask(taskId);
  }

  /**
   * Delete a task
   * Confirms with user before deletion
   * 
   * @param taskId - ID of task to delete
   */
  deleteTask(taskId: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId);
    }
  }

  /**
   * Reset the add task form
   * Clears all form fields
   */
  resetForm(): void {
    this.newTaskTitle = '';
    this.newTaskDescription = '';
    this.newTaskDueDate = '';
    this.newTaskPriority = 'medium';
  }

  /**
   * Toggle the visibility of the add task form
   */
  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  /**
   * Get filtered tasks based on completion status
   * Demonstrates observable transformation (could use RxJS operators)
   * 
   * @param tasks - Array of tasks to filter
   * @returns Filtered array of tasks
   */
  getFilteredTasks(tasks: Task[]): Task[] {
    if (!this.filterCompleted) {
      return tasks;
    }
    return tasks.filter(task => !task.completed);
  }

  /**
   * Check if a task is overdue
   * Used for conditional styling and display logic
   * 
   * @param dueDate - Task due date
   * @returns True if task is overdue
   */
  isOverdue(dueDate: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    return due < today;
  }

  /**
   * Get count of completed tasks
   * Template helper method
   * 
   * @param tasks - Array of tasks
   * @returns Count of completed tasks
   */
  getCompletedCount(tasks: Task[]): number {
    return tasks.filter(task => task.completed).length;
  }

  /**
   * Get count of pending tasks
   * Template helper method
   * 
   * @param tasks - Array of tasks
   * @returns Count of pending tasks
   */
  getPendingCount(tasks: Task[]): number {
    return tasks.filter(task => !task.completed).length;
  }
}
