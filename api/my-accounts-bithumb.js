const allowCors = require('../src/utils/cors')
const handleError = require('../src/utils/handle-error')
const { XCoinAPI } = require('../src/utils/XCoinAPI')

const handler = async (req, res) => {
  const { accessKey, secretKey, currency } = req.query

  const xcoinAPI = new XCoinAPI(accessKey, secretKey)
  const result = await xcoinAPI.xcoinApiCall('/info/balance', {
    currency,
  })

  res.json(JSON.parse(result.body))
}

module.exports = allowCors(handleError(handler))
