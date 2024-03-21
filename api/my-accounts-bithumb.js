const allowCors = require('../src/utils/cors')
const handleError = require('../src/utils/handle-error')
const { XCoinAPI } = require('../src/utils/XCoinAPI')

const handler = async (req, res) => {
  const { accessKey, secretKey } = req.query

  const xcoinAPI = new XCoinAPI(accessKey, secretKey)
  const rgParams = {
    order_currency: 'BTC',
    payment_currency: 'KRW',
  }
  const result = await xcoinAPI.xcoinApiCall('/info/account', rgParams)

  res.json(result.body)
}

module.exports = allowCors(handleError(handler))
