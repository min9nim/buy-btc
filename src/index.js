const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const getBinanceBalances = require('./utils/get-binance-balances')
const Binance = require('binance-api-node').default

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

app.get('/my-accounts-binance', async (req, res) => {
  const { accessKey, secretKey } = req.query
  const result = await getBinanceBalances(accessKey, secretKey)
  res.json(result)
})

const buyBtc = (amountSats, { apiKey, apiSecret }) => {
  // 바이낸스 API 키 및 시크릿 키 설정
  const client = Binance({
    apiKey,
    apiSecret,
  })

  // BTC/USDT 마켓에서 비트코인을 구매할 수량 설정
  const quantity = amountSats / 100_000_000 // 비트코인을 구매할 양

  // 주문 생성
  return client
    .order({
      symbol: 'BTCUSDT',
      side: 'BUY',
      type: 'MARKET', // 시장가 주문
      quantity: String(quantity),
    })
    .then(order => {
      logger.info('\n[lnp2p-stimpack] success', order)
      // console.log(order)
      return order
    })
    .catch(err => {
      logger.error('\n[lnp2p-stimpack] failed', err)
      // console.error(err)
      return { message: err.message }
    })
}

app.get('/lnp2p-webhook', async (req, res) => {
  const { amountSats, apiKey, apiSecret } = req.query

  if (!apiKey || !apiSecret) {
    return res.status(400).json({ message: `No api-key` })
  }
  if (!amountSats) {
    return res.status(400).json({ message: `No amountSats` })
  }

  const result = await buyBtc(Number(amountSats), {
    apiKey,
    apiSecret,
  })

  res.json(result)
})

app.get('/binance', async (req, res) => {
  const { amountUsd, apiKey, apiSecret } = req.query

  if (!apiKey || !apiSecret) {
    return res.status(400).json({ message: `No api-key` })
  }
  if (!amountUsd) {
    return res.status(400).json({ message: `No amountUsd` })
  }

  const {
    data: { price },
  } = await axios.get(
    `https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT`,
  )

  const amountSats = Math.floor(
    Number(amountUsd) * (100_000_000 / Number(price)),
  )

  const result = await buyBtc(amountSats - (amountSats % 1000), {
    apiKey,
    apiSecret,
  })

  res.json(result)
})

app.post('/upbit-proxy', async (req, res) => {
  try {
    const { method, url, body, auth } = req.body

    // logger.log({ method, url, body, auth }, '\n\n')

    const option = {
      method,
      url,
      ...(method === 'get' ? { params: body } : { data: body }),
      headers: auth,
    }
    // console.log('axios option: ', option)
    const result = await axios(option)

    res.json(result.data)
  } catch (e) {
    logger.verbose(
      e.message,
      e.response.config.data,
      e.config.headers.Authorization,
      '\n',
    )
    res.json({ message: e.message })
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
