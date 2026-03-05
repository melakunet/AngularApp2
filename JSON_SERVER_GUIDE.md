# JSON Server Setup Guide

## How to Run Your Task Tracker with JSON Server

### Step 1: Start JSON Server (Terminal 1)
```bash
npm run api
```

This will start the JSON Server at: **http://localhost:3000**

You should see:
```
Resources
http://localhost:3000/tasks

Home
http://localhost:3000
```

### Step 2: Start Angular App (Terminal 2)
```bash
ng serve
```

or

```bash
npm start
```

This will start the Angular app at: **http://localhost:4200**

### Step 3: Open in Browser
Navigate to: **http://localhost:4200/**

## How It Works

1. **JSON Server** acts as a fake REST API
2. Your tasks are saved in `db.json` file
3. When you add/edit/delete tasks, they're saved to the file
4. Tasks persist even after browser refresh!

## API Endpoints

The app uses these HTTP requests:

- **GET** `http://localhost:3000/tasks` - Get all tasks
- **POST** `http://localhost:3000/tasks` - Add new task
- **PATCH** `http://localhost:3000/tasks/:id` - Update task
- **DELETE** `http://localhost:3000/tasks/:id` - Delete task

## Troubleshooting

### Error: "Failed to add task"
- Make sure JSON Server is running (`npm run api`)
- Check that port 3000 is available

### Tasks not persisting
- Verify `db.json` exists in project root
- Check JSON Server terminal for errors

### CORS errors
- JSON Server automatically handles CORS
- Make sure you're using `http://localhost:3000` (not 127.0.0.1)

## File Structure

```
AngularApp2/
├── db.json                    ← Tasks database
├── package.json               ← npm run api script
└── src/
    └── app/
        └── services/
            └── task.service.ts ← HTTP requests
```

## Testing

1. **Add a task** - Should appear immediately
2. **Refresh browser** - Task should still be there!
3. **Check db.json** - Your tasks are saved here
4. **Close everything** - Restart servers, tasks remain!

## Stopping Servers

- **JSON Server**: Press `Ctrl+C` in Terminal 1
- **Angular**: Press `Ctrl+C` in Terminal 2

---

**Note**: Both servers must be running for the app to work!
