package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

type HelloResponse struct {
	Message string `json:"message"`
	Status  string `json:"status"`
}

func main() {
	// Get the path to the frontend dist directory
	distPath := filepath.Join("..", "frontend", "dist")

	// Create a file server for static files
	fs := http.FileServer(http.Dir(distPath))

	// Set up routes
	http.HandleFunc("/api/hello", handleHello)

	// Serve static files for all other routes
	http.Handle("/", fs)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on http://localhost:%s", port)
	log.Printf("Serving static files from: %s", distPath)

	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}

func handleHello(w http.ResponseWriter, r *http.Request) {
	// Set CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// Handle preflight requests
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != "GET" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	response := HelloResponse{
		Message: "Hello from the Go backend!",
		Status:  "success",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
