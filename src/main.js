const Koa = require("koa")
const proxy = require("koa-proxy")
const dotenv = require("dotenv")
dotenv.config()

const app = new Koa()

app.use(
  proxy({
    host: process.env.PROXY_URL,
    match: /^\/proxy/,
    map: (path) => path.replace(/^\/proxy/, ""),
  })
)

const PORT = process.env.PORT
// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
