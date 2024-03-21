const allowCors = require('../src/utils/cors')
const handleError = require('../src/utils/handle-error')
const { XCoinAPI } = require('../src/utils/XCoinAPI')

const handler = async (req, res) => {
  const { accessKey, secretKey } = req.query

  const xcoinAPI = new XCoinAPI(accessKey, secretKey)
  const [btc, krw] = await Promise.all([
    xcoinAPI.xcoinApiCall('/info/balance', {
      currency: 'BTC',
    }),
    xcoinAPI.xcoinApiCall('/info/balance', {
      currency: 'KRW',
    }),
  ])

  res.json({ btc: JSON.parse(btc.body), krw: JSON.parse(krw.body) })
}

module.exports = allowCors(handleError(handler))
