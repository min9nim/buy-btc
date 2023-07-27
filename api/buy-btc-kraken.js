const allowCors = require('../src/utils/cors')
const handleError = require('../src/utils/handle-error')
const KrakenClient = require('kraken-api')

const handler = async (req, res) => {
  const { accessKey, secretKey, body } =
    typeof req.body === 'string' ? JSON.parse(req.body) : req.body

  const kraken = new KrakenClient(accessKey, secretKey)

  const diff = body.diff
  const amount = body.usd_volume
  const market = body.market || 'XBTUSD'

  const last_trade_price = await kraken
    .api('Ticker', { pair: 'XXBTZUSD' })
    .then(res => res.result.XXBTZUSD.c[0])

  const price = (Number(last_trade_price) + body.diff || 0).toFixed(2)
  const volume = (amount / price).toFixed(8)

  const param = {
    amount,
    diff,
    accessKey,
    secretKey,
    last_trade_price,
    price,
    volume,
  }

  const result = await kraken.api('AddOrder', {
    pair: market,
    type: 'buy',
    ordertype: 'limit',
    price,
    volume,
  })

  res.json({ param, result })
}

module.exports = allowCors(handleError(handler))
