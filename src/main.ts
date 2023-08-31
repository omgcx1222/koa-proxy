import Koa from "koa"
import proxy from "koa-proxy"
import dotenv from "dotenv"
dotenv.config()

const app = new Koa()

app.use(
  proxy({
    host: process.env.PROXY_URL,
    match: /^\/proxy/,
    map: (path: string) => path.replace(/^\/proxy/, ""),
  })
)

const PORT = process.env.PORT
// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
