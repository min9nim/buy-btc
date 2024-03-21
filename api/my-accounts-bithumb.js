const allowCors = require('../src/utils/cors')
const handleError = require('../src/utils/handle-error')
const { XCoinAPI } = require('../src/utils/XCoinAPI')

const handler = async (req, res) => {
  const { accessKey, secretKey } = req.query

  const xcoinAPI = new XCoinAPI(accessKey, secretKey)
  const rgParams = {
    currency: 'ALL',
  }
  const result = await xcoinAPI.xcoinApiCall('/info/balance', rgParams)

  res.json(JSON.parse(result.body))
}

module.exports = allowCors(handleError(handler))
