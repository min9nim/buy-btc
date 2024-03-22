const allowCors = require('../src/utils/cors')
const handleError = require('../src/utils/handle-error')
const getBinanceBalances = require('../src/utils/get-binance-balances')

const handler = async (req, res) => {
  const { accessKey, secretKey } = req.query

  const result = await getBinanceBalances(accessKey, secretKey)
  res.json(result)
}

module.exports = allowCors(handleError(handler))
