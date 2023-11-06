const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

const { default: createLogger, simpleFormat } = require('if-logger')
const dayjs = require('dayjs')

const logger = createLogger({
  format: simpleFormat,
  tags: [() => dayjs().format('YYYY-MM-DD HH:mm:ss')],
})

const app = express()
const port = 3456

app.use(bodyParser.json())

app.get('/my-ip', async (req, res) => {
  const result = await axios({
    method: 'get',
    url: 'https://echo-api.vercel.app/api',
  })
  res.json(result.data)
})

app.post('/upbit-proxy', async (req, res) => {
  const { method, url, body, auth } = req.body

  logger.log(new Date(), { method, url, body, auth })

  const result = await axios({
    method,
    url,
    data: body,
    headers: auth,
  })

  res.json(result.data)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
