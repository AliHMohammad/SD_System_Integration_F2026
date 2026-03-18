package main

import (
	"context"
	"log"
	"net"
	"strings"

	echoservice "example.com/lesson07/solution"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type echoServer struct {
	echoservice.UnimplementedEchoServiceServer
}

func (s *echoServer) Echo(ctx context.Context, req *echoservice.MessageRequest) (*echoservice.MessageResponse, error) {
	if strings.TrimSpace(req.GetText()) == "" {
		return nil, status.Error(codes.InvalidArgument, "message must not be empty")
	}

	return &echoservice.MessageResponse{Reponse: req.GetText()}, nil
}

func main() {
	listener, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	grpcServer := grpc.NewServer()
	echoservice.RegisterEchoServiceServer(grpcServer, &echoServer{})

	log.Println("gRPC Echo server listening on :50051")
	if err := grpcServer.Serve(listener); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
