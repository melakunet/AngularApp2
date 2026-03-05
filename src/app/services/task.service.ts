import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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
  
  private tasks: Task[] = [
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

  constructor() { }

  /**
   * Get all tasks as an Observable
   */
  getTasks(): Observable<Task[]> {
    return of(this.tasks);
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

    this.tasks.push(newTask);
  }

  /**
   * Toggle the completed status of a task
   */
  toggleTask(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
    }
  }

  /**
   * Delete a task from the collection
   */
  deleteTask(id: number): void {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  /**
   * Update an existing task with partial updates
   */
  updateTask(id: number, updates: Partial<Task>): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      Object.assign(task, updates);
    }
  }

  /**
   * Get a single task by ID
   */
  getTaskById(id: number): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }
}
