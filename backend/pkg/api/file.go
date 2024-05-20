package api

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path"
	"social-network/pkg/models"
	"social-network/pkg/router"
)

const maxUploadSize = 1024 * 1024 * 3 // 3MB

type FileToken struct {
	Tokens []string `json:"tokens"`
}

func FileUpload(w http.ResponseWriter, r *http.Request, field string) (FileToken, error) {
	r.Body = http.MaxBytesReader(w, r.Body, maxUploadSize)
	if err := r.ParseMultipartForm(maxUploadSize); err != nil {
		//log.Println("The uploaded file was too big.")
		//http.Error(w, "The uploaded file is too big. Please choose a file that's less than 1MB in size", http.StatusBadRequest)
		return FileToken{}, fmt.Errorf("file too big")
	}

	// The argument to FormFile must match the name attribute of the file input on the frontend
	files := r.MultipartForm.File[field]
	tokens := make([]string, len(files))
	for _, fileHeader := range files {
		file, err := fileHeader.Open()
		if err != nil {
			//http.Error(w, err.Error(), http.StatusBadRequest)
			return FileToken{}, err
		}

		defer file.Close()

		token, err := Database.File.Insert(file, fileHeader.Filename)
		if err != nil {
			panic(err)
		}

		tokens = append(tokens, token)
	}

	response := FileToken{
		tokens,
	}
	return response, nil
	//writeJSON(w, response)
}

func FileDownload(w http.ResponseWriter, r *http.Request) {
	token := router.GetSlug(r, 0)

	fileData, err := Database.File.Get(token)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	file, err := os.Open(path.Join(models.UploadsPath, fileData.Token+fileData.Extension))
	if err != nil {
		panic(err)
	}

	var contentType string

	switch fileData.Extension {
	case ".png":
		contentType = "image/png"
	case ".jpg":
	case ".jpeg":
		contentType = "image/jpeg"
	default:
		contentType = "application/octet-stream"
	}

	w.Header().Set("Content-Type", contentType)
	w.Header().Set("Content-Disposition", fmt.Sprintf(`inline; filename="%s"`, fileData.Name))

	_, err = io.Copy(w, file)
	if err != nil {
		panic(err)
	}
}
