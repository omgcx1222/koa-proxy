const Koa = require("koa")
const proxy = require("koa-proxy")
const dotenv = require("dotenv")
const axios = require("axios")
dotenv.config()

const app = new Koa()

// app.use(
//   proxy({
//     host: process.env.PROXY_URL,
//     match: "",
//   })
// )

app.use(async (ctx) => {
  try {
    const res = await axios({
      url: "https://api.openai.com/v1/models",
      headers: {
        Authorization: "Bearer " + process.env.OPENAI_KEY,
      },
    })
    ctx.body = { status: "Success", data: res.data }
  } catch (error) {
    ctx.body = { status: "Error", message: error.message }
  }
})

const PORT = process.env.PORT
// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
