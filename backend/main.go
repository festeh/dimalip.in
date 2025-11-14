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

// VisualizationCard represents metadata for a standalone visualization asset.
type VisualizationCard struct {
	ID          string   `json:"id"`
	Title       string   `json:"title"`
	Description string   `json:"description"`
	URL         string   `json:"url"`
	Tags        []string `json:"tags"`
}

var visualizationCards = []VisualizationCard{
	{
		ID:          "ipv4-layer3",
		Title:       "IPv4 Layer 3 Routing",
		Description: "Interactive IPv4 routing visualization with Catppuccin styling.",
		URL:         "/Visualizations/internet-protocol/ipv4-visualization.html",
		Tags:        []string{"Networking", "IPv4", "Routing"},
	},
}

func main() {
	// Get the path to the frontend dist directory
	// In production: /opt/dimalip.in/dist
	// In development: ../frontend/dist
	distPath := os.Getenv("DIST_PATH")
	if distPath == "" {
		distPath = filepath.Join("..", "frontend", "dist")
	}

	// Create a file server for static files
	fs := http.FileServer(http.Dir(distPath))

	// Set up routes
	http.HandleFunc("/api/hello", handleHello)
	http.HandleFunc("/api/visualizations", handleVisualizations)

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

func handleVisualizations(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	limit := len(visualizationCards)
	if limit > 16 {
		limit = 16
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(visualizationCards[:limit])
}
