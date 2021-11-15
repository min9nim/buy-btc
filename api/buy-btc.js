const allowCors = require('../src/utils/cors')
const request = require('../src/utils/req')
const axios = require('axios')

const handler = async (req, res) => {
  const myIp = await axios({
    method: 'get',
    url: 'https://echo-api.vercel.app/api',
  })
  console.log('myIp', myIp)

  const { accessKey, secretKey } = req.body

  const result = await request({
    method: 'post',
    path: '/v1/orders',
    body: {
      market: 'KRW-BTC',
      side: 'bid',

      /* 지정가 */
      // volume: '0.0001442',
      // price: '60000000.0',
      // ord_type: 'limit',

      /* 시장가 매수 */
      volume: null,
      price: '10000',
      ord_type: 'price',
    },
    accessKey,
    secretKey,
  })

  res.json(result)
}

module.exports = allowCors(handler)
