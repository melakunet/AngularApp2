# 🚀 How to Run Both Servers Together

## ✅ **BOTH SERVERS ARE NOW RUNNING!**

You currently have:
- ✅ JSON Server running on **http://localhost:3000** (Backend)
- ✅ Angular App running on **http://localhost:4200** (Frontend)

---

## 📺 **What You See in Each Terminal:**

### **Terminal 1 - JSON Server (Port 3000)**
```
JSON Server started on PORT :3000
Press CTRL-C to stop
Watching db.json...

Endpoints:
http://localhost:3000/tasks
```
**Status**: ✅ Running (Do NOT close this!)

### **Terminal 2 - Angular (Port 4200)**
```
Application bundle generation complete.
➜  Local:   http://localhost:4200/
```
**Status**: ✅ Running (Do NOT close this!)

---

## 🌐 **Open Your App:**

**Browser**: http://localhost:4200/

Now you can:
1. ✅ Add tasks
2. ✅ Edit tasks
3. ✅ Delete tasks
4. ✅ **Refresh browser** → Tasks persist!
5. ✅ **Close browser** → Reopen → Tasks still there!

---

## 🔄 **How It Works:**

```
Browser (localhost:4200)
    ↓
Angular App (Frontend)
    ↓ HTTP Requests
JSON Server (localhost:3000)
    ↓
db.json file (Database)
```

---

## 🛑 **To Stop Servers:**

### Stop JSON Server (Terminal 1):
```bash
Press Ctrl+C
```

### Stop Angular (Terminal 2):
```bash
Press Ctrl+C
```

---

## 🔁 **To Restart Everything:**

### Terminal 1:
```bash
cd "/Users/etefworkiemelaku/Library/CloudStorage/OneDrive-Personal/1 Trios colloge courses/angular/AngularApp2/AngularApp2"
npm run api
```

### Terminal 2:
```bash
cd "/Users/etefworkiemelaku/Library/CloudStorage/OneDrive-Personal/1 Trios colloge courses/angular/AngularApp2/AngularApp2"
ng serve
```

---

## 📝 **Quick Commands:**

| Action | Command |
|--------|---------|
| Start JSON Server | `npm run api` |
| Start Angular | `ng serve` or `npm start` |
| Stop Servers | `Ctrl+C` in each terminal |
| View Tasks API | http://localhost:3000/tasks |
| View App | http://localhost:4200/ |

---

## ⚠️ **Troubleshooting:**

### Port 3000 already in use?
```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9
```

### Port 4200 already in use?
```bash
# Find and kill the process
lsof -ti:4200 | xargs kill -9
```

### Tasks not saving?
- Check Terminal 1 - JSON Server must be running
- Check `db.json` file exists
- Look for errors in Terminal 1

### Angular errors?
- Check Terminal 2 for error messages
- Make sure `npm install` was run
- Try: `rm -rf node_modules && npm install`

---

## 🎉 **Success! Your App Now Has:**

✅ Real HTTP requests (like a real app!)  
✅ Persistent storage (tasks saved to file)  
✅ Backend + Frontend architecture  
✅ RESTful API pattern  
✅ Professional development setup  

---

**Both servers running = Full stack app! 🚀**
