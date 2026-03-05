import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Task interface defines the structure of a task object
 */
export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: Date | string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  createdAt: Date | string;
}

/**
 * TaskService manages task data using HTTP requests to JSON Server
 */
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

  /**
   * Get all tasks from the server
   */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  /**
   * Add a new task to the server
   */
  addTask(title: string, description: string, dueDate: Date, priority: 'high' | 'medium' | 'low'): Observable<Task> {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      dueDate: dueDate.toISOString().split('T')[0],
      priority,
      completed: false,
      createdAt: new Date().toISOString().split('T')[0]
    };

    return this.http.post<Task>(this.apiUrl, newTask);
  }

  /**
   * Toggle the completed status of a task
   */
  toggleTask(id: number, completed: boolean): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, { completed });
  }

  /**
   * Delete a task from the server
   */
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Update an existing task with partial updates
   */
  updateTask(id: number, updates: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, updates);
  }

  /**
   * Get a single task by ID
   */
  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }
}
