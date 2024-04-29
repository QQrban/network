# FIRST STAGE
FROM golang:alpine as builder

WORKDIR /app

# Download dependencies
RUN apk add build-base
COPY go.mod .
COPY go.sum .
RUN go mod download

# Build the executable
COPY . .
RUN go build -ldflags \
    "-linkmode external -extldflags -static" \
    -a main.go

# SECOND STAGE
FROM scratch
# FROM golang:alpine
WORKDIR /app
COPY --from=builder /app/main .

CMD ["./main"]
