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

### Quick Start (using just)

```bash
# Install dependencies
just install

# Run both frontend and backend
just dev
```

Frontend will be available at `http://localhost:5173`
Backend will be available at `http://localhost:8080`

### Manual Setup

#### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

The dev server will start on `http://localhost:5173`

#### Build Frontend

```bash
cd frontend
npm run build
```

This creates optimized production files in `frontend/dist/`

#### Backend

```bash
cd backend
go run main.go
```

The server will start on `http://localhost:8080` and serve:
- Static files from `frontend/dist/`
- API endpoint at `/api/hello`

### Available just commands

- `just dev` - Run both frontend and backend in development mode
- `just install` - Install frontend dependencies
- `just build` - Build both frontend and backend for production
- `just build-frontend` - Build only the frontend
- `just build-backend` - Build only the backend
- `just clean` - Clean all build artifacts

## API Endpoints

- `GET /api/hello` - Returns a JSON greeting message

## Features

- Clean hero page with "Hi, I'm Dima"
- Catppuccin Mocha dark purple gradient background
- Smooth fade-in animations
- Responsive text sizing
- Go backend serving static files and API
- Automated deployment via GitHub Actions
