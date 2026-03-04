# Task Tracker Pro - Angular Assignment 2

A comprehensive task management application built with Angular, demonstrating advanced concepts including services, observables, custom pipes, and directives.

## 📚 Course Information

- **Course Code**: MWD4B (Angular)
- **Course Name**: Angular Development
- **Assignment**: Assignment 2
- **Textbook**: Bampakos, A. (2025). Learning Angular: A practical guide to building web applications with modern Angular, 5th Edition. Packt.

## 🎯 Project Overview

This Task Tracker application helps users manage their daily tasks efficiently. It showcases the implementation of key Angular concepts covered in Chapters 4-6 of the Learning Angular textbook:

- **Services with RxJS Observables** for reactive state management
- **Custom Pipes** for data transformation
- **Custom Directives** for DOM manipulation
- **Dependency Injection** throughout the application
- **Observable subscription patterns** (both async pipe and manual management)

## ✨ Features

### Core Functionality

1. **Task Management**
   - ✅ Add new tasks with title, description, due date, and priority
   - ✅ Mark tasks as completed/incomplete
   - ✅ Delete tasks
   - ✅ View all tasks or filter to hide completed ones

2. **TaskService (Chapter 4-6)**
   - 📦 In-memory data storage using arrays
   - 🔄 RxJS BehaviorSubject for reactive state management
   - 📡 Observable streams for automatic UI updates
   - 🎯 Singleton service using `providedIn: 'root'`

3. **Custom Pipes (Chapter 4)**
   - **DateFormatPipe**: Transforms dates into readable formats ("Today", "Tomorrow", "Overdue")
   - **TruncateTextPipe**: Intelligently truncates long descriptions
   - **StatusLabelPipe**: Converts boolean status to labeled format

4. **Custom Directives (Chapter 5)**
   - **PriorityHighlightDirective**: Visual highlighting based on task priority
     - High Priority: Red border and background
     - Medium Priority: Orange border and background
     - Low Priority: Green border and background
   - **CompletedStrikethroughDirective**: Applies strike-through to completed tasks

5. **Observable Patterns (Chapter 6)**
   - ✅ Async pipe for automatic subscription management
   - ✅ Manual subscription with proper cleanup in `ngOnDestroy`
   - ✅ BehaviorSubject for state management
   - ✅ Observable streams for data flow

## 🏗️ Project Structure

```
src/app/
├── services/
│   └── task.service.ts           # Core service with RxJS observables
├── pipes/
│   ├── date-format.pipe.ts       # Date transformation pipe
│   ├── truncate-text.pipe.ts     # Text truncation pipe
│   └── status-label.pipe.ts      # Status label pipe
├── directives/
│   ├── priority-highlight.directive.ts       # Priority highlighting
│   └── completed-strikethrough.directive.ts  # Completion styling
├── app.component.ts              # Main component
├── app.component.html            # Component template
└── app.component.css             # Component styles
```

## 🛠️ Technical Implementation

### Dependency Injection

All services and dependencies are properly injected using Angular's DI system:

```typescript
constructor(private taskService: TaskService) {
  this.tasks$ = this.taskService.tasks$;
}
```

### Reactive State Management

Using BehaviorSubject for state updates:

```typescript
private taskSubject = new BehaviorSubject<Task[]>([]);
tasks$: Observable<Task[]> = this.taskSubject.asObservable();
```

### Subscription Patterns

**Using Async Pipe (Recommended):**
```html
<div *ngIf="(tasks$ | async) as tasks">
  <!-- Automatic subscription and cleanup -->
</div>
```

**Manual Subscription:**
```typescript
ngOnInit(): void {
  this.taskSubscription = this.tasks$.subscribe({
    next: (tasks) => { /* handle data */ },
    error: (error) => { /* handle error */ },
    complete: () => { /* handle completion */ }
  });
}

ngOnDestroy(): void {
  this.taskSubscription?.unsubscribe();
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js (latest version)
- Angular CLI
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/melakunet/AngularApp2.git
cd AngularApp2
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
ng serve
```

4. Open your browser and navigate to `http://localhost:4200`

## 📝 Code Documentation

All code is thoroughly commented following professional standards:

- ✅ Class and interface documentation with JSDoc comments
- ✅ Method documentation explaining parameters and return values
- ✅ Inline comments for complex logic
- ✅ Section headers for code organization

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Visual Feedback**: Color-coded priorities and status indicators
- **Smooth Animations**: Fade-in effects and transitions
- **Intuitive Controls**: Clear buttons and form inputs
- **Accessibility**: Proper labels and semantic HTML

## 📋 Assignment Requirements Checklist

- ✅ Angular project created and linked to GitHub repository
- ✅ TaskService with RxJS Observables for state management
- ✅ Custom pipes for data transformation (date format, text truncation, status labels)
- ✅ Custom directives for appearance modification (priority highlight, strikethrough)
- ✅ Proper dependency injection throughout the application
- ✅ Observable subscription patterns (async pipe and manual management)
- ✅ Code properly commented and documented
- ✅ Features map to topics from Chapters 4-6
- ✅ Committed and pushed to GitHub

## 🔗 Repository

**GitHub**: [https://github.com/melakunet/AngularApp2.git](https://github.com/melakunet/AngularApp2.git)

## 📖 Learning Outcomes

This project demonstrates proficiency in:

1. **Services and Dependency Injection** (Ch. 4-5)
   - Creating singleton services
   - Using Angular's DI system
   - Service communication patterns

2. **Reactive Programming** (Ch. 6)
   - RxJS Observables and BehaviorSubject
   - Subscription management
   - Async pipe usage

3. **Pipes** (Ch. 4)
   - Creating custom transformation pipes
   - Pure vs impure pipes
   - Pipe chaining

4. **Directives** (Ch. 5)
   - Attribute directives
   - DOM manipulation with Renderer2
   - Directive input properties

## 👨‍💻 Author

**Etefworkie Melaku**
- GitHub: [@melakunet](https://github.com/melakunet)
- Course: MWD4B (Angular Development)

## 📅 Date

March 4, 2026

## 📄 License

This project is created for educational purposes as part of the Angular Development course.

---

**Note**: This application follows the architectural patterns and best practices outlined in "Learning Angular" by Antonis Bampakos, specifically covering concepts from Chapters 4-6.
