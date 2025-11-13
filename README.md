# dimalip.in

Personal website with Vue frontend and Go backend.

## Project Structure

```
dimalip.in/
├── frontend/          # Vue 3 + Vite + TypeScript
│   ├── src/
│   │   ├── App.vue   # Hero page with Catppuccin Mocha gradient
│   │   ├── main.ts
│   │   └── style.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
├── backend/          # Go HTTP server
│   ├── main.go
│   └── go.mod
└── README.md
```

## Setup & Run

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

The dev server will start on `http://localhost:5173`

### Build Frontend

```bash
cd frontend
npm run build
```

This creates optimized production files in `frontend/dist/`

### Backend

```bash
cd backend
go run main.go
```

The server will start on `http://localhost:8080` and serve:
- Static files from `frontend/dist/`
- API endpoint at `/api/hello`

## API Endpoints

- `GET /api/hello` - Returns a JSON greeting message

## Features

- Clean hero page with "Hi, I'm Dima"
- Catppuccin Mocha dark theme gradient background
- Animated gradient effect
- Smooth fade-in animation
- Responsive text sizing
- Go backend serving static files and API
