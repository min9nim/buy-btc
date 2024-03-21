const allowCors = require('../src/utils/cors')
const request = require('../src/utils/req-v2')
const handleError = require('../src/utils/handle-error')

const handler = async (req, res) => {
  const { accessKey, secretKey } =
    typeof req.body === 'string' ? JSON.parse(req.body) : req.body

  const kraken = new KrakenClient(accessKey, secretKey)

  const result = await kraken.api('Balance')

  res.json(result)
}

module.exports = allowCors(handleError(handler))
