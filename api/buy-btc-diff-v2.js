const allowCors = require('../src/utils/cors')
const request = require('../src/utils/req')
const handleError = require('../src/utils/handle-error')
const axios = require('axios')

const handler = async (req, res) => {
  const { accessKey, secretKey, body } =
    typeof req.body === 'string' ? JSON.parse(req.body) : req.body

  const market = body.market || 'KRW-BTC'

  const currentPrice = await axios
    .get(`https://api.upbit.com/v1/candles/days?market=${market}&count=1`)
    .then(result => result.data[0].trade_price)

  const BTC_UNIT = 100000000
  const biddingPrice = currentPrice + Number(body.diff || 0)
  const btcVolume =
    Math.floor((body.krw_volume / biddingPrice) * BTC_UNIT) / BTC_UNIT

  const param = {
    krwVolume: Number(body.krw_volume),
    currentPrice,
    biddingPrice,
    btcVolume,
  }

  const result = await request({
    method: 'post',
    path: '/v1/orders',
    body: {
      market,
      side: 'bid',

      /* 지정가 */
      volume: String(btcVolume),
      price: String(biddingPrice),
      ord_type: 'limit',

      /* 시장가 매수 */
      // volume: null,
      // price: '10000',
      // ord_type: 'price',

      ...body,
    },
    accessKey,
    secretKey,
  })

  res.json({param, result})
}

module.exports = allowCors(handleError(handler))
