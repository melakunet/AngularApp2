import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Task interface representing the structure of a task object
 * Used throughout the application for type safety
 */
export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  createdAt: Date;
}

/**
 * TaskService - Core service for managing task data
 * Uses RxJS Observables to manage state updates reactively
 * Follows the book's pattern for reactive state management (Ch. 4-6)
 * 
 * @Injectable decorator with providedIn: 'root' makes this a singleton service
 * available throughout the application via dependency injection
 */
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  /**
   * Private array to store tasks in memory
   * This serves as our in-memory database for the application
   */
  private tasks: Task[] = [];

  /**
   * BehaviorSubject to manage task state reactively
   * BehaviorSubject is used because it:
   * 1. Holds the current value
   * 2. Emits the current value immediately to new subscribers
   * 3. Allows us to push new values with .next()
   */
  private taskSubject = new BehaviorSubject<Task[]>([]);

  /**
   * Public Observable that components can subscribe to
   * This exposes the task data as read-only to prevent direct manipulation
   * Components subscribe to this to receive automatic updates
   */
  tasks$: Observable<Task[]> = this.taskSubject.asObservable();

  /**
   * Constructor - no dependencies needed for this service
   * Could be extended to inject HttpClient for API calls
   */
  constructor() {
    // Initialize with some sample tasks for demonstration
    this.initializeSampleTasks();
  }

  /**
   * Initialize sample tasks for demonstration purposes
   * This helps demonstrate all features immediately
   */
  private initializeSampleTasks(): void {
    const sampleTasks: Task[] = [
      {
        id: 1,
        title: 'Complete Angular Assignment',
        description: 'Build a task tracker app using pipes, directives, services, and observables',
        dueDate: new Date('2026-03-06'),
        priority: 'high',
        completed: false,
        createdAt: new Date('2026-03-01')
      },
      {
        id: 2,
        title: 'Study RxJS Patterns',
        description: 'Review reactive patterns and observable subscription/unsubscription techniques',
        dueDate: new Date('2026-03-05'),
        priority: 'medium',
        completed: false,
        createdAt: new Date('2026-03-02')
      },
      {
        id: 3,
        title: 'Read Angular Book Chapter 4-6',
        description: 'Complete reading of chapters covering services, dependency injection, and reactive programming',
        dueDate: new Date('2026-03-03'),
        priority: 'low',
        completed: true,
        createdAt: new Date('2026-02-28')
      }
    ];

    this.tasks = sampleTasks;
    this.taskSubject.next(this.tasks);
  }

  /**
   * Add a new task to the collection
   * Uses spread operator to create new array reference (immutability pattern)
   * 
   * @param title - Task title
   * @param description - Task description
   * @param dueDate - Task due date
   * @param priority - Task priority level
   */
  addTask(title: string, description: string, dueDate: Date, priority: 'high' | 'medium' | 'low'): void {
    const newTask: Task = {
      id: Date.now(), // Simple ID generation using timestamp
      title,
      description,
      dueDate,
      priority,
      completed: false,
      createdAt: new Date()
    };

    // Create new array reference (immutability) and notify subscribers
    this.tasks = [...this.tasks, newTask];
    this.taskSubject.next(this.tasks);
  }

  /**
   * Toggle the completed status of a task
   * Uses map to create a new array with updated task (immutability)
   * 
   * @param id - ID of the task to toggle
   */
  toggleTask(id: number): void {
    this.tasks = this.tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.taskSubject.next(this.tasks);
  }

  /**
   * Delete a task from the collection
   * Uses filter to create new array without the deleted task
   * 
   * @param id - ID of the task to delete
   */
  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.taskSubject.next(this.tasks);
  }

  /**
   * Update an existing task
   * Uses map to replace the task with matching ID
   * 
   * @param id - ID of the task to update
   * @param updates - Partial task object with fields to update
   */
  updateTask(id: number, updates: Partial<Task>): void {
    this.tasks = this.tasks.map(task =>
      task.id === id ? { ...task, ...updates } : task
    );
    this.taskSubject.next(this.tasks);
  }

  /**
   * Get a single task by ID
   * Returns an observable that emits the found task or undefined
   * 
   * @param id - ID of the task to retrieve
   * @returns Observable of the task or undefined
   */
  getTaskById(id: number): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }
}
