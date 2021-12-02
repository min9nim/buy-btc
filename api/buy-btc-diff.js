const allowCors = require('../src/utils/cors')
const request = require('../src/utils/req')
const handleError = require('../src/utils/handle-error')
const axios = require('axios')

const handler = async (req, res) => {
  const { accessKey, secretKey, body } =
    typeof req.body === 'string' ? JSON.parse(req.body) : req.body

  const currentPrice = await axios
    .get(`https://api.upbit.com/v1/candles/days?market=KRW-BTC&count=1`)
    .then(result => result.data[0].trade_price)

  console.log('currentPrice:', currentPrice)

  const result = await request({
    method: 'post',
    path: '/v1/orders',
    body: {
      market: 'KRW-BTC',
      side: 'bid',

      /* 지정가 */
      volume: '0.00015',
      price: String(currentPrice - Number(body.diff || 0)),
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

  res.json(result)
}

module.exports = allowCors(handleError(handler))
