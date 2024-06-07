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

func FileUpload(w http.ResponseWriter, r *http.Request, field string) (string, error) {
	r.Body = http.MaxBytesReader(w, r.Body, maxUploadSize)
	if err := r.ParseMultipartForm(maxUploadSize); err != nil {
		return "", fmt.Errorf("file too big")
	}

	// The argument to MultipartFormFile must match the name attribute of the file input on the frontend
	files := r.MultipartForm.File[field]
	tokens := ""
	for _, fileHeader := range files {
		file, err := fileHeader.Open()
		if err != nil {
			return "", err
		}

		defer file.Close()

		token, err := Database.File.Insert(file, fileHeader.Filename)
		if err != nil {
			panic(err)
		}

		if len(tokens) == 0 {
			tokens = token
		} else {
			tokens = tokens + "," + token
		}
	}

	fmt.Println("File uploaded successfully: ", tokens)
	return tokens, nil
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

	defer file.Close()

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
