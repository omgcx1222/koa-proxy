const Koa = require("koa")
const proxy = require("koa-better-http-proxy")
const dotenv = require("dotenv")
dotenv.config()

const app = new Koa()

app.use(
  proxy("api.openai.com", {
    headers: {
      Authorization: "Bearer " + process.env.OPENAI_KEY,
    },
    https: true,
    proxyReqPathResolver(ctx) {
      return `/v1${ctx.url}`
    },
  })
)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
