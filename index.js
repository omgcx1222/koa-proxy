// const path = require("path");
const express = require("express")

const { createProxyMiddleware } = require("http-proxy-middleware")
const dotenv = require("dotenv")
dotenv.config()

const app = express()

// app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/v1/",
  createProxyMiddleware({
    target: "https://api.openai.com",
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
      const apiKey = req.headers?.authorization ?? `Bearer ${process.env.OPENAI_KEY}`
      proxyReq.setHeader("Authorization", apiKey)
    },
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*"
      proxyRes.headers["Access-Control-Allow-Headers"] =
        "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
    },
  })
)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`)
})
