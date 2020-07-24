package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

var router *gin.Engine

func main() {

	router = gin.Default()

	router.LoadHTMLGlob("web/html/*")

	LoadStaticResources(router)
	RouteWeb()
	RouteApi()

	router.Run()

}

func RouteWeb() {
	router.GET("/", func(c *gin.Context) {

		// Call the HTML method of the Context to render a template
		c.HTML(
			// Set the HTTP status to 200 (OK)
			http.StatusOK,
			// Use the index.html template
			"index.html",
			// Pass the data that the page uses (in this case, 'title')
			gin.H{
				"title": "Home Page",
			},
		)
	})
}

func RouteApi() {
	router.GET("/api", func(c *gin.Context) {

		c.JSON(200, gin.H{
			"status": "ok",
		})
	})

	router.GET("/status", func(c *gin.Context) {

		c.JSON(200, gin.H{
			"serverState": "ok",
		})
	})

	router.GET("/plant_stats/:id", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"autoWatering":      false,
			"humidite":          10,
			"maxHumidite":       100,
			"ensoleillement":    100,
			"maxEnsoleillement": 100,
			"acidite":           100,
			"maxAcidite":        100,
		})
	})

}

func LoadStaticResources(router *gin.Engine) {
	router.Static("/css", "web/css")
	router.Static("/js", "web/js")
	router.Static("/img", "web/img")
	router.Static("/node_modules", "web/node_modules")
	router.Static("/sounds", "web/sounds")
}
