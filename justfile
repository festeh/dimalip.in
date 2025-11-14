# Run both frontend and backend locally
dev:
    #!/usr/bin/env bash
    trap 'kill 0' EXIT
    cd frontend && npm run dev &
    cd backend && go run main.go &
    wait

# Install frontend dependencies
install:
    cd frontend && npm install

# Build frontend for production
build-frontend:
    cd frontend && npm run build

# Build backend for production
build-backend:
    cd backend && go build -o dimalip-server main.go

# Build everything
build: build-frontend build-backend

# Clean build artifacts
clean:
    rm -rf frontend/dist
    rm -rf frontend/node_modules
    rm -f backend/dimalip-server
