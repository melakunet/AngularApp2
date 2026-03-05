import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Task interface defines the structure of a task object
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
 * TaskService manages task data using RxJS Observables for reactive state management
 */
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  /** In-memory storage for tasks */
  private tasks: Task[] = [];

  /** BehaviorSubject manages task state and notifies subscribers of changes */
  private taskSubject = new BehaviorSubject<Task[]>([]);

  /** Observable stream that components subscribe to for task updates */
  tasks$: Observable<Task[]> = this.taskSubject.asObservable();

  constructor() {
    this.initializeSampleTasks();
  }

  /** Initialize with sample tasks */
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
   */
  addTask(title: string, description: string, dueDate: Date, priority: 'high' | 'medium' | 'low'): void {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      dueDate,
      priority,
      completed: false,
      createdAt: new Date()
    };

    this.tasks = [...this.tasks, newTask];
    this.taskSubject.next(this.tasks);
  }

  /**
   * Toggle the completed status of a task
   */
  toggleTask(id: number): void {
    this.tasks = this.tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.taskSubject.next(this.tasks);
  }

  /**
   * Delete a task from the collection
   */
  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.taskSubject.next(this.tasks);
  }

  /**
   * Update an existing task with partial updates
   */
  updateTask(id: number, updates: Partial<Task>): void {
    this.tasks = this.tasks.map(task =>
      task.id === id ? { ...task, ...updates } : task
    );
    this.taskSubject.next(this.tasks);
  }

  /**
   * Get a single task by ID
   */
  getTaskById(id: number): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }
}
