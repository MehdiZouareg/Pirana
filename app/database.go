package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func Client() (*mongo.Client, context.Context) {
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017"))
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err = client.Connect(ctx)

	defer func() {
		if err = client.Disconnect(ctx); err != nil {
			panic(err)
		}
	}()

	return client, ctx
}

func Update(collectionName string) {
	client, ctx := Client()
	collection := client.Database("testing").Collection(collectionName)
	res, err := collection.InsertOne(ctx, bson.M{"name": "pi", "value": 3.14159})

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(res)
}

func retrieveConnection() {

}

func init() {

}

type Plant struct {
	id           string `json:"-"`
	name         string `json:"name"`
	lastHumidity string `json:"lastHumidity"`
	iconId       int    `json:"iconId"`
}
