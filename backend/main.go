package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/BurntSushi/toml"
)

type HelloResponse struct {
	Message string `json:"message"`
	Status  string `json:"status"`
}

// VisualizationCard represents metadata for a standalone visualization asset.
type VisualizationCard struct {
	ID    string `json:"id"`
	Title string `json:"title"`
	URL   string `json:"url"`
	Icon  string `json:"icon,omitempty"`
}

// VisualizationMetadata represents the structure of metadata.toml files.
type VisualizationMetadata struct {
	Title       string `toml:"title"`
	Description string `toml:"description"`
}

var visualizationCards []VisualizationCard

// loadVisualizations scans the Visualizations directory and loads metadata from TOML files.
func loadVisualizations(distPath string) error {
	vizPath := filepath.Join(distPath, "Visualizations")

	// Read all subdirectories in the Visualizations folder
	entries, err := os.ReadDir(vizPath)
	if err != nil {
		return err
	}

	var cards []VisualizationCard

	for _, entry := range entries {
		if !entry.IsDir() {
			continue
		}

		folderName := entry.Name()
		metadataPath := filepath.Join(vizPath, folderName, "metadata.toml")

		// Check if metadata.toml exists
		if _, err := os.Stat(metadataPath); os.IsNotExist(err) {
			log.Printf("Skipping %s: no metadata.toml found", folderName)
			continue
		}

		// Parse the TOML file
		var metadata VisualizationMetadata
		if _, err := toml.DecodeFile(metadataPath, &metadata); err != nil {
			log.Printf("Error parsing metadata.toml in %s: %v", folderName, err)
			continue
		}

		// Look for icon file (icon.png, icon.svg, icon.jpg, etc.)
		iconPath := ""
		iconPattern := filepath.Join(vizPath, folderName, "icon.*")
		if matches, err := filepath.Glob(iconPattern); err == nil && len(matches) > 0 {
			// Use the first matching icon file
			iconPath = "/Visualizations/" + folderName + "/" + filepath.Base(matches[0])
		}

		// Construct the VisualizationCard
		card := VisualizationCard{
			ID:    folderName,
			Title: metadata.Title,
			URL:   "/Visualizations/" + folderName + "/index.html",
			Icon:  iconPath,
		}

		cards = append(cards, card)
		log.Printf("Loaded visualization: %s (%s) with icon: %s", card.Title, card.ID, iconPath)
	}

	visualizationCards = cards
	log.Printf("Total visualizations loaded: %d", len(visualizationCards))
	return nil
}

func main() {
	// Get the path to the frontend dist directory
	// In production: /opt/dimalip.in/dist
	// In development: ../frontend/dist
	distPath := os.Getenv("DIST_PATH")
	if distPath == "" {
		distPath = filepath.Join("..", "frontend", "dist")
	}

	// Load visualizations from metadata.toml files
	if err := loadVisualizations(distPath); err != nil {
		log.Printf("Warning: Failed to load visualizations: %v", err)
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
