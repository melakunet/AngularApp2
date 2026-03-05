# Task Tracker Pro - Angular Assignment 2

A task management application built with Angular, demonstrating services with RxJS observables, custom pipes, and custom directives.

**Course**: MWD4B (Angular Development)  
**Student**: Etefworkie Melaku  
**Date**: March 5, 2026

## Running the Application

This app uses **JSON Server** as a mock REST API backend for data persistence. Tasks are stored in `db.json` and persist across browser refreshes.

Start both servers to run the app:

**Terminal 1 - Start Backend (JSON Server on port 3000):**
```bash
npm run api
```

**Terminal 2 - Start Frontend (Angular on port 4200):**
```bash
ng serve
```

Then open: **http://localhost:4200/**

The frontend communicates with the backend via HTTP requests to save, update, and delete tasks.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
