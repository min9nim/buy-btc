const allowCors = require('../src/utils/cors')
const handleError = require('../src/utils/handle-error')
const KrakenClient = require('kraken-api')

const handler = async (req, res) => {
  const { accessKey, secretKey, body } =
    typeof req.body === 'string' ? JSON.parse(req.body) : req.body

  const kraken = new KrakenClient(accessKey, secretKey)

  const diff = Number(body.diff)
  let amount = Number(body.usd_volume)
  const market = body.market || 'XBTUSDT'

  const last_trade_price = await kraken
    .api('Ticker', { pair: 'XXBTZUSDT' })
    .then(res => res.result.XXBTZUSD.c[0])

  const price = (Number(last_trade_price) + diff || 0).toFixed(2)
  const bidPrices = Object.entries(body)
  for ([key, value] of bidPrices) {
    if (
      key.startsWith('~') &&
      last_trade_price <= Number(key.replace('~', ''))
    ) {
      amount = Number(value)
      break
    }
  }
  if (!amount) {
    res.json({ message: 'usd_volume is falsy' })
    return
  }

  const volume = (amount / price).toFixed(8)

  const param = {
    market,
    usd_volume: amount,
    diff,
    last_trade_price,
    bidding_price: price,
    volume,
    accessKey,
    secretKey,
  }

  const result = await kraken.api('AddOrder', {
    pair: market,
    type: body.type ?? 'buy',
    ordertype: 'limit',
    price,
    volume,
  })

  res.json({ param, result })
}

module.exports = allowCors(handleError(handler))
