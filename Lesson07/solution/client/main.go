package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"strings"
	"time"

	echoservice "example.com/lesson07/solution"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func main() {
	message := flag.String("message", "Hello from client", "message text to send to Echo RPC")
	flag.Func("arg", "extra key=value argument (supports key: message)", func(value string) error {
		parts := strings.SplitN(value, "=", 2)
		if len(parts) != 2 {
			return fmt.Errorf("invalid --arg format, expected key=value")
		}

		key := strings.TrimSpace(parts[0])
		val := strings.TrimSpace(parts[1])
		switch key {
		case "message":
			*message = val
			return nil
		default:
			return fmt.Errorf("unsupported --arg key %q", key)
		}
	})
	flag.Parse()

	conn, err := grpc.Dial("localhost:50051", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("failed to connect: %v", err)
	}
	defer conn.Close()

	client := echoservice.NewEchoServiceClient(conn)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	resp, err := client.Echo(ctx, &echoservice.MessageRequest{Text: *message})
	if err != nil {
		log.Fatalf("Echo RPC failed: %v", err)
	}

	fmt.Printf("Server response: %s\n", resp.GetReponse())
}
